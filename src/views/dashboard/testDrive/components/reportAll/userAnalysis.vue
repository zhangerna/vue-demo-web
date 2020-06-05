<template>
    <div class="user-analysis">
        <b-card>
            <div slot="header">
                {{ $t('m.report_all.user_analysis1') }}
                <div class="float-right">
                    {{ $t('m.report.createTime') }}:{{ date.createTime ? getDateString(date.createTime) : '' }}
                </div>
            </div>
            <div class="content">
                <div class="choice-time">
                    <b-form-select v-model="userTime" class="width30" @change="changeType()">
                        <option v-for="(item, key) in timeList" :key="key" :value="item.val">
                            {{ item.name }}
                        </option>
                    </b-form-select>
                </div>
                <b-card class="margin20">
                    <div slot="header">
                        {{ $t('m.report_all.user_change_trend') }}
                    </div>
                    <p>{{ $t('m.report_all.user_total') }}：{{ date.userTotalNum }}</p>
                    <div class="content">
                        <div class="btn-group mr-3 center-div center-div">
                            <label :class="newStatus ? 'btn-primary' : 'btn-outline-primary'" class="btn" @click="changeUserType('new')">{{ $t('m.report_all.new_user') }}{{ date.changeNumReportDTO ? date.changeNumReportDTO.newUserCount : '' }}</label>
                            <label class="btn margin-left-right-0" :class="appointStatus ? 'btn-primary' : 'btn-outline-primary'" @click="changeUserType('appoint')">{{ $t('m.report_all.appoint_user') }}{{ date.changeNumReportDTO ? date.changeNumReportDTO.userAppointmentCount : '' }}</label>
                            <label class="btn margin-left-right-0" :class="hadUser ? 'btn-primary' : 'btn-outline-primary'" @click="changeUserType('had_user')">{{ $t('m.report_all.had_user') }}{{ date.changeNumReportDTO ? date.changeNumReportDTO.userDroveCount : '' }}</label>
                        </div>
                        <div class="test-number text-center margin20">
                            <i class="blue-interval"></i><span>{{ $t('m.report_all.user_count') }}</span>
                        </div>
                        <div id="line"></div>
                    </div>
                </b-card>
                <b-row>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.cloud.gender') }}
                            </div>
                            <div class="content">
                                <div id="gender"></div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.report.age') }}
                            </div>
                            <div class="content">
                                <div id="age"></div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
