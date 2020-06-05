<template>
    <div class="emotion-common">
        <b-card v-if="data">
            <div slot="header">
                {{ title }}
                <div class="float-right">
                    {{ $t('m.report.createTime') }}:
                    {{ data.createTime ? getDateString(data.createTime) : '' }}
                </div>
            </div>
            <div class="content">
                <p class="red">{{ $t('m.report_all.notice') }}</p>
                <div class="filter-module">
                    <b-form-select v-model="vehicleId" class="width20" @change="changeOrderType(type)">
                        <option value="">{{ $t('m.report_all.whole_vehicle') }}</option>
                        <option v-for="(item, key) in vehicleList" :key="key" :value="key + 1">
                            {{ item.vehicleYear	 }}{{ item.vehicleMake	 }}{{ item.vehicleModel	 }}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="provinceId" class="width20" @change="changeOrderType(type)">
                        <option value="">{{ $t('m.report_all.whole_state') }}</option>
                        <option v-for="(item, key) in provinceList" :key="key" :value="key + 1">
                            {{ item.provinceName }}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="cityId" class="width20" @change="changeOrderType(type)">
                        <option value="">{{ $t('m.add_shop.please_select') }}</option>
                        <option v-for="(item, key) in provinceId ? (provinceList[provinceId - 1]['cityLevelResponseList']) : []" :key="key" :value="key + 1">
                            {{ item.cityName }}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="userTime" class="width20" @change="changeOrderType(type)">
                        <option v-for="(item, key) in timeList" :key="key" :value="item.val">
                            {{ item.name }}
                        </option>
                    </b-form-select>
                </div>
                <b-card class="margin20">
                    <div slot="header">
                        {{ $t('m.report.whole_emotion') }}
                    </div>
                    <div class="content">
                        <div class="whole-emotion text-center">
                            <div class="d-inline-block margin-right-20 green">
                                <i class="green-interval d-inline-block"></i>
                                <span>{{ $t('m.report_all.emotion_more') }}</span>
                            </div>
                            <div class="d-inline-block red">
                                <i class="red-interval d-inline-block"></i>
                                <span>{{ $t('m.report_all.emotion_less') }}</span>
                            </div>
                        </div>
                        <template v-if="data.manyStatisticsWholeEmotionData.greaterThanOrEqual0 || data.manyStatisticsWholeEmotionData.lessThan0">
                            <b-progress :max="1" :min="0" class="mb-3 margin20">
                                <b-progress-bar v-b-tooltip.hover data-html="true" :title="data.manyStatisticsWholeEmotionData ? number2Percent(data.manyStatisticsWholeEmotionData.greaterThanOrEqual0, data.manyStatisticsWholeEmotionData.greaterThanOrEqual0Num) : ''" variant="success" :value="data.manyStatisticsWholeEmotionData ? checkNull(data.manyStatisticsWholeEmotionData.greaterThanOrEqual0) : 0"></b-progress-bar>
                                <b-progress-bar v-b-tooltip.hover :title="data.manyStatisticsWholeEmotionData.lessThan0 ? number2Percent(data.manyStatisticsWholeEmotionData.lessThan0, data.manyStatisticsWholeEmotionData.lessThan0Num) : ''" variant="danger" :value="data.manyStatisticsWholeEmotionData.lessThan0 ? checkNull(data.manyStatisticsWholeEmotionData.lessThan0) : 0"></b-progress-bar>
                            </b-progress>
                        </template>
                        <template v-else>
                            <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover data-html="true" :title="$t('m.report_all.default_progress')">
                            </b-progress>
                        </template>
                    </div>
                </b-card>
                <div class="emotion-sort" v-if="type == 'syn'">
                    <b-row>
                        <b-col sm="6">
                            <b-card>
                                <div slot="header">
                                    {{ $t('m.report.emotion_more0_sort') }}
                                </div>
                                <div class="content">
                                    <div class="whole-emotion text-center">
                                        <div class="d-inline-block margin-right-20 green">
                                            <i class="green-interval d-inline-block"></i>
                                            <span>{{ $t('m.report_all.emotion_more') }}</span>
                                        </div>
                                        <div class="d-inline-block red">
                                            <i class="red-interval d-inline-block"></i>
                                            <span>{{ $t('m.report_all.emotion_less') }}</span>
                                        </div>
                                    </div>
                                    <div class="val-content">
                                        <b-row class="align-items-center" v-if="key < 3" v-for="(item, key) in reverseOrder" :key="key">
                                            <b-col sm="2">
                                                {{ $t(driveType2content()[item.driveType]) }}
                                            </b-col>
                                            <b-col sm="10">
                                                <template v-if="item.greaterThanOrEqual0 || item.lessThan0">
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20">
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.greaterThanOrEqual0, item.greaterThanOrEqual0Num)" variant="success" :value="item.greaterThanOrEqual0"></b-progress-bar>
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.lessThan0, item.lessThan0Num)" variant="danger" :value="item.lessThan0"></b-progress-bar>
                                                    </b-progress>
                                                </template>
                                                <template v-else>
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover :title="$t('m.report_all.default_progress')">
                                                    </b-progress>
                                                </template>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </b-card>
                        </b-col>
                        <b-col sm="6">
                            <b-card>
                                <div slot="header">
                                    {{ $t('m.report.emotion_more0_reverse_sort') }}
                                </div>
                                <div class="content">
                                    <div class="content">
                                        <div class="whole-emotion text-center">
                                            <div class="d-inline-block margin-right-20 green">
                                                <i class="green-interval d-inline-block"></i>
                                                <span>{{ $t('m.report_all.emotion_more') }}</span>
                                            </div>
                                            <div class="d-inline-block red">
                                                <i class="red-interval d-inline-block"></i>
                                                <span>{{ $t('m.report_all.emotion_less') }}</span>
                                            </div>
                                        </div>
                                        <div class="val-content">
                                            <b-row class="align-items-center" v-if="key < 3" v-for="(item, key) in ascOrder" :key="key">
                                                <b-col sm="2">
                                                    {{ $t(driveType2content()[item.driveType]) }}
                                                </b-col>
                                                <b-col sm="10">
                                                    <template v-if="item.greaterThanOrEqual0 || item.lessThan0">
                                                        <b-progress :max="1" :min="0" class="mb-3 margin20">
                                                            <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.greaterThanOrEqual0, item.greaterThanOrEqual0Num)" variant="success" :value="item.greaterThanOrEqual0"></b-progress-bar>
                                                            <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.lessThan0, item.lessThan0Num)" variant="danger" :value="item.lessThan0"></b-progress-bar>
                                                        </b-progress>
                                                    </template>
                                                    <template v-else>
                                                        <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover :title="$t('m.report_all.default_progress')">
                                                        </b-progress>
                                                    </template>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </div>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                </div>
                <b-row>
                    <b-col sm="6">
                        <b-card class="height-100">
                            <div slot="header">
                                {{ $t('m.cloud.gender') }}
                            </div>
                            <div class="content">
                                <div class="whole-emotion text-center">
                                    <div class="d-inline-block margin-right-20 green">
                                        <i class="green-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_more') }}</span>
                                    </div>
                                    <div class="d-inline-block red">
                                        <i class="red-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_less') }}</span>
                                    </div>
                                </div>
                                <div class="gender margin98">
                                    <div class="person">
                                        <b-row class="align-items-center">
                                            <b-col sm="2">
                                                {{ $t('m.common.boy') }}
                                            </b-col>
                                            <b-col sm="10">
                                                <template v-if="data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0Man || data.manyStatisticsGenderEmotionData.lessThan0Man">
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20">
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0Man, data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0ManNum)" variant="success" :value="data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0Man"></b-progress-bar>
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(data.manyStatisticsGenderEmotionData.lessThan0Man, data.manyStatisticsGenderEmotionData.lessThan0ManNum)" variant="danger" :value="data.manyStatisticsGenderEmotionData.lessThan0Man"></b-progress-bar>
                                                    </b-progress>
                                                </template>
                                                <template v-else>
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover :title="$t('m.report_all.default_progress')">
                                                    </b-progress>
                                                </template>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="person">
                                        <b-row class="align-items-center">
                                            <b-col sm="2" class="font-size12">
                                                {{ $t('m.common.girl') }}
                                            </b-col>
                                            <b-col sm="10">
                                                <template v-if="data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0Woman || data.manyStatisticsGenderEmotionData.lessThan0Woman">
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20" v-if="data.manyStatisticsGenderEmotionData">
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0Woman, data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0WomanNum)" variant="success" :value="data.manyStatisticsGenderEmotionData.greaterThanOrEqualTo0Woman"></b-progress-bar>
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(data.manyStatisticsGenderEmotionData.lessThan0Woman, data.manyStatisticsGenderEmotionData.lessThan0WomanNum)" variant="danger" :value="data.manyStatisticsGenderEmotionData.lessThan0Woman"></b-progress-bar>
                                                    </b-progress>
                                                </template>
                                                <template v-else>
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover :title="$t('m.report_all.default_progress')">
                                                    </b-progress>
                                                </template>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.report.age') }}
                            </div>
                            <div class="content">
                                <div class="whole-emotion text-center">
                                    <div class="d-inline-block margin-right-20 green">
                                        <i class="green-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_more') }}</span>
                                    </div>
                                    <div class="d-inline-block red">
                                        <i class="red-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_less') }}</span>
                                    </div>
                                </div>
                                <div class="age">
                                    <div class="person" v-for="(item, key) of ageList" :key="key">
                                        <b-row class="align-items-center">
                                            <b-col sm="2" class="padding-right0 font-size12">
                                                {{ item.title }}
                                            </b-col>
                                            <b-col sm="10">
                                                <template v-if="item.value1 || item.value2">
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20">
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.value1, item.numVal1)" variant="success" :value="item.value1"></b-progress-bar>
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.value2, item.numVal2)" variant="danger" :value="item.value2"></b-progress-bar>
                                                    </b-progress>
                                                </template>
                                                <template v-else>
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover :title="item.value1 && item.value2 ? '' : $t('m.report_all.default_progress')">
                                                    </b-progress>
                                                </template>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">
                        <b-card>
                            <div slot="header">
                                {{ $t('m.report.driveAge') }}
                            </div>
                            <div class="content">
                                <div class="whole-emotion text-center">
                                    <div class="d-inline-block margin-right-20 green">
                                        <i class="green-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_more') }}</span>
                                    </div>
                                    <div class="d-inline-block red">
                                        <i class="red-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_less') }}</span>
                                    </div>
                                </div>
                                <div class="drive-age">
                                    <div class="person" v-for="(item, key) of driveAge" :key="key">
                                        <b-row class="align-items-center">
                                            <b-col sm="2" class="padding-right0 font-size12">
                                                {{ item.title }}
                                            </b-col>
                                            <b-col sm="10">
                                                <template v-if="item.value1 || item.value2">
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20">
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.value1, item.numVal1)" variant="success" :value="item.value1"></b-progress-bar>
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.value2, item.numVal2)" variant="danger" :value="item.value2"></b-progress-bar>
                                                    </b-progress>
                                                </template>
                                                <template v-else>
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20" v-b-tooltip.hover :title="item.value1 && item.value2 ? '' : $t('m.report_all.default_progress')">
                                                    </b-progress>
                                                </template>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card class="height-100">
                            <div slot="header">
                                {{ $t('m.report_all.appoint_area') }}
                            </div>
                            <div class="content">
                                <div class="whole-emotion text-center">
                                    <div class="d-inline-block margin-right-20 green">
                                        <i class="green-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_more') }}</span>
                                    </div>
                                    <div class="d-inline-block red">
                                        <i class="red-interval d-inline-block"></i>
                                        <span>{{ $t('m.report_all.emotion_less') }}</span>
                                    </div>
                                </div>
                                <div class="drive-area">
                                    <div class="height-center">
                                        <div class="person" v-for="(item, key) of data.areaMap" :key="key">
                                            <b-row class="align-items-center">
                                                <b-col sm="2" class="padding-right0 font-size12">
                                                    {{ item.areaName }}
                                                </b-col>
                                                <b-col sm="10">
                                                    <b-progress :max="1" :min="0" class="mb-3 margin20">
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.greaterThanOrEqualTo0, item.greaterThanOrEqualTo0Num)" variant="success" :value="Number(item.greaterThanOrEqualTo0)"></b-progress-bar>
                                                        <b-progress-bar v-b-tooltip.hover :title="number2Percent(item.lessThan0, item.lessThan0Num)" variant="danger" :value="Number(item.lessThan0)"></b-progress-bar>
                                                    </b-progress>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-card>

                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<style lang="scss" scoped>
    .height-100 {
        height: 95%;
    }
    .padding-right0 {
        padding-right: 0;
    }
    .font-size12 {
        font-size: 12px;
    }
    .green-interval {
        width: 10px;
        height: 10px;
        background: #4dbd74;
        display: inline-block;
        margin-right: 10px;
    }
    .red-interval {
        width: 10px;
        height: 10px;
        background: #f86c6b;
        display: inline-block;
        margin-right: 10px;
    }
    .red {
        color: #f86c6b;
    }
    .green {
        color: #4dbd74;
    }
    .height-center {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
    }
    .drive-area {
        height: 300px;
        position: relative;
    }
    .width20 {
        width: 20%;
        margin-right: 10px;
    }
    .margin-right-20 {
        margin-right: 20px;
    }
    .margin20 {
        margin-top: 20px;
    }
    .margin98 {
        margin-top: 98px;
    }
