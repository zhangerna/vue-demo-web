<template>
    <div class="maps">
        <div class="map-btn-group">
            <ul>
                <li @click="changeMapType('default')">地图 |</li>
                <li @click="changeMapType('sate')">&nbsp;卫星图像</li>
            </ul>
        </div>
        <div class="amap my-map" :id="elId ? elId : 'map'" ></div>
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
    #map,
    #model-map {
        height: 70vh;
        width: 100%;
    }
    .my-map {
        height: 400px;
        width: 100%;
        .amap-info {
            width: 200px;
        }
        .amap-info-contentContainer {
            background: #ffffff;
            border-radius: 10px;
            h5 {
                padding-left: 10px;
            }
        }
    }
}
.maps {
    .modal-dialog {
        max-width: 90%;
        width: 90%;
    }
}
</style>

<script>
import { wgs84ToGcjo2 } from "@/utils/coordtransform";
import AMap from "AMap";
export default {
    name: "amap",
    props: ["map", "elId", "type"],
    data() {
        return {
            mapInfo: null,
            mapObj: null,
            marker: null,
            polygon: null,
            markers: [],
            lat: "",
            lng: "",
            infoWindow: null,
            roadLayer: null,
            safeLayer: null
        };
    },
    watch: {
        map: function(newVal) {
            this.mapInfo = newVal;
            this.initMap();
            console.log(2333)
        }
    },
    methods: {
        addMarker(position, title, contentString) {
            let marker = new AMap.Marker({
                position: position,
                map: this.mapObj,
                icon: new AMap.Icon({
                    image: "https://cdn2.shopify.com/s/files/1/0703/1149/files/Location_03580bd1-f466-4803-a69e-720a098b08a5.svg?828688",
                    size: new AMap.Size(60, 60),
                    imageSize: new AMap.Size(20, 30)
                })
            });
            if (contentString) {
                let infoWindow = new AMap.InfoWindow({
                    isCustom: true,
                    content: contentString,
                    offset: new AMap.Pixel(16, -45)
                });
                marker.on("click", function(e) {
                    infoWindow.open(window.mapObj, e.target.getPosition());
                });
            }
        },
        initMap() {
            let lnglat = wgs84ToGcjo2(this.mapInfo.lng, this.mapInfo.lat);
            this.mapObj = new AMap.Map(this.elId ? this.elId : "map", {
                center: lnglat,
                zoom: 17
            });
            this.roadLayer = new AMap.TileLayer.RoadNet({});
            this.safeLayer = new AMap.TileLayer.Satellite({});
            this.mapObj.add(this.roadLayer);
            this.mapObj.add(this.safeLayer);
            this.safeLayer.hide();
            this.roadLayer.hide();

            window.mapObj = this.mapObj;
            let area2 = [];
            this.mapInfo["area"]
                ? this.mapInfo["area"].map(function(item) {
                      let temp = item.split(",");
                      area2.push(wgs84ToGcjo2(Number(temp[0]), Number(temp[1])));
                  })
                : "";
            let polygon = new AMap.Polygon({
                path: area2,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35
            });
            this.mapObj.add(polygon);
            if (this.mapInfo.showMult) {
                this.mapInfo.vehicleInfo.map(item => {
                    let temp = wgs84ToGcjo2(item.lastLocationLng, item.lastLocationLat);
                    let title = `${item.year ? item.year : "N/A"} ${item.make ? item.make : "N/A"} ${item.model ? item.model : "N/A"}`;
                    let contentString = `<a href='/vehicle/detail/${item.vehicleId}'>
                            <img style="background: #3a4149" src="${item.photoPath ? item.photoPath : "/img/placeholder.5367544d.svg"}" width="100%">
                            <h5 id="firstHeading" class="firstHeading">${item.year ? item.year : "N/A"} ${item.make ? item.make : "N/A"} ${item.model ? item.model : "N/A"}</h5>
                            </a>`;
                    this.addMarker(temp, title, contentString);
                });
            } else {
                this.addMarker(lnglat, this.mapInfo.vehicleInfo, null);
            }
            this.mapObj.setFitView();
        },
        changeMapType(type) {
            if (type == "default") {
                this.roadLayer.hide();
                this.safeLayer.hide();
            } else {
                this.roadLayer.show();
                this.safeLayer.show();
            }
        }
    }
};
</script>
