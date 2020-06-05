<template>
    <div class="maps">
        <div class="map-btn-group">
            <ul>
                <li @click="changeMapType('default')">地图 |</li>   
                <li @click="changeMapType('sate')">&nbsp;卫星图像</li>
            </ul>
        </div>
        <div id="map">
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    }
    #map {
        height: 400px ;
        .gm-style .gm-style-iw-d {
            max-width: 280px!important;
            img {
                width: 100%;
            }
        }
    }
    .modal-dialog {
    // max-width: 50% !important;
    width: 50% !important;
}
</style>

<script>
    import AMap from 'AMap'
    export default {
        name: "amapForAddress",
        props: ["address","randomId"],
        data() {
            return {
                address1: "",
                mapObj: null
            }
        },
        watch: {
            address: function (newVal) {
                console.log(1);
                console.log(newVal);
                // console.log(this.randomId)
                this.address1 = newVal;
                this.initMap()
            }
        },
        methods: {
            changeMapType(type) {
                if (type == 'default') {
                    this.safeLayer.hide();
                    this.roadLayer.hide();
                } else {
                    this.roadLayer.show();
                    this.safeLayer.show();
                }
            },
            initMap(){
                this.mapObj = new AMap.Map('map', {
                    zoom: 17
                });
                this.safeLayer = new AMap.TileLayer.Satellite({
                });
                this.roadLayer = new AMap.TileLayer.RoadNet({
                });
                this.mapObj.add(this.safeLayer);
                this.mapObj.add(this.roadLayer);
                this.safeLayer.hide();
                this.roadLayer.hide();

                this.geocoders = new AMap.Geocoder();
                this.geocoders.getLocation(this.address1, (status, result) => {
                    if (status === 'complete' && result.geocodes.length) {
                        this.markers = new AMap.Marker({
                            position: result.geocodes[0].location,
                            icon: new AMap.Icon({
                                image: "https://cdn.shopify.com/s/files/1/0703/1149/files/Store.svg?854352",
                                size: new AMap.Size(60, 60),
                                imageSize: new AMap.Size(20,30),
                            })
                        });
                        this.mapObj.add(this.markers);
                        this.mapObj.setFitView(this.markers);
                    }
                })

            }
        }
    }
</script>