</style>

<script>
    import httpClient from '@/utils/httpclient';
    import { getDateString } from '@/utils/date';
    import { checkNull, driveType2content } from '@/utils/db';
    export default {
        name: "emotionCommon",
        props: ['data', 'title', 'type', 'vehicle', 'province'],
        data() {
            return {
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
                ageList: [
                    {
                        title: this.$t('m.report_all.less20'),
                        key1: "greaterThanOrEqualTo020Under",
                        key2: "lessThan020Under",
                        num1: "greaterThanOrEqualTo020UnderNum",
                        num2: "lessThan020UnderNum"
                    },
                    {
                        title: this.$t('m.report_all.less2030'),
                        key1: "greaterThanOrEqualTo020To30",
                        key2: "lessThan020To30",
                        num1: "greaterThanOrEqualTo020To30Num",
                        num2: "lessThan020To30Num"
                    },
                    {
                        title: this.$t('m.report_all.less3040'),
                        key1: "greaterThanOrEqualTo030To40",
                        key2: "lessThan030To40",
                        num1: "greaterThanOrEqualTo030To40Num",
                        num2: "lessThan030To40Num"
                    },
                    {
                        title: this.$t('m.report_all.less4050'),
                        key1: "greaterThanOrEqualTo040To50",
                        key2: "lessThan040To50",
                        num1: "greaterThanOrEqualTo040To50Num",
                        num2: "lessThan040To50Num"
                    },
                    {
                        title: this.$t('m.report_all.less5060'),
                        key1: "greaterThanOrEqualTo050To60",
                        key2: "lessThan050To60",
                        num1: "greaterThanOrEqualTo050To60Num",
                        num2: "lessThan050To60Num"
                    },
                    {
                        title: this.$t('m.report_all.more60'),
                        key1: "greaterThanOrEqualTo060More",
                        key2: "lessThan060More",
                        num1: "greaterThanOrEqualTo060MoreNum",
                        num2: "lessThan060MoreNum"
                    }
                ],
                driveAge: [
                    {
                        title: this.$t('m.report_all.age_less2'),
                        key1: "greaterThanOrEqualTo2Under",
                        key2: "lessThan02Under",
                        num1: "greaterThanOrEqualTo2UnderNum",
                        num2: "lessThan02UnderNum"
                    },
                    {
                        title: this.$t('m.report_all.age_less24'),
                        key1: "greaterThanOrEqualTo2To4",
                        key2: "lessThan02To4",
                        num1: "greaterThanOrEqualTo2To4Num",
                        num2: "lessThan02To4Num"
                    },
                    {
                        title: this.$t('m.report_all.age_less46'),
                        key1: "greaterThanOrEqualTo4To6",
                        key2: "lessThan04To6",
                        num1: "greaterThanOrEqualTo4To6Num",
                        num2: "lessThan04To6Num"
                    },
                    {
                        title: this.$t('m.report_all.age_less68'),
                        key1: "greaterThanOrEqualTo6To8",
                        key2: "lessThan06To8",
                        num1: "greaterThanOrEqualTo6To8Num",
                        num2: "lessThan06To8Num"
                    },
                    {
                        title: this.$t('m.report_all.age_less810'),
                        key1: "greaterThanOrEqualTo8To10",
                        key2: "lessThan08To10",
                        num1: "greaterThanOrEqualTo8To10Num",
                        num2: "lessThan08To10Num"
                    },
                    {
                        title: this.$t('m.report_all.age_more10'),
                        key1: "greaterThanOrEqualTo10More",
                        key2: "lessThan010More",
                        num1: "greaterThanOrEqualTo10MoreNum",
                        num2: "lessThan010MoreNum"
                    }
                ],
                vehicleList: [],
                provinceList: [],
                vehicleId: '',
                provinceId: '',
                cityId: '',
                ascOrder: [],
                reverseOrder: []
            }
        },
        watch: {
            data: function (newV) {
                this.ascOrder = newV.ascOrder ? newV.ascOrder : [];
                this.reverseOrder = newV.ascOrder ? JSON.parse(JSON.stringify(newV.ascOrder)).reverse().slice(0, 3) : [];
                this.initAgeList(newV);
            },
            vehicle: function (newV) {
                this.vehicleList = newV
            },
            province: function (newV) {
                this.provinceList = newV
            }
        },
        methods: {
            checkNull,
            getDateString,
            driveType2content,
            number2Percent(data, num) {
                let html = `${(Number(data) * 100).toFixed(1)} % (${num ? num : 0}${this.$t('m.common.people_num')})`;
                return data ? html : '0%'
            },
            initAgeList(data) {
                this.ageList.map((item) => {
                    item['value1'] = data['manyStatisticsAgeEmotionData'][item.key1];
                    item['value2'] = data['manyStatisticsAgeEmotionData'][item.key2];
                    item['numVal1'] = data['manyStatisticsAgeEmotionData'][item.num1];
                    item['numVal2'] = data['manyStatisticsAgeEmotionData'][item.num2];
                });
                this.driveAge.map((item) => {
                    item['value1'] = data['manyStatisticsDrivingAgeEmotionData'][item.key1];
                    item['value2'] = data['manyStatisticsDrivingAgeEmotionData'][item.key2];
                    item['numVal1'] = data['manyStatisticsDrivingAgeEmotionData'][item.num1];
                    item['numVal2'] = data['manyStatisticsDrivingAgeEmotionData'][item.num2];
                });
            },
            changeOrderType(type) {
                this.$emit('filterData', {
                    emotionType: type == 'syn' ? '' : type,
                    vehicleYear: this.vehicleId ? this.vehicleList[this.vehicleId - 1]['vehicleYear'] : '',
                    vehicleMake: this.vehicleId ? this.vehicleList[this.vehicleId - 1]['vehicleMake'] : '',
                    vehicleModel: this.vehicleId ? this.vehicleList[this.vehicleId - 1]['vehicleModel'] : '',
                    parkingStateCode: this.provinceId ? this.provinceList[this.provinceId - 1]['provinceId'] : '',
                    parkingCityCode: this.cityId && this.provinceId ? this.provinceList[this.provinceId - 1]['cityLevelResponseList'][this.cityId - 1]['cityId'] : '',
                    timeRange: this.userTime
                })
            }
        }
    }
</script>
