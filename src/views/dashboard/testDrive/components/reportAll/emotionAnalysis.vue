<template>
    <div class="emotion-analysis">
        <emotionCommon :data="synthesisEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="'syn'" :title="$t('m.report.spaceTitle')"></emotionCommon>
        <emotionCommon :data="decelerationEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="10" :title="$t('m.report_all.static_analysis')"></emotionCommon>
        <emotionCommon :data="lowSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="3" :title="$t('m.report.cut30') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="mediumSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="9" :title="$t('m.report.milege30') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="highSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="2" :title="$t('m.report.more60') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="uniformSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="11" :title="$t('m.report.content_speed') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="acceleratingSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="12" :title="$t('m.report.acceleration') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="brakingSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="13" :title="$t('m.report.brake') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="straightSpeedEmotion" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :type="14" :title="$t('m.report.straight') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="turnEmotion" :type="15" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :title="$t('m.report.turnCard') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="stableEmotion" :type="16" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :title="$t('m.report.normal_speed') + $t('m.report_all.analysis')"></emotionCommon>
        <emotionCommon :data="bumpyEmotion" :type="8" :vehicle="vehicleList" :province="provinceList" @filterData="filterData" :title="$t('m.report.pong') + $t('m.report_all.analysis')"></emotionCommon>
    </div>
</template>
<!-- syn  综合-->
<!--2-高速行驶时长 >60-->
<!--3-低速行驶时长 <30-->
<!--8-颠簸次数-->
<!--9-中速行驶时长-->
<!--10-怠速-->
<!--11-匀速时长-->
<!--12-加速次数-->
<!--13-减速次数-->
<!--14-直行时长-->
<!--15-转向次数-->
<!--16-平稳行驶时长-->

<script>
    import httpClient from '@/utils/httpclient';
    import emotionCommon from './emotionCommon';
    export default {
        name: "emotionAnalysis",
        components: {
            emotionCommon
        },
        data() {
            return {
                acceleratingSpeedEmotion: null,
                brakingSpeedEmotion: null,
                bumpyEmotion: null,
                decelerationEmotion: null,
                highSpeedEmotion: null,
                lowSpeedEmotion: null,
                mediumSpeedEmotion: null,
                stableEmotion: null,
                straightSpeedEmotion: null,
                synthesisEmotion: null,
                turnEmotion: null,
                uniformSpeedEmotion: null,
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
            initData() {
                httpClient.post('/api/v1/clouddrive/manyreport/emotiondetail', {
                    timeRange: 30
                }).then(response => {
                    if (response.data.code == 200) {
                        console.log(response.data.data);
                        this.synthesisEmotion = response.data.data.synthesisEmotion;
                        this.acceleratingSpeedEmotion = response.data.data.acceleratingSpeedEmotion;
                        this.brakingSpeedEmotion = response.data.data.brakingSpeedEmotion;
                        this.bumpyEmotion = response.data.data.bumpyEmotion;
                        this.decelerationEmotion = response.data.data.decelerationEmotion;
                        this.highSpeedEmotion = response.data.data.highSpeedEmotion;
                        this.lowSpeedEmotion = response.data.data.lowSpeedEmotion;
                        this.mediumSpeedEmotion = response.data.data.mediumSpeedEmotion;
                        this.stableEmotion = response.data.data.stableEmotion;
                        this.straightSpeedEmotion = response.data.data.straightSpeedEmotion;
                        this.turnEmotion = response.data.data.turnEmotion;
                        this.uniformSpeedEmotion = response.data.data.uniformSpeedEmotion;
                    }
                });
            },
            filterData(data) {
                httpClient.post('/api/v1/clouddrive/manyreport/emotiontype', data).then(response => {
                    if (response.data.code == 200) {
                        if (data.emotionType) {
                            switch (data.emotionType) {
                                case 10:
                                    this.decelerationEmotion = response.data.data;
                                    break;
                                case 3:
                                    this.lowSpeedEmotion = response.data.data;
                                    break;
                                case 9:
                                    this.mediumSpeedEmotion = response.data.data;
                                    break;
                                case 2:
                                    this.highSpeedEmotion = response.data.data;
                                    break;
                                case 11:
                                    this.uniformSpeedEmotion = response.data.data;
                                    break;
                                case 12:
                                    this.acceleratingSpeedEmotion = response.data.data;
                                    break;
                                case 13:
                                    this.brakingSpeedEmotion = response.data.data;
                                    break;
                                case 14:
                                    this.straightSpeedEmotion = response.data.data;
                                    break;
                                case 15:
                                    this.turnEmotion = response.data.data;
                                    break;
                                case 16:
                                    this.stableEmotion = response.data.data;
                                    break;
                                case 8:
                                    this.bumpyEmotion = response.data.data;
                                    break;
                            }
                        } else {
                            this.synthesisEmotion = response.data.data;
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
