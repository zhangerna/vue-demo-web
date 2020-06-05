<template>
    <div id="#map">
    </div>
</template>

<style lang="scss">
    #map {
        height: 40vh;
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
        props: ["address"],
        data() {
            return {
                addres: "",
                mapObj: null
            }
        },
        watch: {
            address: function (newVal) {
                // console.log(1)
                this.addres = newVal;
                this.initMap()
            }
        },
        methods: {
            initMap(){
                this.mapObj = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    mapTypeId:google.maps.MapTypeId.SATELLITE,
                });

                this.geocoders = new google.maps.Geocoder();
                this.geocoders.geocode({'address': this.addres}, (results, status) => {
                    if (status == "OK") {
                        this.mapObj.setCenter(results[0].geometry.location);
                        new google.maps.Marker({
                            map: this.mapObj,
                            position: results[0].geometry.location,
                            icon: "https://cdn.shopify.com/s/files/1/0703/1149/files/60x60.png?854740"
                        });
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });

            }
        }
    }
</script>
