<template>
    <div class="animated fadeIn add-vehicle">
        <b-card>
            <div slot="header">
                {{ $t("m.add_vehicle.new_add_vehicle") }}
            </div>
            <div class="content">
                <b-row>
                    <b-col sm="6" md="6" lg="6" class="left">
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.vin") }} </label> <span class="star-red">*</span>
                                    <b-form-input :class="vinE ? 'is-exist' : ''" type="text" :placeholder="$t('m.common.enter') + ' ' + $t('m.common.vin')" v-model="vin" :disabled="vinSuccess || disabled" maxlength="17"></b-form-input>
                                    <p v-show="vinIsVaild" class="warn-vin">{{ $t("m.common.vin3") + $t("m.vehicle_bind.invalid") }}</p>
                                    <p v-show="vinSuccess" class="primary-vin">{{ $t("m.common.vin3") + $t("m.vehicle_bind.valid") }}</p>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.year") }}</label
                                    ><span class="star-red">*</span>
                                    <b-form-input :class="yearE ? 'is-exist' : ''" type="text" v-model="year" :placeholder="$t('m.common.enter') + $t('m.common.year')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.make") }}</label
                                    ><span class="star-red">*</span>
                                    <b-form-input :class="makeE ? 'is-exist' : ''" type="text" v-model="make" :placeholder="$t('m.common.enter') + $t('m.common.make')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.model") }}</label
                                    ><span class="star-red">*</span>
                                    <b-form-input :class="modelE ? 'is-exist' : ''" type="text" v-model="model" :placeholder="$t('m.common.model')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.alias") }}</label>
                                    <b-form-input type="text" v-model="alias" :placeholder="$t('m.common.alias')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.trim") }}</label>
                                    <b-form-input type="text" v-model="trim" :placeholder="$t('m.common.enter') + $t('m.common.trim')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.engine") }}</label>
                                    <b-form-input type="text" v-model="engine" :placeholder="$t('m.common.enter') + $t('m.common.engine')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label>{{ $t("m.common.color") }}</label>
                                    <b-form-input type="text" v-model="color" :placeholder="$t('m.common.enter') + $t('m.common.color')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                                <b-form-group class="price-dorlar">
                                    <label>{{ $t("m.common.price") }}</label>
                                    <b-input-group>
                                        <b-input-group-prepend>
                                            <b-input-group-text style="color: #ffffff">{{ $t("m.common.moneyType") }}</b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input v-model="price" type="number" :placeholder="$t('m.common.enter') + $t('m.common.price')"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group>
                                    <label>{{ $t("m.common.stock_num") }}</label>
                                    <b-form-input type="text" v-model="stock" :placeholder="$t('m.common.enter') + $t('m.common.stock_num')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group>
                                    <label>{{ $t("m.common.inv_date") }}</label>
                                    <b-form-input type="date" v-model="date"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group>
                                    <label>{{ $t("m.cloud.vehicle_type") }}</label>
                                    <select class="form-control" name="" id="vehicletype" v-model="condition">
                                        <option v-for="(item, index) in conditionList" :key="index" :value="item.y">{{ item.c }}</option>
                                    </select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group>
                                    <label>{{ $t("m.common.odometer") }}</label>
                                    <b-form-input type="text" v-model="odometer" :placeholder="$t('m.common.enter') + $t('m.common.c_mileage')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group>
                                    <label>{{ $t("m.common.plate_num") }}</label>
                                    <b-form-input type="text" v-model="plate" :placeholder="$t('m.common.enter') + $t('m.common.plate_num')"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col sm="6" class="right right-box">
                        <div class="inner-box">
                            <i v-show="faSpinner" class="fa fa-spinner fa-lg mt-4 i-white"></i>
                            <i v-show="circleCheck" class=" font-2xl cui-circle-check i-success"></i>
                            <i v-show="circleX" class=" font-2xl cui-circle-x i-danger"></i>
                            <img :src="photo" alt height="100%" width="100%" style="border:none" />
                            <input v-show="showInput" class="right-input-one" type="button" id="btn" :value="photoUpload" />
                            <p class="right-p" v-text="pText">{{ $t("m.tip.uploadText") }}</p>
                            <input class="right-input-two" type="file" style="opacity: 0;cursor:pointer" accept="image/jpeg,image/png,image/jpg" id="fileinp" @change="savefile($event)" />
                        </div>
                    </b-col>
                </b-row>

                <div class="upload-group text-center">
                    <b-button class="btn btn-sm btn-info text-white" @click="saveData">
                        {{ $t("m.common.b_save") }}
                    </b-button>
                </div>
            </div>
        </b-card>
        <model :title="title" :content="content" :show="show" :buttonText="{ btnSecond: $t('m.tip.b_ok') }" @closeRemindBox="closeTip()"> </model>
    </div>
