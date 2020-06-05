<template>
    <div class="draw-map">
        <b-row>
            <b-col sm="6">
                <b-form-group>
                    <label>{{ $t('m.cloud.test_store_name') }}</label>
                    <b-form-input type="text" v-model="parkingName" maxlength="30" @change="changeStatus()"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.common.contact_person') }}</label>
                    <b-form-input type="text" v-model="user" maxlength="30" @change="changeStatus()"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.common.contact_phone') }}</label>
                    <b-form-input type="number" v-model="phone" maxlength="15" @change="changeStatus()"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.lots.address') }}</label>
                    <b-input-group>
                        <b-form-input type="text" v-model="address" maxlength="100"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="secondary" id="locate" @click="getLocate()" >{{ $t('m.lots.b_locate') }}</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.common.address_des') }}</label>
                    <b-form-input type="text" v-model="parkingDes" maxlength="200" @change="changeStatus()"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="6">
                <p>{{ $t('m.lots.add_lot_p') }}</p>
                <div id="map-canvas">
                </div>
            </b-col>
        </b-row>
        <model
                :show="show"
                :title="$t('m.tip.warn')"
                :content="content"
                :buttonText="btnGroup"
                @closeRemindBox="hideTip"
        ></model>
        <b-button class="btn btn-primary submit" @click="submitData()" :disabled="disable" style="margin-top: 12px;color: #ffffff">{{ $t('m.common.b_save') }}</b-button>
    </div>
</template>

<style lang="scss">
    .draw-map {
        #map-canvas {
            height: 40vh;
        }
        .submit {
            background-color: #20a8d8!important;
            border-color: #20a8d8!important;
        }
    }
