<template>
    <div class="searchGaode">
        <div class="map-btn-group">
            <ul>
                <li @click="changeMapType('default')">地图 |</li>
                <li @click="changeMapType('sate')">&nbsp;卫星图像</li>
            </ul>
        </div>
        <div class="amap" id="gaode-map">

        </div>
    </div>
</template>

<script>
    import { wgs84ToGcjo2,calCenter } from "@/utils/coordtransform";
    import httpClient from '@/utils/httpclient';
    import AMap from 'AMap'
    export default {
        name: "SearchMapForGaode",
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
                lat: "",
                lng: "",
                myMap:{},
                myInfoWindow:null,
                safeLayer: null,
                roadLayer: null,
                source: null
            }
        },
        watch: {
            map: function (newVal) {
                this.mapInfo.lots = newVal.lots;
                this.mapInfo.vehicleInfo = newVal.vehicles;
                this.getMyMap();
            },
            from: function (newVal) {
                this.source = newVal;
            }
        },
        mounted(){
            this.getMyMap()
        },
        methods: {
            changeMapType(type) {
                if (type == 'default') {
                    this.roadLayer.hide();
                    this.safeLayer.hide();
                } else {
                    this.roadLayer.show();
                    this.safeLayer.show();
                }
            },
            getMyMap(){
                let centerPoint;
                let _arr = [];
                if(this.mapInfo.vehicleInfo.length > 0){
                    this.mapInfo.vehicleInfo.map(item => {
                        if(item.lastLocationLat && item.lastLocationLng ){
                            _arr.push({
                                lng: item.lastLocationLng,
                                lat: item.lastLocationLat
                            })
                        }
                    });
                    centerPoint = calCenter(_arr);
                }

                this.myMap = new AMap.Map("gaode-map", {//实例化一个地图
                    zoom: 12,
                    viewMode: '3D',
                    center: centerPoint
                });
                this.roadLayer = new AMap.TileLayer.RoadNet({
                });
                this.myMap.addControl(new AMap.ControlBar());
                this.myMap.addControl(new AMap.Scale({
                    visible: true
                }));
                this.myMap.add(this.roadLayer);
                let area2 = [];
                if(this.mapInfo.lots.length > 0){
                    this.mapInfo.lots.map(item => {//给地图加上指定停车红色区域
                        let myArr=[];
                        item.areaCoordinate.map(val =>{
                            let temp = val.split(",");
                            myArr.push(wgs84ToGcjo2(Number(temp[0]), Number(temp[1]) ))
                        });
                        area2.push(myArr)
                    });
                }

                let polygon = new AMap.Polygon({//给地图加上指定停车红色区域
                    path: area2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });
                this.myMap.add(polygon);
                this.myInfoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, 0)});//初始化地图infoWindow
                if (this.mapInfo.showMult) {
                    this.mapInfo.vehicleInfo.map(item => {
                        if(item.lastLocationLat && item.lastLocationLng ){
                            this.addMarkers(item);
                        }
                    })
                    this.myMap.setFitView();
                }
                this.myMap.setFitView();
            },

            addMarkers(item){
                console.log(item)
                let lnglat = wgs84ToGcjo2(item.lastLocationLng, item.lastLocationLat);
                let marker = new AMap.Marker({
                    position: lnglat,
                    map: this.myMap,
                    icon: new AMap.Icon({
                        image: item.currentVoltage && item.currentVoltage.toFixed(1) < 11.7 ? "https://cdn2.shopify.com/s/files/1/0703/1149/files/Location_03580bd1-f466-4803-a69e-720a098b08a5.svg?828688" : "https://pic.zus.ai/saas/vehicle_normal.svg",
                        size: new AMap.Size(20, 30),
                        imageSize: new AMap.Size(20,30),
                    })
                });
                marker.content = '';
                marker.item = item;
                marker.on('click', this.markerClick);
            },

            markerClick(e) {//地图标记点击事件
                let lang='';
                if(this.$i18n.locale === 'zh-CN'){
                    lang = 'China'
                }else{
                    lang = 'US'
                }
                let item = e.target.item;
                let link = '/api/v1/getlastLocation?lastlocationlat='+item.lastLocationLat+'&lastlocationlng='+item.lastLocationLng+'&country='+lang;
                httpClient.get(link).then(res=>{
                    if(res.data.code === 200){
                        let p = item.currentVoltage < 11.7 ? `<p style="margin-bottom:6px;font-size: 12px;">${ this.$t('m.common.voltage') }: <span style="color:red"><i class="fa fa-exclamation-triangle"></i>${item.currentVoltage ? item.currentVoltage.toFixed(1) + 'V' : ''}</span></p>` :`<p style="margin-bottom:6px;font-size: 12px;">${ this.$t('m.common.voltage') }:${ item.currentVoltage ?  item.currentVoltage.toFixed(1) + 'V' : ''}</p>`;
                        let contentString = `<div>
                                <img style="background: #3a4149" src="${item.photoUrl ? item.photoUrl : '/img/placeholder.5367544d.svg'}" width="100%" alt="">
                            <a target="_blank" href='/${item.saleStatus === 1 ?"vehicle":"sold-manager"}/detail/${item.vehicleId}'><h5 id="firstHeading" class="firstHeading">${item.year ? item.year :'N/A'} ${item.make ? item.make :'N/A'} ${item.model ? item.model:'N/A'} ${item.alias? "-" + item.alias:''}</h5></a>
                            <p style="margin-bottom:6px;font-size: 12px">VIN:${item.vin}</p>
                            ${p}
                            <p style="margin-bottom:6px;font-size: 12px">${this.$t('m.common.last_location')}:${res.data.data.locationName}</p>
                            <p style="margin-bottom:6px;font-size: 12px">${this.$t('m.common.last_update')}:${this.getYMDString(item.locationTime)}</p>
                            </div>`;
                        this.myInfoWindow.setContent(contentString);
                        this.myInfoWindow.open(this.myMap, e.target.getPosition());
                    }
                })

            },
            getYMDString(time) {//格式化时间
                if(time){
                    var date = new Date(time);
                    var Y = date.getFullYear() + ' ';
                    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
                    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
                    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
                    return  M + '/' + D + '/' + Y + ' ' + h +':'+ m +  ' ';
                }else{
                    return  '';
                }
            },
        }
    }
