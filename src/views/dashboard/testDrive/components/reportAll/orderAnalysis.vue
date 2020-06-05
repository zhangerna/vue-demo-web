<template>
    <div class="order-analysis">
        <b-card>
            <div slot="header">
                {{ $t('m.report_all.appoint_order_analysis') }}
                <div class="float-right">
                    {{ $t('m.report.createTime') }}:{{ data.createTime ? getDateString(data.createTime) : '' }}
                </div>
            </div>
            <div class="content">
                <div class="filter-module">
                    <b-form-select v-model="vehicleId" class="width20" @change="changeOrderType()">
                        <option value="">{{ $t('m.report_all.whole_vehicle') }}</option>
                        <option v-for="(item, key) in vehicleList" :key="key" :value="key + 1">
                            {{ item.vehicleYear	 }}{{ item.vehicleMake	 }}{{ item.vehicleModel	 }}
                        </option>
                    </b-form-select>
<!--                    二级联动-->
                    <b-form-select v-model="provinceId" class="width20" @change="changeOrderType()">
                        <option value="">{{ $t('m.report_all.whole_state') }}</option>
                        <option v-for="(item, key) in provinceList" :key="key + 1" :value="key + 1">
                            {{ item.provinceName }}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="cityId" class="width20" @change="changeOrderType()">
                        <option value="">{{ $t('m.add_shop.please_select') }}</option>
                        <option v-for="(item, key) in provinceId ? (provinceList[provinceId - 1]['cityLevelResponseList']) : []" :key="key" :value="key + 1">
                            {{ item.cityName }}
                        </option>
                    </b-form-select>

                    <b-form-select v-model="userTime" class="width20" @change="changeOrderType()">
                        <option v-for="(item, key) in timeList" :key="key" :value="item.val">
                            {{ item.name }}
                        </option>
                    </b-form-select>
                </div>
                <b-card class="margin20">
                    <div slot="header">
                        {{ $t('m.report_all.appoint_order_trend') }}
                    </div>
                    <div class="content">
                        <p>{{ $t('m.report_all.appoint_order') }}：{{ data.orderTotalNum }}</p>
                        <div class="text-center">
                            <label class="btn-primary btn">{{ $t('m.report_all.new_appoint_order') }} {{ data.orderChangeTotalNum }}</label>
                        </div>
                        <div class="test-number text-center margin20">
                            <i class="blue-interval"></i><span>{{ $t('m.report_all.appoint_order_count') }}</span>
                        </div>
                        <div class="echart-line">
                            <div id="order-line"></div>
                        </div>
                    </div>
                </b-card>
                <b-row>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.cloud.appoint_order_status') }}
                            </div>
                            <div class="content">
                                <div id="order-status"></div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.cloud.drive_time') }}
                            </div>
                            <div class="content">
                                <div id="drive-duration"></div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.report_all.appoint_area') }}
                            </div>
                            <div class="content">
                                <div class="area-block" v-for="(item, key) in data.lotAreaMap" :key="key">
                                    <p class="margin-b-4">
                                        <span>{{ item.parkingLotAreaName }}</span>
                                        <span class="float-right">{{ item.orderNum }}</span>
                                    </p>
                                    <b-progress height="2px" :value="item.orderNum"></b-progress>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.cloud.order_drive_store') }}
                            </div>
                            <div class="content">
                                <div class="drive-block" v-for="(item, key) in data.orderLotReportMap" :key="key">
                                    <p class="margin-b-4">
                                        <span>{{ item.parkingLotName }}</span>
                                        <span class="float-right">{{ item.orderNum }}</span>
                                    </p>
                                    <b-progress height="2px" :value="item.orderNum"></b-progress>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
    import httpClient from '@/utils/httpclient';
    import echarts from 'echarts';
    import { getDateString } from '@/utils/date';
    export default {
        name: "orderAnalysis",
        data() {
            return {
                vehicleId: '',
                provinceId: '',
                cityId: '',
                timeList: [
                    {
                        name: this.$t('m.report_all.day10'),
                        val: "7"
                    },
                    {
                        name: this.$t('m.report_all.day30'),
                        val: "30"
                    },
                    {
                        name: this.$t('m.report_all.day90'),
                        val: "90"
                    }
                ],
                userTime: '30',
                orderLine: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        show: true,
                        data: [],
                        axisLabel: {
                            interval: 0
                        },
                        axisLine: {
                            show: true,
                        },
                        axisTick: {
                            show: true
                        }
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        type: 'value',
                        show: true,
                        minInterval: 1,
                        name: ''
                    },
                    series: {
                        type: "line",
                        data: [],
                        animation: true,
                        itemStyle: {
                            normal: {
                                color: "#20a8d8",
                            }
                        },
                        name: this.$t('m.report_all.appoint_order_count')
                    },
                    grid: {
                        x: 30,
                        y: 40,
                        x2: 20,
                        y2: 80
                    }
                },
                data: {},
                orderStatus: {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        data:[this.$t('m.report_all.no_drive'), this.$t('m.report_all.had_drive')]
                    },
                    series: {
                        type:'pie',
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        radius : '68%',
                        center: ['50%', '60%'],
                        data:[],
                        color: ['rgb(54, 162, 235)','rgb(255,99,132)']
                    }
                },
                driveDuration: {
                    tooltip: { trigger: 'item' },
                    legend: {
                        y: "20px",
                        data:[this.$t('m.report_all.time_less10'), this.$t('m.report_all.time_1020'), this.$t('m.report_all.time_2030'), this.$t('m.report_all.time_3040'), this.$t('m.report_all.time_more40')]
                    },
                    series: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        type:'pie',
                        radius : '68%',
                        center: ['50%', '60%'],
                        data: [],
                        color: ['rgb(32, 168, 216)', 'rgb(232, 62, 140)', 'rgb(248, 203, 0)', 'rgb(77, 189, 116)', 'rgb(99, 194, 222)']
                    }
                },
                vehicleList: [],
                provinceList: []
            }
        },
        mounted() {
            httpClient.get('/api/v1/clouddrive/order/vehicletypelist').then(response => {
                if (response.data.code == 200) {
                    this.vehicleList = response.data.data.vehicleSelectDetailResponseList;
                }
            });
            httpClient.get('/api/v1/clouddrive/order/provincialLevellist').then(response => {
                if (response.data.code == 200) {
                    this.provinceList = response.data.data;
                }
            });
            this.initData();
        },
        methods: {
            getDateString,
            changeOrderType() {
                this.initData();
            },
            initData() {
                httpClient.post(`/api/v1/clouddrive/manyreport/ordermanyreport`, {
                    timeRange: this.userTime,
                    vehicleMake: this.vehicleId ? this.vehicleList[this.vehicleId-1].vehicleMake : '',
                    vehicleYear: this.vehicleId ? this.vehicleList[this.vehicleId-1].vehicleYear : '',
                    vehicleModel: this.vehicleId ? this.vehicleList[this.vehicleId-1].vehicleModel : '',
                    parkingStateCode: this.provinceId ? this.provinceList[this.provinceId - 1]['provinceId'] : '',
                    parkingCityCode: this.cityId && this.provinceId ? this.provinceList[this.provinceId - 1]['cityLevelResponseList'][this.cityId - 1]['cityId'] : ''
                }).then(response => {
                    if (response.data.code == 200){
                        this.data = response.data.data;
                        this.getOrder(response.data.data.reportChangeDTOList);
                        this.getOrderStatus(response.data.data);
                        this.getDriveDuration(response.data.data);
                    }
                });
            },
            getOrder(data) {
                let xList = [];
                let yList = [];
                data.map((item) => {
                    xList.push(item.orderDate);
                    yList.push(item.orderTotal);
                });
                if (this.userTime == 7) {
                    this.orderLine.xAxis.axisLabel.interval = 0;
                } else {
                    this.orderLine.xAxis.axisLabel.interval = 6;
                }
                this.orderLine.xAxis.data = xList;
                this.orderLine.series.data = yList;
                echarts.init(document.getElementById('order-line')).setOption(this.orderLine)
            },
            getOrderStatus(data) {
                this.orderStatus.series.data = [
                    {value: data.notTestDriveNum, name:this.$t('m.report_all.no_drive')},
                    {value: data.testDriveNum, name:this.$t('m.report_all.had_drive')}
                ];
                echarts.init(document.getElementById('order-status')).setOption(this.orderStatus);
            },
            getDriveDuration(data) {
                this.driveDuration.series.data = [
                    {value: data.lessTenMinute, name:this.$t('m.report_all.time_less10')},
                    {value: data.betweenTenAndTwentyMin, name:this.$t('m.report_all.time_1020')},
                    {value: data.betweenTwentyAndThirtyMin, name:this.$t('m.report_all.time_2030')},
                    {value: data.betweenThirtyAndFortyMin, name:this.$t('m.report_all.time_3040')},
                    {value: data.moreFortyMin, name:this.$t('m.report_all.time_more40')}
                ];
                echarts.init(document.getElementById('drive-duration')).setOption(this.driveDuration)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .margin20 {
        margin-top: 20px;
    }
    .width20 {
        width: 20%;
        margin-right: 10px;
    }
    .margin-b-4 {
        margin-bottom: 4px;
    }
    #order-line, #order-status, #drive-duration {
        height: 260px;
    }
    .test-number {
        color: #20a8d8;
    }
    .blue-interval {
        width: 10px;
        height: 10px;
        background: #20a8d8;
        display: inline-block;
        margin-right: 10px;
    }
</style>
