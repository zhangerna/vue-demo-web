<template>
    <div class="animated fadeIn mainI">
        <b-row>
            <b-col sm="6" lg="3" v-for="(item, index) in card" :key="index" class="card-hover"
                   @click='$router.push({name: "VehicleList",
                   query: {filters:  `[{ "key":"${item.key}","value":["${item.value}"]}]` }})'>
                <b-card no-body :class="item.class">
                    <b-card-body>
                        <b-row>
                            <b-col sm="6" lg="6" class="remove-padding">
                                <img  :src="item.img">
                            </b-col>
                            <b-col sm="6" lg="6" class="text-center text-white remove-padding remind-number">
                                <div>
                                    <p class="text-uppercase font-weight-bold text-muted">{{ $t(item.name) }}</p>
                                    <p class="text-uppercase text-value-lg font-weight-bold text-muted">{{ item.num }}</p>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="showLog && showLog.length > 0">
            <b-col sm="12" lg="12">
                <b-card
                        header-tag="header"
                        footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong>{{ $t('m.index.recent_title') }}</strong>
                        <small class="text-muted last-update" v-cloak>{{ $t('m.index.last_update') }}: {{ lastDate }}</small>
                    </div>
                    <b-table class="mb-0 table-outline" small striped responsive="sm" :items="$store.getters.logList" hover :fields="tableFields">
                        <template slot="user" slot-scope="data">
                            <span class="user-name" @click="$router.push('/inventory/admin/detail/' + data.item.userId)">{{ data.item.user }}</span>
                        </template>
                        <template slot="vehicle" slot-scope="data">
                            <span class="user-name" @click="$router.push('/inventory/vehicle/detail/' + data.item.vehicleId)">{{ data.item.vehicle }}</span>
                        </template>
                    </b-table>
                </b-card>
            </b-col>
        </b-row>
        <b-row columns class="pie-group">
            <b-col sm="6" lg="6">
                <b-card :header="$t('m.index.battery')" class="text-center">
                    <div style="height:400px"  id="battery-health">
                    </div>
                </b-card>
            </b-col>
            <b-col sm="6" lg="6">
                <b-card :header="$t('m.index.l_location')" class="text-center">
                    <div style="height:400px"  id="inventory-location">
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="env == 'en'" >
            <b-col sm="12" lg="12">
                <b-card>
                    <b-row>
                        <b-col sm="6" lg="6">
                            <h4>{{ $t('m.index.sale_title') }}</h4>
                            <p class="text-muted">{{ salePersonDate }}</p>
                        </b-col>
                        <b-col sm="6" lg="6" class="text-right">
                            <b-dropdown :text="weekly == 'week' ? $t('m.index.weeks') : $t('m.index.month')" class="btn-group btn-group-toggle m-2 week-drop">
                                <b-dropdown-item>
                                    <i v-if="weekly == 'week'" class="fa fa-check mt-3 mr-1 float-left"></i>
                                    <div @click="chooseSaleDate('week')">
                                        <h6>{{ $t('m.index.week_inter') }}</h6>
                                        <p class="small text-muted mb-0">{{ $t('m.index.week_des') }}</p>
                                    </div>
                                </b-dropdown-item>
                                <b-dropdown-item>
                                    <i v-if="weekly != 'week'" class="fa fa-check mt-3 mr-1 float-left"></i>
                                    <div @click="chooseSaleDate('month')">
                                        <h6>{{ $t('m.index.mon_inter') }}</h6>
                                        <p class="small text-muted mb-0">{{ $t('m.index.mon_des') }}</p>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <div style="display: inline-block" class="text-muted">{{ $t('m.index.last') }} {{ weekly == 'week' ? '12 ' + $t('m.index.weeks') : '6 ' + $t('m.index.month') }}</div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" lg="12" id="sale" style="height: 400px">
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="env == 'en'">
            <b-col sm="12" lg="12">
                <b-card>
                    <b-row>
                        <b-col sm="6" lg="6">
                            <h4>{{ $t('m.index.per_deal') }}</h4>
                            <p class="text-muted">{{ dailyDate }}</p>
                        </b-col>
                        <b-col sm="6" lg="6" class="text-right">
                            <b-dropdown :text="daily == 'daily' ? $t('m.index.daily') : (daily == 'week' ? $t('m.index.weeks') : $t('m.index.month'))" class="btn-group btn-group-toggle m-2 week-drop">
                                <b-dropdown-item>
                                    <i v-if="daily == 'daily'" class="fa fa-check mt-3 mr-1 float-left"></i>
                                    <div @click="chooseDealDate('daily')">
                                        <h6>{{ $t('m.index.daily_inter') }}</h6>
                                        <p class="small text-muted mb-0">{{ $t('m.index.daily_des') }}</p>
                                    </div>
                                </b-dropdown-item>
                                <b-dropdown-item>
                                    <i v-if="daily == 'week'" class="fa fa-check mt-3 mr-1 float-left"></i>
                                    <div @click="chooseDealDate('week')">
                                        <h6>{{ $t('m.index.week_inter') }}</h6>
                                        <p class="small text-muted mb-0">{{ $t('m.index.week_des') }}</p>
                                    </div>
                                </b-dropdown-item>
                                <b-dropdown-item>
                                    <i v-if="daily == 'month'" class="fa fa-check mt-3 mr-1 float-left"></i>
                                    <div @click="chooseDealDate('month')">
                                        <h6>{{ $t('m.index.mon_inter') }}</h6>
                                        <p class="small text-muted mb-0">{{ $t('m.index.mon_des') }}</p>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <div style="display: inline-block" class="text-muted">{{ $t('m.index.last') }} {{ daily == 'week' ? '12 ' + $t('m.index.weeks') : (daily == 'daily') ? '30 ' + $t('m.index.daily') : '6 ' + $t('m.index.month') }}</div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" lg="12" id="deaLocation" style="height: 400px">
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<style lang="scss">
    .mainI {
        .dropdown-item{
            padding: 10px 30px;
        }
        .dropdown-item i{
            margin-left: -24px;
        }
        .card {
            width: 100%;
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
        strong, small {
            margin-left: 10px;
        }
        .card-hover {
            cursor: pointer;
        }
        .user-name {
            color: #20a8d8;
            cursor: pointer;
        }
        .table-outline td {
            height: 40px;
        }
        .table {
            th {
                color: #73818f;
            }
        }
        .week-drop {
            button {
                color: #73818f;
                background-color: transparent;
                background-image: none;
                border-color: #73818f;
            }
        }
        .pie-group {
            #battery-health > div, #inventory-location > div{
                margin: 0 auto;
            }
            h4 {
                text-align: center;
                color: #73818f;
            }
        }
    }
