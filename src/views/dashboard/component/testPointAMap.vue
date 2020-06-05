<template>
    <div class="draw-map">
        <b-row>
            <b-col sm="6">
                <b-form-group>
                    <label>{{ $t('m.cloud.test_store_name') }}</label>
                    <b-form-input type="text" @change="checkInput" v-model="parkingName" maxlength="30"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-row>
                        <b-col sm="3" class="padding0">
                            <label>{{ $t('m.add_shop.country') }}</label>
                            <select class="form-control" v-model="country" @change="checkInput()">
                                <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                <option v-for="(item, key) in list" :key="key" :value="key + 1">{{ item.countryName }}</option>
                            </select>
                        </b-col>
                        <b-col sm="3" class="padding0">
                            <label>{{ $t('m.add_shop.state') }}</label>
                            <select class="form-control" v-model="state" @change="checkInput()">
                                <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                <option v-for="(item, key) in (country ? list[country - 1]['proviceList'] : [])" :value="key + 1" :key="key">{{ item.proviceName}}</option>
                            </select>
                        </b-col>
                        <b-col sm="3" class="padding0">
                            <label>{{ $t('m.add_shop.city') }}</label>
                            <select class="form-control" v-model="city" @change="checkInput()">
                                <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                <option v-for="(item, key) in (country && state ? list[country - 1]['proviceList'][state - 1]['cityList'] : [] )" :value="key + 1" :key="key">{{ item.cityName }}</option>
                            </select>
                        </b-col>
                        <b-col sm="3">
                            <label>{{ $t('m.add_shop.area') }}</label>
                            <select class="form-control" v-model="area" @change="checkInput()">
                                <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                <option v-for="(item, key) in (country && state && city ? list[country - 1]['proviceList'][state - 1]['cityList'][city -1]['areaDTOList'] : [])" :value="key + 1" :key="key">{{ item.areaName }}</option>
                            </select>
                        </b-col>
                    </b-row>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.common.contact_person') }}</label>
                    <b-form-input type="text" onchange="checkInput()" v-model="user" maxlength="30"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.common.contact_phone') }}</label>
                    <b-form-input type="number" v-model="phone" @change="checkInput()" maxlength="15"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.lots.address') }}</label>
                    <b-input-group>
                        <b-form-input type="text" v-model="address" maxlength="100"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="secondary" id="locate" @click="getLocate()">{{ $t('m.lots.b_locate') }}</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.common.address_des') }}</label>
                    <b-form-input type="text" v-model="parkingDes" maxlength="200"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <div style="color:#f86c6b">{{ $t('m.lots.add_test_p') }}</div>
        <div style="margin-bottom: 10px;color:#f86c6b">{{ $t('m.map.double_tip') }}</div>
        <div class="drawbutton left-button" @click="drawPolygon()">
            &nbsp;{{ drawButton }}&nbsp;
        </div>
        <div class="map-btn-group">
            <ul>
                <li @click="changeMapType('default')">{{ $t('m.map.map') }} |</li>
                <li @click="changeMapType('sate')">&nbsp;{{ $t('m.map.satellite') }}</li>
            </ul>
        </div>
        <div id="map-canvas">
        </div>
        <model
                :show="show"
                :title="title"
                :content="content"
                :buttonText="btnGroup"
                @closeRemindBox="hideTip"
        ></model>
        <div class="text-center">
            <b-button class="btn btn-primary submit" @click="submitData()" :disabled="disable" style="margin-top: 12px;color: #ffffff">{{ $t('m.common.b_save') }}</b-button>
        </div>
    </div>
</template>

<style lang="scss">
    .draw-map {
        .padding0 {
            padding-right: 0;
        }
        .map-btn-group {
            position: absolute;
            margin-top: 10px;
            z-index: 1;
            margin-left: 20px;
            ul {
                color: black;
                padding: 0 20px;
                height: 40px;
                line-height: 40px;
                background: #ffffff;
                font-size: 18px;
                li {
                    cursor: pointer;
                    display: inline-block;
                }
            }
        }
        #map-canvas {
            height: 40vh;
        }
        .submit {
            background-color: #20a8d8!important;
            border-color: #20a8d8!important;
        }
        .drawbutton {
            height: 40px;
            background: #ffffff;
            color: black;
            text-align: center;
            line-height: 40px;
            position: absolute;
            z-index: 1;

            margin-top: 10px;
            cursor: pointer;
        }
        .left-button {
            left: 45%;
        }
        .right-button {
            background: rgba(255,255,255,0.8);
            right: 4%;
        }
    }
