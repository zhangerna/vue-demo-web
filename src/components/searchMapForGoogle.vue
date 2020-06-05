<template>
    <div id="google-map"></div>
</template>

<style lang="scss">
    #google-map {
        width: 100%;
        height: 60vh;
        margin-bottom: 5vh;
        .gm-style .gm-style-iw-d {
            max-width: 280px !important;

            img {
                width: 100%;
            }
        }
    }
</style>

<script>
    import google from "google"
    import httpClient from '@/utils/httpclient';
    export default {
        name: "SearchMapForGoogle",
        props: ["map", "from"],
        data() {
            return {
                mapInfo: {
                    lots:[],
                    lat:0,
                    lng:0,
                    vehicleInfo:[],
                    showMult:true
                },
                mapObj: {},
                marker: null,
                polygon: null,
                markers: [],
                bounds: null,
            }
        },
        watch: {
            map: function (newVal) {
                console.log("----");
                if (newVal) {
                    this.mapInfo.lots = newVal.lots;
                    this.mapInfo.lat = newVal.lots.length > 0 ? newVal.lots[0].centerCoordinate.split(' ')[1] : 31.3249335128696;
                    this.mapInfo.lng = newVal.lots.length > 0 ? newVal.lots[0].centerCoordinate.split(' ')[0] : 121.594292808653;
                    this.mapInfo.vehicleInfo = newVal.vehicles;
                    this.initMap();
                }
            }
        },
        methods: {
            getYMDString(time) {
                console.log(time)
                if(time){
                    let date = new Date(time);
                    let Y = date.getFullYear() + ' ';
                    let M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
                    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
                    let m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
                    return  M + '/' + D + '/' + Y + ' ' + h +':'+ m +  ' ';
                }else{
                    return  '';
                }

            },
            addMarker(position, title, item) {
                var marker = new google.maps.Marker({
                    position: position,
                    map: this.mapObj,
                    animation: google.maps.Animation.DROP,
                    title: title,
                    icon: {
                        url: item.currentVoltage < 11.7 ? "https://cdn.shopify.com/s/files/1/0703/1149/files/Location.png?807016" : "https://pic.zus.ai/saas/vehicle.png",
                        scaledSize: new google.maps.Size(30, 30)
                    }
                });
                this.bounds.extend(marker.getPosition());
                this.markers.push(marker);
                let self = this;
                marker.addListener('click', function () {
                    let lang='';
                    if(self.$i18n.locale === 'zh-CN'){
                        lang = 'China'
                    }else{
                        lang = 'US'
                    }

                    let link = '/api/v1/getlastLocation?lastlocationlat='+item.lastLocationLat+'&lastlocationlng='+item.lastLocationLng+'&country='+lang;
                    let myString='';
                    httpClient.get(link).then(res=>{
                        if(res.data.code === 200){
                            let p = item.currentVoltage < 11.7 ? `<p style="margin-bottom:6px;font-size: 12px;">${ self.$t('m.common.voltage') }:  <span style="color: red"> <i class="fa fa-exclamation-triangle"></i> ${item.currentVoltage}V</span></p>` : `<p style="margin-bottom:6px;font-size: 12px;">${ self.$t('m.common.voltage') }:${item.currentVoltage}V</p>`;
                            myString = `<a href='/vehicle/detail/${item.vehicleId}'>
                            <img style="background: #3a4149" src="${item.photoUrl ? item.photoUrl : '/img/placeholder.5367544d.svg'}" width="40%">
                            <h5 id="firstHeading" class="firstHeading">
                                <a target="_blank" href="/vehicle/${item.saleStatus === 1 ?"vehicle":"sold-manager"}/${item.vehicleId}">${item.year ? item.year :'N/A'} ${item.make ? item.make :'N/A'} ${item.model ? item.model:'N/A'} ${item.alias? "-" + item.alias: ''}</a>
                            </h5>
                            <p style="margin-bottom:6px;font-size: 12px">VIN:${item.vin}</p>
                            ${p}
                            <p style="margin-bottom:6px;font-size: 12px">${self.$t('m.common.last_location')}:${res.data.data.locationName}</p>
                            <p style="margin-bottom:6px;font-size: 12px">${self.$t('m.common.last_update')}:${self.getYMDString(item.locationTime)}</p>
                            </a>`;
                            let infoWindow = new google.maps.InfoWindow({
                                content:myString
                            });

                            infoWindow.open(this.mapObj, marker);
                        }
                    })
                })
            },
            initMap(){
                this.mapObj = new google.maps.Map(document.getElementById("google-map"), {
                    zoom: 15,
                    center: {lng: Number(this.mapInfo.lng), lat: Number(this.mapInfo.lat)}
                });

                let coords=[];
                if(this.mapInfo.lots.length > 0){
                    this.mapInfo.lots.map(item => {
                        let myArr=[];
                        if (item.areaCoordinate) {
                            item.areaCoordinate.map(val=>{
                                myArr.push({lat: Number(val.split(",")[1]), lng: Number(val.split(",")[0]) })
                            });
                            coords.push(myArr)
                        }
                    });
                }

                this.bounds = new google.maps.LatLngBounds();

                if (this.mapInfo.showMult && this.mapInfo.vehicleInfo.length > 0) {
                    this.mapInfo.vehicleInfo.map(item => {
                        if(item.lastLocationLat ){
                            let position = {lat: Number(item.lastLocationLat), lng: Number(item.lastLocationLng)};
                            let title = `${item.year? item.year :'N/A'} ${item.make? item.make :'N/A'} ${item.model? item.model:'N/A'} - ${item.alias? item.alias:'N/A'}`;
                            this.addMarker(position, title, item);
                        }
                    })
                }
                this.mapObj.fitBounds(this.bounds);

                this.polygon = new google.maps.Polygon({
                    paths: coords,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });
                this.polygon.setMap(this.mapObj);
                new google.maps.drawing.DrawingManager({
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                            google.maps.drawing.OverlayType.POLYGON
                        ]
                    },

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
                });

            }
        }
    }
</script>