<!--                试驾次数和客户驾龄-->
                <b-row>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.report.test_drive_times') }}
                            </div>
                            <div class="content">
                                <div id="drive-count"></div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.report.driveAge') }}
                            </div>
                            <div class="content">
                                <div id="drive-age"></div>
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
        name: "userAnalysis",
        data() {
            return {
                userTime: '30',
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
                date: {},
                line: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: [],
                        axisLabel: {
                            interval: 6
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
                        name: this.$t('m.report_all.user_count')
                    },
                    grid: {
                        x: 30,
                        y: 40,
                        x2: 20,
                        y2: 80
                    }
                },
                gender: {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        textStyle: {
                            color:["#000000"],
                        },
                        data:[this.$t('m.common.boy'), this.$t('m.common.girl'), this.$t('m.common.default')]
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
                        center: ['50%', '64%'],
                        data:[],
                        color: ['rgb(255,99,132)',
                            'rgb(54, 162, 235)',
                            'rgb(200, 206, 211)']
                    }
                },
                age: {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        textStyle: {
                            color:["#000000"],
                        },
                        data:[this.$t('m.report_all.less20'), this.$t('m.report_all.less2030'), this.$t('m.report_all.less3040'), this.$t('m.report_all.less4050'), this.$t('m.report_all.less5060'), this.$t('m.report_all.more60'), this.$t('m.common.default')]
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
                        center: ['50%', '64%'],
                        data: [],
                        color: [
                            'rgb(32, 168, 216)',
                            'rgb(99, 194, 222)',
                            'rgb(232, 62, 140)',
                            'rgb(248, 203, 0)',
                            'rgb(77, 189, 116)',
                            'rgb(111, 66, 193)',
                            'rgb(200, 206, 211)']
                    }
                },
                driveAge: {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        textStyle: {
                            color:["#000000"],
                        },
                        data:[this.$t('m.report_all.age_less2'), this.$t('m.report_all.age_less24'), this.$t('m.report_all.age_less46'), this.$t('m.report_all.age_less68'), this.$t('m.report_all.age_less810'), this.$t('m.report_all.age_more10'), this.$t('m.common.default')]
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
                        center: ['50%', '64%'],
                        data: [],
                        color: ['rgb(32, 168, 216)', 'rgb(99, 194, 222)', 'rgb(232, 62, 140)', 'rgb(248, 203, 0)', 'rgb(77, 189, 116)', 'rgb(111, 66, 193)', 'rgb(200, 206, 211)']
                    }
                },
                driveCount: {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        y: "20px",
                        textStyle: {
                            color:["#000000"],
                        },
                        data:[this.$t('m.report_all.count0'), this.$t('m.report_all.count1'), this.$t('m.report_all.count2'), this.$t('m.report_all.count3')]
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
                        center: ['50%', '64%'],
                        data: [],
                        color: ['rgb(32, 168, 216)', 'rgb(232, 62, 140)', 'rgb(248, 203, 0)', 'rgb(77, 189, 116)']
                    }
                },
                newStatus: true,
                hadUser: false,
                appointStatus: false
            }
        },
        mounted() {
            this.initData(this.userTime);
        },
        methods: {
            getDateString,
            initData(userTime) {
                httpClient.get(`/api/v1/clouddrive/manyreport/usermanyreport?timerange=${userTime}`).then(response => {
                    if (response.data.code == 200){
                        this.date = response.data.data;
                        this.getUser(response.data.data.changeNumReportDTO.newUserChangeNumList);
                        this.getGenderAge(response.data.data);
                        this.getDriveAgeCount(response.data.data);
                    }
                });
            },
            changeType() {
                switch (this.userTime) {
                    case "7":
                        this.line.xAxis.axisLabel.interval = 0;
                        this.initData(7);
                        break;
                    case "30":
                        this.line.xAxis.axisLabel.interval = 6;
                        this.initData(30);
                        break;
                    case "90":
                        this.line.xAxis.axisLabel.interval = 6;
                        this.initData(90);
                        break;
                }
            },
            changeUserType(type) {
                switch (type) {
                    case 'new':
                        this.newStatus = true;
                        this.appointStatus = false;
                        this.hadUser = false;
                        this.getUser(this.date.changeNumReportDTO.newUserChangeNumList);
                        break;
                    case 'appoint':
                        this.appointStatus = true;
                        this.newStatus = false;
                        this.hadUser = false;
                        this.getUser(this.date.changeNumReportDTO.userAppointmentChangeNumList);
                        break;
                    case 'had_user':
                        this.hadUser = true;
                        this.newStatus = false;
                        this.appointStatus = false;
                        this.getUser(this.date.changeNumReportDTO.userDroveNumList);
                        break;
                }
            },
            getUser(data) {
                let xList = [];
                let yList = [];
                data.map((item) => {
                    xList.push(item.userDate);
                    yList.push(item.userCount);
                });
                this.line.xAxis.data = xList;
                this.line.series.data = yList;
                echarts.init(document.getElementById('line')).setOption(this.line)
            },
            getGenderAge(data) {
                this.gender.series.data = [
                    {value: data.manCount, name:this.$t('m.common.boy')},
                    {value: data.womanCount, name:this.$t('m.common.girl')},
                    {value: data.unKnownGenderCount, name: this.$t('m.common.default')}
                ];
                this.age.series.data = [
                    {value: data.ageFirstYoung, name:this.$t('m.report_all.less20')},
                    {value: data.ageSecondYoung, name:this.$t('m.report_all.less2030')},
                    {value: data.ageThirdYoung, name:this.$t('m.report_all.less3040')},
                    {value: data.ageFourthYoung, name:this.$t('m.report_all.less4050')},
                    {value: data.ageFifthYoung, name:this.$t('m.report_all.less5060')},
                    {value: data.ageSixthYoung, name:this.$t('m.report_all.more60')},
                    {value: data.unKnownUserAge, name:this.$t('m.common.default')}
                ];
                echarts.init(document.getElementById('gender')).setOption(this.gender);
                echarts.init(document.getElementById('age')).setOption(this.age);
            },
            getDriveAgeCount(data) {
                this.driveCount.series.data = [
                    {value: data.driveTimesFirstLeast, name:this.$t('m.report_all.count0')},
                    {value: data.driveTimesSecondLeast, name:this.$t('m.report_all.count1')},
                    {value: data.driveTimesThirdLeast, name:this.$t('m.report_all.count2')},
                    {value: data.driveTimesFourthLeast, name:this.$t('m.report_all.count3')}
                ];
                this.driveAge.series.data = [
                    {value: data.driveAgeFirstYoung, name:this.$t('m.report_all.age_less2')},
                    {value: data.driveAgeSecondYoung, name:this.$t('m.report_all.age_less24')},
                    {value: data.driveAgeThirdYoung, name:this.$t('m.report_all.age_less46')},
                    {value: data.driveAgeFourthYoung, name:this.$t('m.report_all.age_less68')},
                    {value: data.driveAgeFifthYoung, name:this.$t('m.report_all.age_less810')},
                    {value: data.driveAgeSixthYoung, name:this.$t('m.report_all.age_more10')},
                    {value: data.unKnownDriveAge, name:this.$t('m.common.default')}
                ];
                echarts.init(document.getElementById('drive-count')).setOption(this.driveCount);
                echarts.init(document.getElementById('drive-age')).setOption(this.driveAge);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .margin20 {
        margin-top: 20px;
    }
    .margin-left-right-0 {
        margin-left: 0px;
        margin-right: 0px;
    }
    .width30 {
        width: 30%;
    }
    #line, #gender, #age ,#drive-count, #drive-age {
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
    .center-div {
        position: relative;
        left: 50%;
        margin-left: -123px;
    }
</style>