</template>

<script>
import httpClient from "@/utils/httpclient";
import model from "@/components/model";
export default {
    name: "addVehicle",
    components: {
        model
    },
    data() {
        return {
            title: "",
            content: "",
            show: false,
            showB: true,
            vin: "",
            vinIsVaild: false,
            vinSuccess: false,
            data: {},
            year: "",
            make: "",
            alias: "",
            trim: "",
            engine: "",
            price: "",
            stock: "",
            condition: "",
            odometer: "",
            model: "",
            color: "",
            date: "",
            plate: "",
            photo: "",
            changedLanguage: null,
            disabled: false,
            currentTip: "",
            curVehicleid: "",
            conditionList: [
                { c: this.$t("m.common.c_new"), y: "1" },
                { c: this.$t("m.common.c_used"), y: "3" },
                { c: this.$t("m.common.c_demo"), y: "2" },
                { c: this.$t("m.common.c_test"), y: "4" }
            ],
            photoUpload: this.$t("m.common.upload_img"),
            faSpinner: false,
            circleCheck: false,
            circleX: false,
            pText: "",
            showInput: true,
            vinE: false,
            yearE: false,
            makeE: false,
            modelE: false
        };
    },
    mounted() {
        if (this.$i18n.locale === "en-US") {
            this.changedLanguage = "English";
        } else {
            this.changedLanguage = "Chinese";
        }
    },
    watch: {
        vin(curVal) {
            if (curVal.length == 17) {
                this.disabled = true;
                httpClient
                    .get("/api/v1/vehicle/detail/vin?vin=" + this.vin)
                    .then(response => {
                        let _mileage = null; //距离单位转换
                        if (response.data.data.odometer) {
                            if (this.changedLanguage === "English") {
                                _mileage = (response.data.data.odometer * 0.0006214).toFixed(0);
                            } else {
                                _mileage = (response.data.data.odometer / 1000).toFixed(0);
                            }
                        } else {
                            _mileage = 0;
                        }
                        this.vinSuccess = true;
                        this.vinIsVaild = false;
                        this.showB = false;
                        this.data = response.data.data;
                        this.year = this.data.year;
                        this.make = this.data.make;
                        this.model = this.data.model;
                        this.alias = this.data.alias;
                        this.trim = this.data.trim;
                        this.engine = this.data.engineType;
                        this.price = this.data.price;
                        this.color = this.data.color;
                        this.date = this.data.inventoryDays;
                        this.stock = this.data.stockNumber;
                        this.condition = this.data.vehicleTypeCode;
                        this.odometer = _mileage;
                        this.plate = this.data.plate;
                        this.photo = this.data.photoPath;
                    })
                    .catch(() => {
                        this.vinIsVaild = false;
                        this.vinSuccess = false;
                        this.showB = false;
                    });
            } else {
                this.vinIsVaild = true;
            }
        },
        //  vin () {
        //     this.checkData()
        // },
        year() {
            this.checkData();
        },
        make() {
            this.checkData();
        },
        model() {
            this.checkData();
        }
    },
    methods: {
        closeTip() {
            if (this.currentTip == "save") {
                this.$router.push("/inventory/vehicle/detail/" + this.curVehicleid);
            }
            this.show = false;
        },
        savefile(event) {
            let file = event.target.files;
            let fb = new FormData();
            fb.append("image", file[0]);
            this.faSpinner = true;
            this.pText = this.$t("m.tip.upload_img");
            this.showInput = false;
            httpClient
                .post("/api/v1/uploadFile", fb)
                .then(response => {
                    if (response.data.code == 200) {
                        this.photo = response.data.data.path;
                        this.faSpinner = false;
                        this.circleCheck = true;
                        this.pText = this.$t("m.tip.upload_success");
                        this.showInput = true;
                        this.photoUpload = this.$t("m.common.re_upload");

                        // this.title = this.$t("m.tip.suc");
                        // this.content = this.$t("m.tip.upload");
                        // this.currentTip = "";
                        // this.show = true;
                        // this.showB = false;
                    }
                })
                .catch(error => {
                    error;
                    this.faSpinner = false;
                    this.circleX = true;
                    this.pText = this.$t("m.tip.upload_fail");
                    this.showInput = true;
                    this.photoUpload = this.$t("m.common.re_upload");
                });
        },
        checkData() {
            this.vinE = this.vin ? false : true;
            this.yearE = this.year ? false : true;
            this.makeE = this.make ? false : true;
            this.modelE = this.model ? false : true;
        },
        saveData() {
            let _mileage = null; //距离单位转换
            if (this.odometer) {
                if (this.changedLanguage === "English") {
                    _mileage = (this.odometer * 1609.344).toFixed(0);
                } else {
                    _mileage = (this.odometer * 1000).toFixed(0);
                }
            } else {
                _mileage = 0;
            }
            this.checkData();
            if (!this.vinE && !this.yearE && !this.makeE && !this.modelE) {
                httpClient
                    .post("/api/v1/vehicle/insert/vehicle", {
                        vin: this.vin,
                        year: this.year,
                        make: this.make,
                        model: this.model,
                        alias: this.alias,
                        trim: this.trim,
                        engineType: this.engine,
                        color: this.color,
                        price: this.price,
                        stockNumber: this.stock,
                        inventoryDate: new Date(this.date).getTime(),
                        vehicleTypeCode: Number(this.condition),
                        currentMileage: _mileage,
                        plate: this.plate,
                        photoPath: this.photo
                    })
                    .then(response => {
                        if (response.data.data.bindResult == true) {
                            this.curVehicleid = response.data.data.vehicleId;
                            this.title = this.$t("m.tip.suc");
                            this.content = this.$t("m.tip.save_succ");
                            this.currentTip = "save";
                            this.show = true;
                        }
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.add-vehicle {
    select {
        height: 35px !important;
    }
    .upload-group {
        width: 30%;
        margin: 0 auto;
        button {
            margin-top: 20px;
        }
    }
    .warn-vin {
        color: red;
    }
    .primary-vin {
        color: #4dbd74;
    }
}
.price-dorlar {
    .input-group-text {
        background: #515b65;
    }
}
.right-box {
    // margin-left: 50px;
    padding: 0 15px 0 50px;
    // height: 500px;
    // border: 1px solid #e4e7ea;
    margin-top: 30px;
    position: relative;
    .inner-box {
        border: 1px solid #e4e7ea;
        height: 500px;
    position: relative;

        .right-input-one {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
        }
        .right-p {
            position: absolute;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -60%);
        }
        .right-input-two {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
        }
        i {
            position: absolute;
            left: 50%;
            top: 42%;
            transform: translate(-50%, -50%);
        }
        .i-white {
            color: #b3bfca;
            top: 38%;
        }
        .i-success {
            color: #4dbd74;
        }
        .i-danger {
            color: #f86c6b;
        }
    }
}
.star-red {
    color: #f86c6b;
}
.is-exist {
    border: 1px solid #f86c6b;
}
</style>
