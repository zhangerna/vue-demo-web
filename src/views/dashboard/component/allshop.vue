<template>
    <div class="animated fadeIn mainI">
        <b-row>
            <div class="col-6 col-lg-3" v-for="(item, index) in card" :key="index">
                <div class="card" @click='linkTo(item.type)'>
                    <div class="card-body p-0 d-flex align-items-center">
                        <img :class="item.class"  :src="item.img">
                        <div class="margin20">
                            <div class="text-value-lg" :class="item.style">{{ item.num }}</div>
                            <div class="text-muted text-uppercase font-weight-bold small">{{ $t(item.name) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </b-row>
        <search-map :map="map" :from="'dashboard'"></search-map>
    </div>
</template>

<script>
    import httpclient from '@/utils/httpclient';
    import searchMap from '@components/searchMap'
    export default {
        name: "allShop",
        components: {
            searchMap
        },
        data() {
            return {
                card: {
                    "inventory": {
                        name: "m.index.inventory",
                        img: require('@assets/pages-img/inven-icon.svg'),
                        type: "inventory",
                        class: "bg-primary",
                        style: "blue",
                        num: "",
                        filters: null,
                        key:'',
                        value:'',
                        link: "/vehicle"
                    },
                    "offLots": {
                        name: "m.index.offlot",
                        img: require('@assets/pages-img/off-lot.svg'),
                        type: "offLots",
                        class: "bg-info",
                        style: "pure-blue",
                        num: "",
                        filters: null,
                        key:'',
                        value:'',
                        link: ""
                    },
                    "extremelyLowPower": {
                        name: "m.index.low",
                        img: require('@assets/pages-img/low-bat.svg'),
                        type: "extremelyLowPower",
                        class: "bg-warning",
                        style: "yellow",
                        num: "",
                        filters: null,
                        key:'',
                        value:'',
                        link: ""
                    },
                    "saleVehicleCount": {
                        name: "m.sold_vehicle.vehicle_sold",
                        img: "https://pic.zus.ai/saas/sold.svg",
                        type: "saleVehicle",
                        class: "bg-danger",
                        style: "red",
                        num: "",
                        filters: null,
                        key:'',
                        value:'',
                        link: "/sold-manager/list"
                    }
                },
                data: null,
                map: null
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                httpclient.get("/api/v1/index", {}).then((response) => {
                    this.filterData(response.data.data)
                }).catch((err) => {
                    console.log(err)
                });

            },
            linkTo(type) {
                if (type == "inventory") {
                    this.$router.push({name: 'VehicleList', query: {
                        filters: `[{"key": "inventory", "value": [1]}]`
                        }});
                } else if (type == "offLots") {
                    this.$router.push({name: 'VehicleList', query: {
                            filters: `[{"key":"parking","value":[2]}]`
                        }});
                } else if (type == "extremelyLowPower") {
                    this.$router.push({name: 'VehicleList', query: {
                            filters: `[{"key":"battery","value":[1]}]`
                        }});
                } else {
                    this.$router.push('/sold-manager/list');
                }
            },
            filterData(data) {
                this.data = data;
                this.map = data.searchMapDTO;
                for (let item in this.card) {
                    this.card[item]["num"] = data[item] ? data[item]["num"] : "";
                    this.card[item]["filters"] = data[item] ? data[item]["filters"] : "";
                    this.card[item]["key"] = data[item] ? data[item]["filters"][0].key: "";
                    this.card[item]["value"] = data[item] ? data[item]["filters"][0].value[0]: "";
                }

            }
        }

    }
</script>

<style lang="scss" scoped>
    .mainI {
        .card {
            cursor: pointer;
            width: 100%;
            .margin20 {
                margin-left: 20px;
            }
            img {
                height:80px;
                padding: 8px
            }
            .yellow {
                color: #ffc107;
            }
            .red {
                color: #f86c6b;
            }
            .blue {
                color: #20a8d8;
            }
            .pure-blue {
                color: #63c2de;
            }
        }
        .remind-number{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .remove-padding {
            padding: 0 4px;
            p{
                margin: 0;
            }
        }
    }
</style>
