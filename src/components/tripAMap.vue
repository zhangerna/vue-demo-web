<template>
    <div class="maps">
        <div class="map-btn-group">
            <ul>
                <li @click="changeMapType('default')">地图 |</li>
                <li @click="changeMapType('sate')">&nbsp;卫星图像</li>
            </ul>
        </div>
        <div class="amap my-map" id="polygon">
        </div>
    </div>
</template>

<style lang="scss">
    .maps {
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
        #polygon {
            height: 30vh;
            width: 100%;
        }
        .my-map{
            height: 70vh;
            width: 100%;
            .amap-info {
                width: 200px;
            }
            .amap-info-contentContainer {
                background:#ffffff;
                border-radius: 10px;
                h5 {
                    padding-left: 10px;
                }
            }
        }
    }
</style>

<script>
    import { wgs84ToGcjo2 } from "@/utils/coordtransform"
    import AMap from 'AMap'
    export default {
        name: "amap",
        props: ["map"],
        data() {
            return {
                mapObj: null,
                polygon: null,
                lat: "",
                lng: "",
                safeLayer: null,
                roadLayer: null,
                mapInfo: null
            }
        },
        watch: {
            map: function (newVal) {
                this.mapInfo = newVal;
                this.initMap();
            }
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
            initMap() {
                this.mapObj = new AMap.Map('polygon', {
                    center: [this.mapInfo.center.lng, this.mapInfo.center.lat],
                    zoom: 8
                });
                // 卫星地图的切换
                this.safeLayer = new AMap.TileLayer.Satellite({
                });
                this.roadLayer = new AMap.TileLayer.RoadNet({
                });
                this.mapObj.add(this.safeLayer);
                this.mapObj.add(this.roadLayer);
                this.safeLayer.hide();
                this.roadLayer.hide();

                let area2 = [];
                this.mapInfo['area'] ? this.mapInfo['area'].map(function (item) {
                    area2.push(wgs84ToGcjo2(Number(item.lng), Number(item.lat) ))
                }) : '';
                let polyline = new AMap.Polyline({
                    path: area2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '',
                    fillOpacity: 0.35
                });
                polyline.setMap(this.mapObj);
                this.mapObj.setFitView();
            }
        }
    }
</script>