</script>

<style lang="scss">
    .searchGaode {
        #gaode-map {
            width: 100%;
            height: 65vh;
            margin-bottom: 5vh;
            .amap-info-contentContainer {
                width: 100%;
                border-radius: 10px;
                .amap-info-content{
                    padding: 20px 10px 0;
                }
                .amap-info-close{
                    right:10px !important;
                }
            }
            .amap-info-shadowContainer + div {
                bottom: 30px!important;
            }
        }
        .map-btn-group {
            position: absolute;
            margin-top: 10px;
            z-index: 1;
            margin-left: 20px;
            ul {
                color: grey;
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
        .content-window-card {
            position: relative;
            box-shadow: none;
            bottom: 0;
            left: 0;
            width: auto;
            padding: 0;
        }

        .content-window-card p {
            height: 2rem;
        }

        .custom-info {
            border: solid 1px silver;
        }

        div.info-top {
            position: relative;
            background: none repeat scroll 0 0 #F9F9F9;
            border-bottom: 1px solid #CCC;
            border-radius: 5px 5px 0 0;
        }

        div.info-top div {
            display: inline-block;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            line-height: 31px;
            padding: 0 10px;
        }

        div.info-top img {
            position: absolute;
            top: 10px;
            right: 10px;
            transition-duration: 0.25s;
        }

        div.info-top img:hover {
            box-shadow: 0px 0px 5px #000;
        }

        div.info-middle {
            font-size: 12px;
            padding: 10px 6px;
            line-height: 20px;
        }

        div.info-bottom {
            height: 0px;
            width: 100%;
            clear: both;
            text-align: center;
        }

        div.info-bottom img {
            position: relative;
            z-index: 104;
        }

        span {
            margin-left: 5px;
            font-size: 11px;
        }

        .info-middle img {
            float: left;
            margin-right: 6px;
        }
    }

</style>
