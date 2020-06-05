<template>
    <div id="map"></div>
</template>

<style lang="scss">
    #map {
        height: 70vh;
        .gm-style .gm-style-iw-d {
            max-width: 280px!important;
            img {
                width: 100%;
            }
        }
    }
</style>

<script>
    import google from "google"
    export default {
        name: "googleMap",
        props: ["map"],
        data() {
            return {
                mapInfo: null,
                mapObj: null,
                marker: null,
                polygon: null,
                markers: []

            }
        },
        watch: {
            map: function (newVal) {
                // console.log(newVal);
                this.mapInfo = newVal;
                this.initMap()
            }
        },
        methods: {
            addMarker(position, title, contentString) {
                let infoWindow = new google.maps.InfoWindow({
                    content:contentString
                });
                var marker = new google.maps.Marker({
                    position: position,
                    map: this.mapObj,
                    animation: google.maps.Animation.DROP,
                    title: title,
                    icon: "https://cdn.shopify.com/s/files/1/0703/1149/files/Location.png?807016",
                });
                this.markers.push(marker);
                marker.addListener('click', function () {
                    infoWindow.open(this.mapObj, marker);
                })
            },
            initMap(){
                let coords = [];
                // console.log(this.mapInfo["area"]);
                for (let item of this.mapInfo["area"]) {
                    coords.push({lat: Number(item.split(",")[1]), lng: Number(item.split(",")[0]) })
                }
                // console.log(this.mapInfo.lng);
                this.mapObj = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: {lng: Number(this.mapInfo.lng), lat: Number(this.mapInfo.lat)},
                });
                if (this.mapInfo.showMult) {
                    this.mapInfo.vehicleInfo.map(item => {
                        let position = {lat: item.lastLocationLat, lng: item.lastLocationLng};
                        let title = `${item.year? item.year :'N/A'} ${item.make? item.make :'N/A'} ${item.model? item.model:'N/A'}`;
                        let contentString = `<a href='/vehicle/detail/${item.vehicleId}'>
                            <img style="background: #3a4149" src="${item.photoPath ? item.photoPath : '/img/placeholder.5367544d.svg'}" width="40%">
                            <h5 id="firstHeading" class="firstHeading">${item.year ? item.year :'N/A'} ${item.make ? item.make :'N/A'} ${item.model ? item.model:'N/A'}</h5>
                            </a>`;
                        this.addMarker(position, title, contentString);
                    })
                } else {
                    this.marker = new google.maps.Marker({
                        position: {lng: Number(this.mapInfo.lng), lat: Number(this.mapInfo.lat)},
                        map: this.mapObj,
                        icon: {
                            url: "https://cdn.shopify.com/s/files/1/0703/1149/files/Location.png?807016",
                            scaledSize: new google.maps.Size(30, 30)
                        }
                    });
                }
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