</style>
<script>
    import httpClient from "@/utils/httpclient";
    import { wgs84ToGcjo2, gcj02towgs84 } from "@/utils/coordtransform";
    import AMap from 'AMap';
    import model from "@/components/model";
    import { findIndex } from "@/utils/db";
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
                this.getCityList(newV);
                this.initEdit()
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
        mounted() {
            if (!this.$route.params.id) {
                this.getCityList();
                this.initialize()
            }
        },
        data() {
            return {
                parkData: {},
                list: [],
                country: '',
                state: '',
                city: '',
                area: '',
                user: '',
                disable: true,
                mapObj: null,
                infoWindow: null,
                geocoders: null,
                parkingDes: "",
                drawManager: null,
                polygonCompete: [],
                locations: [],
                parkingName: '',
                centerCoordinate: null,
                address: '',
                show: false,
                opeSave: false,
                title: this.$t('m.tip.warn'),
                content: "",
                btnGroup: {
                    btnSecond: this.$t('m.tip.confirm')
                },
                areaCoord: null,
                bermudaTriangle: null,
                isMapChanged:false,
                drawButton: this.$t('m.map.start_draw'),
                markers: [],
                roadLayer: null,
                phone: ''
            }
        },
        methods:{
            getCityList(newV) {
                httpClient.get("/api/v1/getprovicescitynew").then((res) => {
                    if (res.data.code == 200) {
                        process.env.VUE_APP_ENV == 'cn' ?
                            this.list = res.data.data.countryList.filter((item) => {
                                return item.countryId == '248'
                            })
                            :
                            this.list = res.data.data.countryList;
                        if (this.$route.params.id ) {
                            let temp = findIndex(res.data.data.countryList, newV.parkingCountryCode, "country");
                            this.country = temp.index + 1;
                            temp = findIndex(temp.item.proviceList, newV.parkingStateCode, "provice");
                            this.state = temp.index + 1;
                            temp = findIndex(temp.item.cityList, newV.parkingCityCode, "city");
                            this.city = temp.index + 1;
                            temp = findIndex(temp.item.areaDTOList, newV.parkingAreaCode, "area");
                            this.area = temp.index + 1;
                        }
                    }
                });
            },
            changeMapType(type) {
                if (type == 'default') {
                    this.roadLayer.hide();
                    this.safeLayer.hide();
                } else {
                    this.roadLayer.show();
                    this.safeLayer.show();

                }
            },
            initEdit() {
                this.drawButton = this.$t('m.map.redraw');
                let temp = this.centerCoordinate.split(" ");
                let lnglat = wgs84ToGcjo2(temp[0], temp[1]);
                this.mapObj = new AMap.Map('map-canvas', {
                    center: lnglat,
                    viewMode: '3D',
                    zoom: 17
                });
                this.safeLayer = new AMap.TileLayer.Satellite({});
                this.roadLayer = new AMap.TileLayer.RoadNet({
                });
                this.mapObj.addControl(new AMap.ControlBar());
                this.mapObj.addControl(new AMap.Scale({
                    visible: true
                }));
                this.mapObj.add(this.roadLayer);
                this.mapObj.add(this.safeLayer);
                this.safeLayer.hide();
                this.roadLayer.hide();
                let area2 = [];
                this.areaCoord.map(function (item) {
                    let temp = item.split(",")
                    area2.push(wgs84ToGcjo2(Number(temp[0]), Number(temp[1]) ))
                });
                this.initPolygon(area2);

            },
            initPolygon(area2) {
                this.polygonCompete = new AMap.Polygon({
                    path: area2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });
                this.mapObj.add(this.polygonCompete);
            },
            drawPolygon() {

                if (window.mouseTool) {
                    this.mapObj.remove(this.polygonCompete);
                    this.polygonCompete = [];
                    window.mouseTool.close(true);
                }
                window.mouseTool = new AMap.MouseTool(this.mapObj);
                window.mouseTool.polygon({
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    editable: true,
                });
                window.mouseTool.on('draw', (event) => {
                    this.drawButton = this.$t('m.map.redraw');

                    let array = event.obj.getPath();
                    this.showLonLat(array);
                    window.mouseTool.close(true);
                })
            },
            showLonLat(arry) {
                let locations = [];
                let outChina = false;
                arry.map(item => {
                    if (gcj02towgs84(item.lng, item.lat).lng) {
                        locations.push(gcj02towgs84(item.lng, item.lat));
                    } else {
                        outChina = true;
                    }
                });
                if (outChina) {
                    this.content = this.$t("m.map.out_china");
                    this.show = true;
                    return
                }
                locations[arry.length] = locations[0];
                this.initPolygon(arry);
                this.areaCoord = locations;
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
            hideTip() {
                if (this.opeSave) {
                    this.$router.push('/test-drive/test-point/list');
                }
                this.show = false;
                this.disable = true;
            },
            initialize() {
                this.mapObj = new AMap.Map('map-canvas', {
                    zoom: 15
                });
                this.safeLayer = new AMap.TileLayer.Satellite({
                });
                this.roadLayer = new AMap.TileLayer.RoadNet({
                });
                this.mapObj.addControl(new AMap.ControlBar());
                this.mapObj.addControl(new AMap.Scale({
                    visible: true
                }));
                this.mapObj.add(this.roadLayer);
                this.mapObj.add(this.safeLayer);
                this.safeLayer.hide();
                this.roadLayer.hide();
            },
            getLocate() {
                this.checkInput();
                if (this.address) {
                    this.mapObj.remove(this.markers)
                    this.geocoders = new AMap.Geocoder();
                    this.geocoders.getLocation(this.address, (status, result) => {
                        if (status === 'complete' && result.geocodes.length) {
                            this.markers = new AMap.Marker({
                                position: result.geocodes[0].location,
                                icon: new AMap.Icon({
                                    image: "https://cdn2.shopify.com/s/files/1/0703/1149/files/Location_03580bd1-f466-4803-a69e-720a098b08a5.svg?828688",
                                    size: new AMap.Size(60, 60),
                                    imageSize: new AMap.Size(20,30),
                                })
                            });
                            this.mapObj.add(this.markers);
                            this.mapObj.setFitView(this.markers);
                        }
                    })
                }
            },
            showTip(data) {
                this.show = true;
                this.content = this.$t('m.map.warn_repeat', {data: data});
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g, "");
            },
            checkInput() {
                if (!this.parkingName || !this.user || !this.phone || !this.address || !this.country || !this.state || !this.city || !this.area) {
                    this.disable = true;
                    return;
                }
                this.disable = false;
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
                    id: this.$route.params.id ? this.$route.params.id : '',
                    parkingAddressDesc: this.parkingDes,
                    parkingContactName: this.user,
                    parkingContactPhone: this.phone,
                    parkingCountryCode: this.list[this.country - 1].countryId,
                    parkingStateCode: this.list[this.country - 1]['proviceList'][this.state - 1].provicesId,
                    parkingCityCode: this.list[this.country - 1]['proviceList'][this.state - 1]['cityList'][this.city - 1].cityId,
                    parkingAreaCode: this.list[this.country - 1]['proviceList'][this.state - 1]['cityList'][this.city - 1]['areaDTOList'][this.area - 1].areaId
                }).then(response => {
                    if (response.data.code == 200 && response.data.data.result) {
                        if (!this.data) {
                            this.content = this.$t('m.tip.save_succ');
                        } else {
                            this.content = this.$t('m.tip.edit_succ');
                        }
                        this.title = this.$t('m.tip.suc');
                        this.opeSave = true;
                        this.show = true;
                    } else {
                        this.show = true;
                        this.content = response.data.data.content;
                    }
                }).catch(() => {
                    alert("api 异常")
                })
            }
        },
    }
</script>
