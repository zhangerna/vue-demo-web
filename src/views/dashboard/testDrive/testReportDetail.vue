<template>
    <div>
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.report.title") }}
                <div class="float-right">{{ $t("m.report.createTime") }}:{{ driveInfo.reportFinishTime ? getDateString4(driveInfo.reportFinishTime) : "" }}</div>
            </div>
            <div class="content">
                <!--                客户信息-->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.user_title") }}
                        <div class="float-right">
                            {{ $t("m.report.userId") }}:
                            {{ userDetail.userServiceNum }}
                        </div>
                    </div>
                    <div class="content">
                        <b-row style="position: relative">
                            <b-col sm="4" style="overflow: hidden">
                                <img id="img-user" :src="userDetail.rotateFaceRecognitionUrl ? userDetail.rotateFaceRecognitionUrl : userDetail.faceRecognitionUrl" width="100%" style="max-width: 250px" />
                            </b-col>
                            <b-col sm="4">
                                <p>{{ $t("m.admin.name") }}:{{ userDetail.idCardUserName }}</p>
                                <p>{{ $t("m.add_shop.manager_phone") }}:{{ userDetail.userPhone }}</p>
                                <p>{{ $t("m.cloud.birth_day") }}:{{ userDetail.idCardBirthDate ? filterCardTime(userDetail.idCardBirthDate) : "" }}</p>
                                <p>{{ $t("m.report.age") }}:{{ userDetail.userAge ? userDetail.userAge : "" }}</p>
                                <p>{{ $t("m.report.id_card_valid") }}:{{ userDetail.idCardExpireDate ? filterCardTime(userDetail.idCardExpireDate.split("-")[0]) : "" }}-{{ userDetail.idCardExpireDate ? filterCardTime(userDetail.idCardExpireDate.split("-")[1]) : "" }}</p>
                                <p>
                                    {{ $t("m.report.quasi_drive_type") }}:
                                    {{ userDetail.driveLicenseQuasiDrivingModel }}
                                </p>
                                <p>
                                    {{ $t("m.report.appoint_address") }}:
                                    {{ userDetail.userConfirmAddress }}
                                </p>
                                <p>{{ $t("m.report.driveAge") }}: {{ userDetail.driveAgeYear }}{{ $t("m.report.year") }}{{ userDetail.driveAgeMonth }}{{ $t("m.report.month") }}</p>
                            </b-col>
                            <b-col sm="4">
                                <p>{{ $t("m.cloud.gender") }}:{{ userDetail.driveLicenseGender ? (userDetail.driveLicenseGender == 1 ? $t("m.common.boy") : $t("m.common.girl")) : "" }}</p>
                                <p>{{ $t("m.report.national") }}:{{ userDetail.idCardEthnicGroup }}</p>
                                <p>{{ $t("m.report.id_card_num") }}:{{ userDetail.idCardNumber }}</p>
                                <p>{{ $t("m.report.regist_address") }}:{{ userDetail.idCardAddress }}</p>
                                <p>
                                    {{ $t("m.report.drive_date") }}:
                                    {{ userDetail.driveLicenseInitDate ? filterCardTime(userDetail.driveLicenseInitDate) : "" }}
                                </p>
                                <p>
                                    {{ $t("m.report.drive_valid") }}:{{ userDetail.driveLicenseInitDate ? filterCardTime(userDetail.driveLicenseInitDate) : "" }}
                                    -
                                    {{ userDetail.driveLicenseExpireDate ? filterCardTime(userDetail.driveLicenseExpireDate) : "" }}
                                </p>
                                <p>
                                    {{ $t("m.cloud.order_create_time") }}:
                                    {{ userDetail.orderCreateTime ? getDateStringEnglish(userDetail.orderCreateTime) : "" }}
                                </p>
                                <p>{{ $t("m.report.phone_type") }}:{{ userDetail.userAgent }}</p>
                            </b-col>
                        </b-row>
                    </div>
                </b-card>
                <!--                试驾信息-->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.drive_title") }}
                        <div class="float-right">
                            {{ $t("m.report.orderNo") }}:
                            {{ userDetail.orderServiceNum }}
                        </div>
                    </div>
                    <div class="content">
                        <b-row>
                            <b-col sm="4">
                                <polygon-map :map="area"> </polygon-map>
                            </b-col>
                            <b-col sm="4">
                                <p>{{ $t("m.common.test_drive") }}: {{ userDetail.year }}{{ userDetail.make }}{{ userDetail.model }}</p>
                                <p>
                                    {{ $t("m.report.vehicle_config") }}:
                                    {{ userDetail.vehicleTrim }}
                                </p>
                                <p>
                                    {{ $t("m.lots.lot2") }}:
                                    {{ userDetail.parkingName }}
                                </p>
                                <p>
                                    {{ $t("m.cloud.vehicle_store_name") }}:
                                    {{ userDetail.storeName }}
                                </p>
                                <p>
                                    {{ $t("m.report.test_time") }}:
                                    {{ userDetail.orderTakeTime ? timeInspect(userDetail.orderTakeTime, userDetail.orderReturnTime) : "" }}
                                </p>
                                <p>{{ $t("m.report.test_drive_mileage") }}: {{ driveInfo.totalTrip ? driveInfo.totalTrip : "0" }}{{ $t("m.report.km") }}</p>
                                <p>{{ $t("m.report.test_drive_avg_speed") }}: {{ driveInfo.averageSpeed ? driveInfo.averageSpeed.toFixed(2) : "0" }}{{ $t("m.report.speed_unit") }}</p>
                                <p>{{ $t("m.report.totalOil") }}: {{ driveInfo.totalOilConsumption ? driveInfo.totalOilConsumption.toFixed(2) : "0" }}{{ $t("m.report.ltre") }}</p>
                                <p>
                                    {{ $t("m.report.isPong") }}:
                                    {{ driveInfo.collisionStatus == 0 ? $t("m.report.col0") : $t("m.report.col1") }}
                                </p>
                            </b-col>
                            <b-col sm="4">
                                <p>
                                    {{ $t("m.cloud.plat_number") }}:
                                    {{ userDetail.plat }}
                                </p>
                                <p>
                                    {{ $t("m.cloud.vehicle_c") }}:
                                    {{ userDetail.color }}
                                </p>
                                <p>
                                    {{ $t("m.report.appoint_time") }}:
                                    {{ userDetail.appointmentStartTime ? getDateString2(userDetail.appointmentStartTime) : 0 }}
                                </p>
                                <p>{{ $t("m.report.test_drive_duration") }}: {{ userDetail.driveTime ? (userDetail.driveTime / 1000 / 60).toFixed(0) : "0" }}{{ $t("m.report.min") }}</p>
                                <p>{{ $t("m.report.maxSpeed") }}: {{ driveInfo.maxSpeed ? driveInfo.maxSpeed.toFixed(0) : 0 }}{{ $t("m.report.speed_unit") }}</p>
                                <p>{{ $t("m.report.acceSpeed") }}: {{ driveInfo.maxAcceleration ? driveInfo.maxAcceleration.toFixed(0) : 0 }}{{ $t("m.report.acc_unit") }}</p>
                                <p>{{ $t("m.report.aOil") }}: {{ driveInfo.averageOilConsumption ? driveInfo.averageOilConsumption.toFixed(2) : 0 }}{{ $t("m.report.oilMile") }}</p>
                                <p>{{ $t("m.report.test_drive_times") }}: {{ userDetail.driveTimes ? userDetail.driveTimes : 0 }}{{ $t("m.report.times") }}</p>
                                <!-- <p>{{ $t('m.cloud.drive_rate') }}:
                                    <template v-if="stars">
                                        <i v-for="k in Number(stars)" :key="k" class="fa fa-star"></i>
                                    </template>
                                    <template v-else>
                                        {{ $t('m.cloud.user_no_rate') }}
                                    </template>
                                </p> -->
                            </b-col>
                        </b-row>
                    </div>
                </b-card>
                <!--                试驾情绪综合分析-->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.spaceTitle") }}
                    </div>
                    <div class="content whole-emotion">
                        <b-row>
                            <b-col sm="6">
                                <b-card style="height: 84%">
                                    <div slot="header" style="font-weight:bolder">
                                        {{ $t("m.report.whole_emotion") }}
                                    </div>
                                    <div class="content">
                                        <div id="emotion"></div>
                                    </div>
                                </b-card>
                            </b-col>
                            <b-col sm="6">
                                <!--                                高兴情绪-->
                                <table class="table table-responsive-sm table-bordered">
                                    <thead style="background: #f0f3f5">
                                        <tr>
                                            <th>
                                                {{ $t("m.report.project_sort") }}
                                            </th>
                                            <th>
                                                {{ $t("m.cloud.emotion_net_worth") }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, key) in emotionNetData" :key="key" v-if="key < 3" :class="key < 3 ? 'green-deep' : ''">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.value }}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!--                                不高兴情绪   -->
                                <table class="table table-responsive-sm table-bordered">
                                    <thead style="background: #f0f3f5">
                                        <tr>
                                            <th>
                                                {{ $t("m.report.no_sure_project_sort") }}
                                            </th>
                                            <th>
                                                {{ $t("m.cloud.emotion_net_worth") }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, key) in reverseEmotionData" :key="key" :class="key < 3 ? ' red-deep' : ''">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.value }}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="content"></div>
                </b-card>
                <!--                用户行为统计-->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.user_behavior") }}
                    </div>
                    <div class="content">
                        <table class="table table-responsive-sm table-bordered text-center">
                            <thead>
                                <tr style="background: #f0f3f5">
                                    <th>{{ $t("m.report.laDoor") }}</th>
                                    <th>{{ $t("m.report.raDoor") }}</th>
                                    <th>{{ $t("m.report.lbDoor") }}</th>
                                    <th>{{ $t("m.report.rbDoor") }}</th>
                                    <th>{{ $t("m.report.trunk") }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ userBehavior.lfDoor }}{{ $t("m.report.times") }}</td>
                                    <td>{{ userBehavior.rfDoor }}{{ $t("m.report.times") }}</td>
                                    <td>{{ userBehavior.raDoor }}{{ $t("m.report.times") }}</td>
                                    <td>{{ userBehavior.laDoor }}{{ $t("m.report.times") }}</td>
                                    <td>{{ userBehavior.trunk }}{{ $t("m.report.times") }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-card>
                <!--            速度分析       -->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.powerTitle") }}
                    </div>
                    <div class="content">
                        <div class="label-group row text-center" style="width: 60%;margin: 0 auto">
                            <div class="col-sm-3 blue"><i class="icon-style blue-icon"></i>{{ $t("m.report.route_speed") }}</div>
                            <div class="col-sm-3 green"><i class="icon-style green-icon"></i>{{ $t("m.report.emotion20") }}</div>
                            <div class="col-sm-3 red"><i class="icon-style red-icon"></i>{{ $t("m.report.emotion30") }}</div>
                            <div class="col-sm-3 yellow"><i class="icon-style yellow-icon"></i>{{ $t("m.report.emotion10") }}</div>
                        </div>
                        <div id="speed"></div>
                        <div class="margin20">
                            <!--                            速度表格-->
                            <tableCard v-if="speedTable" type="speed" :data="speedTable"></tableCard>
                        </div>
                    </div>
                </b-card>
                <!--                加速度-->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.acceTitle") }}
                    </div>
                    <div class="content">
                        <div class="label-group row text-center" style="width: 60%;margin: 0 auto">
                            <div class="col-sm-3 blue"><i class="icon-style blue-icon"></i>{{ $t("m.report.accele") }}</div>
                            <div class="col-sm-3 green"><i class="icon-style green-icon"></i>{{ $t("m.report.emotion20") }}</div>
                            <div class="col-sm-3 red"><i class="icon-style red-icon"></i>{{ $t("m.report.emotion30") }}</div>
                            <div class="col-sm-3 yellow"><i class="icon-style yellow-icon"></i>{{ $t("m.report.emotion10") }}</div>
                        </div>
                        <div id="acceleration"></div>
                        <div class="margin20">
                            <!--                            加速度表格-->
                            <tableCard v-if="accTable" type="acc" :data="accTable"></tableCard>
                        </div>
                    </div>
                </b-card>
                <!--                转弯曲线-->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.turnTitle") }}
                    </div>
                    <div class="content">
                        <div class="label-group row text-center" style="width: 60%;margin: 0 auto">
                            <div class="col-sm-3 blue"><i class="icon-style blue-icon"></i>{{ $t("m.report.turn") }}</div>
                            <div class="col-sm-3 green"><i class="icon-style green-icon"></i>{{ $t("m.report.emotion20") }}</div>
                            <div class="col-sm-3 red"><i class="icon-style red-icon"></i>{{ $t("m.report.emotion30") }}</div>
                            <div class="col-sm-3 yellow"><i class="icon-style yellow-icon"></i>{{ $t("m.report.emotion10") }}</div>
                        </div>
                        <div id="turn"></div>
                        <div class="margin20">
                            <!--                            转弯表格-->
                            <tableCard v-if="turnTable" type="turn" :data="turnTable"></tableCard>
                        </div>
                    </div>
                </b-card>
                <!--        颠簸点 -->
                <b-card>
                    <div slot="header">
                        {{ $t("m.report.pongTitle") }}
                    </div>
                    <div class="content">
                        <div class="label-group row text-center" style="width: 60%;margin: 0 auto">
                            <div class="col-sm-3" style="color: red"><i style="background: red;height: 10px;width: 10px;display: inline-block;margin-right: 10px;"></i>{{ $t("m.report.pongPoint") }}</div>
                            <div class="col-sm-3 green"><i class="icon-style green-icon"></i>{{ $t("m.report.emotion20") }}</div>
                            <div class="col-sm-3 red"><i class="icon-style red-icon"></i>{{ $t("m.report.emotion30") }}</div>
                            <div class="col-sm-3 yellow"><i class="icon-style yellow-icon"></i>{{ $t("m.report.emotion10") }}</div>
                        </div>
                        <div id="pong"></div>
                        <div class="margin20">
                            <!--                            颠簸表格-->
                            <tableCard v-if="pongTable" type="pong" :data="pongTable"></tableCard>
                        </div>
                    </div>
                </b-card>
                <!-- 单人试驾报告 -->
                <b-card>
                    <div slot="header">{{ $t("m.report.surveyTitle") }}</div>
                    <div class="content surveyReport" v-if="surveyReport">
                        <div v-for="item in surveyReport" :key="item.subjectId">
                            <div class="col-sm-6 float-left report-style">
                                <b-row>
                                    <b-col sm="6" md="6" lg="6">
                                        <span class="float-left">{{ item.subjectId }}.{{ reportArray[item.subjectId] }}</span>
                                    </b-col>
                                    <b-col sm="6" md="6" lg="6">
                                        <b-badge class="float-left badge-style success-color" v-if="item.questionnaireContent === $t('m.report.very_satisfied')">{{ item.questionnaireContent }}</b-badge>
                                        <b-badge class="float-left badge-style primary-color" v-else-if="item.questionnaireContent === $t('m.report.satisfied')">{{ item.questionnaireContent }}</b-badge>
                                        <b-badge class="float-left badge-style warning-color" v-else-if="item.questionnaireContent === $t('m.report.common')">{{ item.questionnaireContent }}</b-badge>
                                        <b-badge class="float-left badge-style danger-color" v-else-if="item.questionnaireContent === $t('m.report.dissatisfied')">{{ item.questionnaireContent }}</b-badge>
                                        <b-badge class="float-left badge-style sec-color" v-else-if="item.questionnaireContent === $t('m.report.no_evaluation')">{{ item.questionnaireContent }}</b-badge>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="col-sm-6 float-left report-style">
                            <b-row>
                                <b-col sm="6" md="6" lg="6">
                                    <span class="float-left">{{ starId }}.{{ reportArray[ starId ] }}</span>
                                </b-col>
                                <b-col sm="6" md="6" lg="6">
                                    <div class="float-left">
                                        <i class="fa fa-star star-size" v-for="item in starNum" :key="item"></i>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                        <div class="col-sm-6 float-left dis-relative report-style">
                            <b-row>
                                <b-col sm="6" md="6" lg="6">
                                    <div class="float-left">{{ surveyMsgId }}.{{ reportArray[surveyMsgId] }}</div>
                                </b-col>
                                <b-col sm="6" md="6" lg="6">
                                    <div class="float-left advise-style" style="height: 300%">
                                        {{ surveyMsg ? surveyMsg : "" }}
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                    <div class="content surveyReport" v-else>
                        <div class="text-center no-feedback">
                            {{ $t("m.report.no_feedback") }}
                        </div>
                    </div>
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<style lang="scss" scoped>
#acceleration,
#emotion,
#speed,
#turn,
#pong {
    height: 400px;
}
.whole-emotion {
    .card-body {
        padding: 0;
        .breadcrumb {
            padding: 7px 10px;
            margin-bottom: 0;
        }
    }
}
.hot-link {
    color: rgb(99, 194, 222);
    cursor: pointer;
}
.blue {
    color: #3b5998;
}
.green {
    color: #a2dab6;
}
.green-deep {
    color: #4dbd74;
}
.red-deep {
    color: #f86c6b;
}
.yellow,
.fa-star {
    color: #fbdc7f;
}
.margin20 {
    margin-top: 20px;
}
.red {
    color: #f8b2b1;
}
.space-holder {
    margin-left: 10px;
}
.icon-style {
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right: 6px;
}
.blue-icon {
    background: #3b5998;
}
.green-icon {
    background: #a2dab6;
}
.yellow-icon {
    background: #fbdc7f;
}
.red-icon {
    background: #f8b2b1;
}
.no-feedback {
    color: rgba(174, 182, 177, 0.767);
    font-size: 0.875rem;
}
.badge-style {
    width: 100px;
    font-size: 0.75rem;
    padding: 5px 20px;
}
.max-width {
    max-width: 154px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.dis-relative {
    display: relative;
}
.advise-alert {
    width: 260px;
    // height: 100px;
    color: #ffffff;
    position: absolute;
    background-color: rgba(17, 16, 16, 0.7);
    right: 3%;
    bottom: 101%;
    border-radius: 2px;
    padding: 13px 10px;
}
.star-size {
    font-size: 22px;
    padding: 0px 3px;
    color: #ffc107;
}
.surveyReport {
    .col-sm-6 {
        padding-left: 0;
    }
}
.report-style {
    padding: 8px 20px;
}
.success-color {
    background-color: #4dbd74;
    color: #ffffff;
}
.primary-color {
    background-color: #63c2de;
    color: #ffffff;
}
.warning-color {
    background-color: #ffc107;
    color: #ffffff;
}
.danger-color {
    background-color: #f86c6b;
    color: #ffffff;
}
.sec-color {
    background-color: #c8ced3;
}
</style>

<script>
import echarts from "echarts";
import httpClient from "@/utils/httpclient";
import polygonMap from "@/components/tripMap";
import tableCard from "./components/reportDetail/index.vue";
import { emotion, speed, accele, turns, pong, initEmotion, insertTable } from "./components/reportDetail/index";
import { timeInspect, getDateString2, filterCardTime, getDateString3, getDateString4, getDateStringEnglish } from "@/utils/date";
export default {
    name: "testReport",
    inject: ["reload"],
    components: {
        polygonMap,
        tableCard
    },
    data() {
        return {
            emotion,
            speed,
            accele,
            turns,
            pong,
            speedTable: null,
            accTable: null,
            turnTable: null,
            pongTable: null,
            userDetail: {},
            driveInfo: {},
            area: null,
            satisify: [
                {
                    name: this.$t("m.report.milege30"),
                    id: 9
                },
                {
                    name: this.$t("m.report.static"),
                    id: 10
                },
                {
                    name: this.$t("m.report.more60"),
                    id: 2
                },
                {
                    name: this.$t("m.report.straight"),
                    id: 14
                },
                {
                    name: this.$t("m.report.acceleration"),
                    id: 12
                },
                {
                    name: this.$t("m.report.content_speed"),
                    id: 11
                },
                {
                    name: this.$t("m.report.normal_speed"),
                    id: 16
                },
                {
                    name: this.$t("m.report.turnCard"),
                    id: 15
                },
                {
                    name: this.$t("m.report.pongPoint"),
                    id: 8
                },
                {
                    name: this.$t("m.report.brake"),
                    id: 13
                },
                {
                    name: this.$t("m.report.cut30"),
                    id: 3
                }
            ],
            emotionNetData: [],
            reverseEmotionData: {},
            userBehavior: {},
            // stars: 0
            reportArray: ["", this.$t("m.report.outline_size"), this.$t("m.report.modeling_aesthetics"), this.$t("m.report.ride_comfort"), this.$t("m.report.comfortable_seat"), this.$t("m.report.sound_effects"), this.$t("m.report.air_conditioning"), this.$t("m.report.sound_effect"), this.$t("m.report.feeling_wheel"), this.$t("m.report.brake_force"), this.$t("m.report.steering_flexibility"), this.$t("m.report.view"), this.$t("m.report.starting_acceleration"), this.$t("m.report.halfway_acceleration"), this.$t("m.report.dynamic_stability"), this.$t("m.report.stability_denaturation"), this.$t("m.report.automotive_interior"), this.$t("m.report.technological_level"), this.$t("m.report.interior_color"), this.$t("m.report.internal_space"), this.$t("m.report.operation_key"), this.$t("m.report.overall_satisfaction"), this.$t("m.report.suggestions_evaluation")],
            surveyReport: false,
            surveyMsg: "",
            showAdviseAlert: false,
            questionnaireContent: "",
            starId: 0,
            starNum: 0,
            surveyMsgId: 0
        };
    },
    mounted() {
        // coordinatetype 1,WGS84全球坐标系  2,GCJ02火星坐标系  3,BD09百度坐标系
        httpClient.get("/api/v1/clouddrive/report/detail?coordinatetype=1&orderid=" + this.$route.params.id).then(response => {
            if (response.data.code == 200) {
                const { data } = response.data;
                // this.stars = response.data.data.surveyFeedbackDTO ? response.data.data.surveyFeedbackDTO[0].questionnaireContent :'';
                this.userDetail = data.userDetailDTO ? data.userDetailDTO : {};
                this.driveInfo = data.cloudDriveReportDTO.clouddriveTripDataDTO;
                this.area = {
                    area: data.cloudDriveReportDTO.tracesDataDTOList,
                    center: data.cloudDriveReportDTO.tracesDataDTOList[0]
                };
                this.userBehavior = data.cloudDriveReportDTO.alarmPushDTOList;
                this.getEmotion(data.cloudDriveReportDTO.wholeEmotionDTO);
                this.getSpeed(data.cloudDriveReportDTO.emotionList, data.cloudDriveReportDTO.speedList, data.cloudDriveReportDTO.clouddriveTripDataDTO.maxSpeed);
                this.getAcceleration(data.cloudDriveReportDTO.emotionList, data.cloudDriveReportDTO.accelerationDataList, data.cloudDriveReportDTO.clouddriveTripDataDTO.maxAcceleration);
                this.getTurn(data.cloudDriveReportDTO.emotionList, data.cloudDriveReportDTO.turnDataDTOS);
                //碰撞点为0， 则不现实整个模块
                this.getPong(data.cloudDriveReportDTO.emotionList, data.cloudDriveReportDTO.accelerationDataList, data.cloudDriveReportDTO ? data.cloudDriveReportDTO.bumpyEventsNew : []);
                data.cloudDriveReportDTO.clouddriveEmotionStatisticsDataDTO ? this.initTable(data.cloudDriveReportDTO.clouddriveEmotionStatisticsDataDTO) : null;
                // 单人试驾报告
                if (data.surveyFeedbackDTO) {
                    this.surveyReport = data.surveyFeedbackDTO.slice(0, 20);
                    this.starId = data.surveyFeedbackDTO.slice(20, 21)[0].subjectId;
                    this.starNum = Number(data.surveyFeedbackDTO.slice(20, 21)[0].questionnaireContent);
                    if (data.surveyFeedbackDTO[21]) {
                        this.surveyMsg = data.surveyFeedbackDTO.slice(21)[0].questionnaireContent;
                        this.surveyMsgId = data.surveyFeedbackDTO.slice(21)[0].subjectId;
                    }
                }
            }
        });
    },
    methods: {
        initBaseData(driveData) {
            let driveDatas = [];
            driveData.map(item => {
                driveDatas.push(getDateString3(item.driveTime));
            });
            return {
                driveDatas
            };
        },
        initTable(data) {
            let temp = {};
            let sortData = [];
            data.map(item => {
                this.satisify.map(it => {
                    if (it.id == item.driveType) {
                        sortData.push({
                            id: it.id,
                            name: it.name,
                            value: (item.emotionNetWorth * 100).toFixed(1)
                        });
                    }
                });
                temp[item.driveType] = {
                    durationTime: item.durationTime,
                    durationTimeStatictics: (item.durationTimeStatictics * 100).toFixed(1),
                    neutralEmotionStatistics: (item.neutralEmotionStatistics * 100).toFixed(1),
                    positiveEmotionStatistics: (item.positiveEmotionStatistics * 100).toFixed(1),
                    negativeEmotionStatistics: (item.negativeEmotionStatistics * 100).toFixed(1),
                    emotionNetWorth: (item.emotionNetWorth * 100).toFixed(1)
                };
            });
            this.speedTable = insertTable("speed", [10, 3, 9, 2], temp);
            this.accTable = insertTable("acc", [11, 12, 13, 0], temp);
            this.turnTable = insertTable("turn", [14, 15, 0, 0], temp);
            this.pongTable = insertTable("pong", [16, 8, 0, 0], temp);
            let emotionArray = sortData.sort((f, l) => {
                return l.value - f.value;
            });
            this.emotionNetData = JSON.parse(JSON.stringify(emotionArray));
            this.reverseEmotionData = emotionArray.reverse().slice(0, 3);
        },
        getPong(data, driveData, eventData) {
            let eventList = [];
            eventData.map(item => {
                eventList.push({
                    xAxis: getDateString3(item.driveTime),
                    tooltip: {
                        trigger: "item",
                        formatter: data => {
                            return data.data.xAxis + `<br />${this.$t("m.report.pongPoint")}`;
                        }
                    },
                    yAxis: 20
                });
            });
            let { emotionList, area, line } = initEmotion(data);
            this.pong.series.markArea.data = area;
            let { driveDatas } = this.initBaseData(driveData);
            this.pong.xAxis.data = driveDatas;
            this.pong.series.data = emotionList;
            this.pong.series.markLine.data = line;
            this.pong.series.markPoint.data = eventList;
            echarts.init(document.getElementById("pong")).setOption(this.pong);
        },
        getTurn(data, accData) {
            let accList = [];
            let yList = [];
            let { area, line } = this.defaultEmotion(data);
            accData.map(item => {
                accList.push(getDateString3(item.driveTime));
                yList.push(item.turn);
            });
            this.turns.series.markArea.data = area;
            this.turns.series.markLine.data = line;
            this.turns.xAxis.data = accList;
            this.turns.series.data = yList;
            echarts.init(document.getElementById("turn")).setOption(this.turns);
        },
        defaultEmotion(data, max) {
            let emotionList = [];
            let area = [];
            let line = [];
            data.map(item => {
                emotionList.push(item.emotion);
                if (item.emotion == 10 || item.emotion == 0) {
                    line.push([
                        {
                            xAxis: item.emotionStartTime ? getDateString3(item.emotionStartTime) : 0,
                            yAxis: 0,
                            itemStyle: {
                                color: "#fbdc7f",
                                width: 2
                            }
                        },
                        {
                            yAxis: 0,
                            xAxis: item.emotionEndTIme ? getDateString3(item.emotionEndTIme) : 0
                        }
                    ]);
                } else {
                    area.push([
                        {
                            xAxis: item.emotionStartTime ? getDateString3(item.emotionStartTime) : 0,
                            temp: item.emotion,
                            yAxis: max ? (item.emotion == 20 ? 0 : Number("-" + max)) : item.emotion == 20 ? 0 : -10,
                            itemStyle: {
                                color: item.emotion == 20 ? "#a2dab6" : item.emotion == 30 ? "#f8b2b1" : "#fbdc7f"
                            }
                        },
                        {
                            yAxis: max ? (item.emotion == 20 ? max : 0) : item.emotion == 20 ? 10 : 0,
                            xAxis: item.emotionEndTIme ? getDateString3(item.emotionEndTIme) : 0
                        }
                    ]);
                }
            });
            return {
                emotionList,
                area,
                line
            };
        },
        getAcceleration(data, accData, maxAcc) {
            let { area, line } = this.defaultEmotion(data, Math.ceil(maxAcc));
            let accList = [];
            let yList = [];
            accData.map(item => {
                accList.push(getDateString3(item.driveTime));
                yList.push(item.acceleration.toFixed(1));
            });
            this.accele.yAxis.min = "-" + Math.ceil(Number(maxAcc));
            this.accele.yAxis.max = Math.ceil(Number(maxAcc));
            this.accele.yAxis.interval = Math.ceil(Number(maxAcc));
            this.accele.series.markArea.data = area;
            this.accele.series.markLine.data = line;
            this.accele.xAxis.data = accList;
            this.accele.series.data = yList;
            echarts.init(document.getElementById("acceleration")).setOption(this.accele);
        },
        getSpeed(data, speedData, highSpeed) {
            let { area, line } = initEmotion(data, "speed", highSpeed);
            let speedList = [];
            let yList = [];
            speedData.map(item => {
                speedList.push(getDateString3(item.driveTime));
                yList.push(item.speed.toFixed(1));
            });
            this.speed.series.markArea.data = area;
            this.speed.series.markLine.data = line;
            this.speed.xAxis.data = speedList;
            this.speed.yAxis.interval = Math.ceil(highSpeed / 2);
            this.speed.yAxis.max = Math.ceil(highSpeed);
            this.speed.series.data = yList;
            echarts.init(document.getElementById("speed")).setOption(this.speed);
        },
        getEmotion(data) {
            this.emotion.series[0].data[0].value = (data.positiveEmotionStatistics * 100).toFixed(1);
            this.emotion.series[0].data[1].value = (data.negativeEmotionStatistics * 100).toFixed(1);
            this.emotion.series[0].data[2].value = (data.neutralEmotionStatistics * 100).toFixed(1);
            echarts.init(document.getElementById("emotion")).setOption(this.emotion);
        },
        showAdvise() {
            if (this.surveyMsg === "") {
                this.showAdviseAlert = false;
            } else {
                this.showAdviseAlert = true;
            }
        },
        closeAdvise() {
            this.showAdviseAlert = false;
        },
        filterCardTime,
        timeInspect,
        getDateString2,
        getDateString4,
        getDateStringEnglish
    }
};
</script>