</style>
<script>
    import httpClient from "@/utils/httpclient";
    import google from "google";
    import model from "@/components/model";
    export default {
        name: 'drawMap',
        props: ['data'],
        components: {
            model
        },
        watch: {
            data(newV){
                this.parkingName = newV.parkingName;
                this.address = newV.address;
                this.areaCoord = newV.areaCoordinate;
                this.centerCoordinate = newV.centerCoordinate;
                this.user = newV.parkingContactName;
                this.phone = newV.parkingContactPhone;
                this.parkingDes = newV.parkingAddressDesc;
                this.initEdit();
            },
            parkingName(newV) {
                this.parkingName = this.trim(newV);
                this.checkInput();
            },
            address(newV) {
                this.address = this.trim(newV);
                this.checkInput();
            }
        },
        data() {
            return {
                user: '',
                parkingDes: "",
                disable: true,
                mapObj: null,
                infoWindow: null,
                geocoders: null,
                drawManager: null,
                polygonCompete: null,
                phone: '',
                locations: [],
                parkingName: '',
                centerCoordinate: null,
                address: '',
                show: false,
                content: "",
                btnGroup: {
                    btnSecond: this.$t('m.tip.b_ok')
                },
                areaCoord: null,
                bermudaTriangle: null,
                isMapChanged:false
            }
        },
        mounted() {
            if (!this.$route.params.id) {
                this.initialize()
            }
        },
        methods:{
            initEdit() {
                this.disable = false;
                let latlng = this.centerCoordinate.split(" ");
                this.mapObj = new google.maps.Map(document.getElementById('map-canvas'), {
                    zoom: 15,
                    center: {lat: Number(latlng[1]), lng: Number(latlng[0])}
                });
                let centerControDiv = document.createElement('div');
                this.centerControl(centerControDiv);
                centerControDiv.index = 1;
                this.mapObj.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControDiv);
                this.geocoders = new google.maps.Geocoder();
                let triangleCoords = [];
                for (let item of this.areaCoord) {
                    triangleCoords.push({lat: Number(item.split(",")[1]), lng: Number(item.split(",")[0]) })
                }
                // Construct the polygon.
                this.bermudaTriangle = new google.maps.Polygon({
                    paths: triangleCoords,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });

                this.bermudaTriangle.setMap(this.mapObj);
                this.initDrawManager();
            },
            hideTip() {
                this.show = false;
                this.disable = true;
            },
            changeStatus() {
                this.checkInput();
            },
            centerControl(controlDiv) {

                // Set CSS for the control border.
                let controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '2px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginTop = '10px';
                controlUI.style.marginBottom = '22px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to draw a geo fence';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.lineHeight = '38px';
                controlText.style.paddingLeft = '5px';
                controlText.style.paddingRight = '5px';
                controlText.innerHTML = this.$t('m.map.start_draw');
                controlUI.appendChild(controlText);


                var controlUI1 = document.createElement('div');
                controlUI1.style.display = 'none';
                controlUI1.style.backgroundColor = '#fff';
                controlUI1.style.border = '2px solid #fff';
                controlUI1.style.borderRadius = '2px';
                controlUI1.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI1.style.cursor = 'pointer';
                controlUI1.style.marginTop = '10px';
                controlUI1.style.marginBottom = '22px';
                controlUI1.style.textAlign = 'center';
                controlUI1.title = 'Click to redraw the geo fence';
                controlDiv.appendChild(controlUI1);

                // Set CSS for the control interior.
                let controlText1 = document.createElement('div');
                controlText1.style.color = 'rgb(25,25,25)';
                controlText1.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText1.style.fontSize = '16px';
                controlText1.style.lineHeight = '38px';
                controlText1.style.paddingLeft = '5px';
                controlText1.style.paddingRight = '5px';
                controlText1.innerHTML = this.$t('m.map.redraw');
                controlUI1.appendChild(controlText1);

                // Setup the click event listeners: simply set the map to Chicago.
                var flightPath=new google.maps.Polyline({
                    strokeColor:"#0000FF",
                    strokeOpacity:0.8,
                    strokeWeight:2
                });

                flightPath.setMap(this.mapObj);
                controlUI.addEventListener('click',() => {
                    controlUI.style.display = 'none';
                    controlUI1.style.display = 'block';
                    this.drawManager.setOptions({
                        drawingMode: 'polygon',
                        fillColor:'#fff'
                    });
                    this.$route.params.id ? this.bermudaTriangle.setMap(null) : '';

                });
                controlUI1.addEventListener('click', () => {
                    this.polygonCompete.setMap(null);
                    this.drawManager.setOptions({
                        drawingMode: 'polygon',
                        fillColor:'#fff'
                    });
                });

            },
            initDrawManager() {
                this.drawManager = new google.maps.drawing.DrawingManager(
                    {
                        drawingMode: '',
                        drawingControl: false,
                        //设置图形显示样式
                        circleOptions: {
                            fillColor: '#ffff00',
                            fillOpacity: 1,
                            strokeWeight: 5,
                            clickable: false,
                            editable: true,
                            zIndex: 1
                        },
                        polygonOptions: {
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#FF0000",
                            fillOpacity: 0.35,
                            editable: true,
                        }
                    }
                );
                this.drawManager.setMap(this.mapObj);
                google.maps.event.addListener(this.drawManager, 'polygoncomplete', polygon => {
                    this.polygonCompete = polygon;
                    this.drawManager.setOptions({
                        drawingMode: ''
                    });
                });
                google.maps.event.addListener(this.drawManager, 'polygoncomplete', polygon => {
                    let array = polygon.getPath().getArray();
                    this.showLonLat(array)
                })
            },
            initialize() {
                let mapOptions = {
                    zoom: 15,
                };
                this.mapObj = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                this.infoWindow = new google.maps.InfoWindow;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        let pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        this.infoWindow.setPosition(pos);
                        this.infoWindow.setContent('Current Location');
                        this.mapObj.setCenter(pos);

                        let centerControDiv = document.createElement('div');
                        this.centerControl(centerControDiv);
                        centerControDiv.index = 1;
                        this.geocoders = new google.maps.Geocoder();
                        this.mapObj.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControDiv);

                    }, function () {
                        this.handleError(true)
                    })
                } else {
                    this.handleError(false)
                }
                this.initDrawManager()
            },
            handleError(status) {
                this.infoWindow.setPosition(this.mapObj.getCenter());
                this.infoWindow.setContent(status ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
                this.infoWindow.open(this.mapObj)
            },
            showTip(data) {
                this.show = true;
                this.content = this.$t('m.map.warn_repeat', {data: data});
            },
            getLocate() {
                this.checkInput();
                if (this.address) {
                    this.geocoders.geocode({'address': this.address}, (results, status) => {
                        if (status == "OK") {
                            this.mapObj.setCenter(results[0].geometry.location);
                            new google.maps.Marker({
                                map: this.mapObj,
                                position: results[0].geometry.location,
                                icon: {
                                    url: "https://cdn.shopify.com/s/files/1/0703/1149/files/Location.png?807016",
                                    scaledSize: new google.maps.Size(30, 30)
                                }
                            });
                        } else {
                            console.log('Geocode was not successful for the following reason: ' + status);
                        }
                    })
                }
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g, "");
            },
            checkInput() {
                if (!this.parkingName) {
                    this.disable = true;
                    return;
                }
                if (!this.user) {
                    this.disable = true;
                    return;
                }
                if (!this.phone) {
                    this.disable = true;
                    return;
                }
                if (!this.address) {
                    this.disable = true;
                    return;
                }
                this.disable = false;
            },
            showLonLat(arry) {
                let locations = [];
                arry.map(item => {
                    locations.push(item);
                });
                this.areaCoord = locations;
                locations[arry.length] = arry[0];
                httpClient.post('/api/v1/lot/isRepeated', {
                    parkingName: this.parkingName,
                    address: this.address,
                    areaCoordinate: locations,
                    id: this.$route.params.id,
                    lotType: 2
                }).then(response => {
                    if (response.data.data != null) {
                        this.isMapChanged = true;
                        this.showTip(response.data.data)
                    } else {
                        this.checkInput();
                        this.isMapChanged = true;
                    }
                })
            },
            submitData() {
                this.checkInput();
                let link='';
                if(!this.data){
                    link = '/api/v1/clouddrive/parkinglot/insert'
                }else{
                    link = '/api/v1/clouddrive/parkinglot/update'
                }
                if (!this.isMapChanged && this.areaCoord) {
                    let data = this.areaCoord.map(item => {
                        return {
                            lng: item.split(",")[0],
                            lat: item.split(",")[1]
                        }
                    });
                    this.areaCoord = data;
                }
                httpClient.post(link, {
                    parkingName: this.parkingName,
                    address: this.address,
                    areaCoordinate: this.areaCoord,
                    id: this.$route.params.id,
                    parkingAddressDesc: this.parkingDes,
                    parkingContactName: this.user,
                    parkingContactPhone: this.phone
                }).then(response => {
                    if (response.data.code == 200) {
                        this.$router.push('/test-drive/test-point/list')
                    } else {
                        this.show = true;
                        this.content = `Lot Name: ${response.data.data} Existed.`;
                    }
                })
            }
        },
    }
</script>