</style>

<script>
    import httpclient from '@/utils/httpclient';
    import echarts from 'echarts';
    import { getDateString, getYMDFormart } from "@/utils/date"

    export default {
        name: "mainI",
        data() {
            return {
                weekly: "week",
                daily: "daily",
                dailyDate: "",
                env:'',
                salePersonDate: "",
                card: {
                    "inventory": {
                        name: "m.index.inventory",
                        img: require('@assets/pages-img/inven-icon.svg'),
                        type: "inventory",
                        class: "bg-primary",
                        num: "",
                        filters: null,
                        key:'',
                        value:''
                    },
                    "offLots": {
                        name: "m.index.offlot",
                        img: require('@assets/pages-img/off-lot.svg'),
                        type: "off lot",
                        class: "bg-info",
                        num: "",
                        filters: null,
                        key:'',
                        value:''
                    },
                    "extremelyLowPower": {
                        name: "m.index.low",
                        img: require('@assets/pages-img/low-bat.svg'),
                        type: "low battery",
                        class: "bg-warning",
                        num: "",
                        filters: null,
                        key:'',
                        value:''
                    },
                    "offLine": {
                        name: "m.index.offline",
                        img: require('@assets/pages-img/off-line.svg'),
                        type: "offline",
                        class: "bg-danger",
                        num: "",
                        filters: null,
                        key:'',
                        value:''
                    }
                },
                option1 : {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        textStyle: {
                            color:["#000000"],
                        },
                        data:[this.$t('m.index.l_low'), '11.7V - 12.1V', this.$t('m.index.l_above')]
                    },
                    series : [
                        {
                            type:'pie',
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:0, name:this.$t('m.index.l_low')},
                                {value:0, name:'11.7V - 12.1V'},
                                {value:0, name:this.$t('m.index.l_above')}
                            ],
                            color: ['rgb(255,99,132)',
                                'rgb(255, 205, 86)',
                                'rgb(54, 162, 235)',]
                        }
                    ]
                },
                option2 : {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        textStyle: {
                            color:["#000000"],
                        },
                        data:[this.$t('m.index.r_lot'), this.$t('m.index.r_off')]
                    },
                    series : [
                        {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:0, name:this.$t('m.index.r_lot')},
                                {value:0, name:this.$t('m.index.r_off')}
                            ],
                            color: ['rgb(54, 162, 235)',
                                'rgb(255,99,132)']
                        }
                    ]
                },
                showLog: false,
                lastDate: null,
                color: ['99,194,222,0.8', '248,108,107,0.8', '255,193,5,0.8', '32,168,216,0.8', '77,189,116,0.8'],
                deaLoction: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[],
                        textStyle: {
                            color:["#000000"],
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "black"
                            }
                        },
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: "#73818f"
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "black"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#73818f"
                            }
                        }
                    },
                    series: []
                },
                saleOption: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[
                            {
                                name: this.$t('m.index.average_time'),
                                icon: "roundRect"
                            },
                            {
                                name: this.$t('m.index.average_num'),
                                icon: "roundRect",

                            }],
                        textStyle: {
                            color:["#000000"],
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "black"
                            }
                        },
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: "#73818f"
                            }
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "black"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#73818f"
                                }
                            }
                        },
                        {
                            type: 'value',
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "black"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#73818f"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: this.$t('m.index.average_time'),
                            type:'line',
                            smooth: true,
                            yAxisIndex: 0,
                            data:[],
                            color: 'rgba(99,194,222, 0.8)',
                            backgroundColor: "#73818f"
                        },
                        {
                            name:this.$t('m.index.average_num'),
                            type:'line',
                            yAxisIndex: 1,
                            smooth: true,
                            data:[],
                            color: 'rgba(248,108,107, 0.8)'
                        }
                    ]
                },
                tableFields: {
                    user: {
                        label: this.$t('m.index.user'),
                        class: "text-left"
                    },
                    action: {
                        label: this.$t('m.common.action'),
                        class: "text-left"
                    },
                    vehicle: {
                        label: this.$t('m.common.vehicle'),
                        class: "text-left"
                    },
                    time: {
                        label: this.$t('m.index.time_stamp'),
                        class: "text-left"
                    }
                },
                pie1: null,
                pie2: null,
                data: null
            }
        },
        mounted() {
            this.env = process.VUE_APP_ENV;
            this.$store.dispatch("clear_log_list", []);
            this.initData();
        },
        methods: {
            initData() {
                new Promise((resolve, reject) => {
                    httpclient.get("/api/v1/index", {}).then((response) => {
                        httpclient.get("/api/v1/vehicle/availableLogList", {}).then((res) => {
                            this.filterData(response.data.data, res.data.data)
                            resolve();
                        }).catch(() => {
                            this.filterData(response.data.data, []);
                            resolve();
                        });
                    }).catch((err) => {
                        resolve();
                    });
                }).then(() => {
                    this.getSales(2);
                }).then(() => {
                    this.getDealData(1)
                })

            },
            chooseDealDate(type){
                this.daily = type;
                let num = (type == 'daily') ? 1: (type == 'week' ? 2 : 3);
                this.getDealData(num)
            },
            getDealData(num) {
                httpclient.post("/api/v1/index/averageparkinglotdata", {timeType: num}).then((res) => {
                    this.filterDealData(res.data.data);
                }).catch((err) => {
                    // alert(err)
                })
            },
            filterDealData(data) {
                this.deaLoction.series = [];
                this.deaLoction.xAxis.data = [];
                this.deaLoction.legend.data = [];
                let firstTime = getYMDFormart(data[0].averageDrivingTime2[data[0].averageDrivingTime2.length - 1].data);
                let lastTime = getYMDFormart(data[0].averageDrivingTime2[0].data);
                this.dailyDate = `${firstTime} - ${lastTime}`;
                data.map((item, key) => {
                    this.deaLoction.legend.data.push({
                        name: item.parkingName,
                        icon: "roundRect"
                    });
                    let seData = [];
                    item.averageDrivingTime.reverse().map((it, k) => {
                        seData.push(it.value);
                        key == 0 ? this.deaLoction.xAxis.data.push(it.data) : null;
                    });
                    this.deaLoction.series.push({
                        name: item.parkingName,
                        type:'line',
                        smooth: true,
                        data: seData,
                        color: `rgba(${this.color[key]})`,
                        backgroundColor: "#73818f"
                    })

                });
                echarts.init(document.getElementById("deaLocation")).setOption(this.deaLoction);
            },
            filterSalesData(data) {
                this.saleOption.xAxis.data = [];
                this.saleOption.series[0].data = [];
                this.saleOption.series[1].data = [];
                let firstTime = getYMDFormart(data[data.length - 1].standardStartDate);
                let lastTime = getYMDFormart(data[0].standardStartDate);
                this.salePersonDate = `${firstTime} - ${lastTime}`;
                for (let item of data.reverse()) {
                    this.saleOption.xAxis.data.push(item.startDate);
                    this.saleOption.series[0].data.push(item.averageDrivingTime);
                    this.saleOption.series[1].data.push(item.averageDrivingNumber);
                }
                echarts.init(document.getElementById("sale")).setOption(this.saleOption);
            },
            getSales(num) {
                httpclient.post("/api/v1/index/averagesalesdata", {timeType: num}).then((res) => {
                    this.filterSalesData(res.data.data);
                }).catch((err) => {
                    // alert(err)
                })
            },
            chooseSaleDate(type) {
                this.weekly = type;
                let num = (type == 'month') ? 3 : 2;
                this.getSales(num)
            },
            formatTime(val) {//格式化时间（06/17/2019 19:08）
                let mon = (val.getMonth() + 1) > 9 ? (val.getMonth() + 1) : '0' + (val.getMonth() + 1);
                let data = val.getDate() > 9 ? val.getDate() : '0' + val.getDate();
                let hour = val.getHours() > 9 ? val.getHours() : '0' + val.getHours();
                let minute = val.getMinutes() > 9 ? val.getMinutes() : '0' + val.getMinutes();
                return mon + '/' + data + '/' + val.getFullYear() + '  ' + hour + ':' + minute
            },
            filterData(data, loglist) {
                this.data = data;
                this.showLog = loglist.map(item => {
                    return {
                        user: item.firstName + " " + item.lastName,
                        action: item.available == '1' ? this.$t('m.index.has_just') + this.$t('m.index.check_in') : this.$t('m.index.has_just') + this.$t('m.index.check_out'),
                        vehicle: `${item.year ? item.year : 'N/A'} ${item.make ? item.make : 'N/A'} ${item.model ? item.model : 'N/A'}`,
                        time: getDateString(Number(item.createTime)),
                        vehicleId: item.vehicleId,
                        userId: item.checkUserId
                    }
                });
                this.$store.dispatch("save_log_list", this.showLog);

                this.lastDate = this.formatTime(new Date());
                let batHealth = ["extremelyLowPower", "lowPower", "commonPower"];
                let inventory = ["inLots", "offLots"];

                for (let item in this.card) {
                    this.card[item]["num"] = data[item] ? data[item]["num"] : "";
                    this.card[item]["filters"] = data[item] ? data[item]["filters"] : "";
                    this.card[item]["key"] = data[item] ? data[item]["filters"][0].key: "";
                    this.card[item]["value"] = data[item] ? data[item]["filters"][0].value[0]: "";
                }

                for (let i in batHealth){
                    this.option1.series[0].data[i].value = data[batHealth[i]]["num"]
                }
                for (let i in inventory){
                    this.option2.series[0].data[i].value = data[inventory[i]]["num"];
                }
                this.pie1 = echarts.init(document.getElementById("battery-health"));
                this.pie1.setOption(this.option1);
                this.pie2 = echarts.init(document.getElementById("inventory-location"));
                this.pie2.setOption(this.option2);
                let self = this;
                this.pie1.on("click", function (param) {
                    if (param.dataIndex == 0) {
                        self.$router.push({name: "VehicleList",
                            query: {filters:  JSON.stringify([{key:"battery",value:["1"]}]) }})
                    } else if(param.dataIndex == 1) {
                        self.$router.push({name: "VehicleList",
                            query: {filters:  JSON.stringify([{key:"battery",value:["2"]}]) }})
                    } else {
                        self.$router.push({name: "VehicleList",
                            query: {filters:  JSON.stringify([{key:"battery",value:["3"]}]) }})
                    }
                });
                this.pie2.on("click", function (param) {
                    if (param.dataIndex == 0) {
                        self.$router.push({name: "VehicleList",
                            query: {filters:  '[' + JSON.stringify(self.data.inLots.filters[0]) + ']' }})
                    } else {
                        self.$router.push({name: "VehicleList",
                            query: {filters: '[' + JSON.stringify(self.data.offLots.filters[0]) + ']' }})
                    }
                });

            }
        }

    }
</script>
