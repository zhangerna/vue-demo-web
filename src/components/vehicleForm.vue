<template>
    <div class="animated fadeIn vehicleForm">
        <b-row>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.year') }}</label>
                    <b-form-input type="number" v-model="year" :placeholder="$t('m.common.enter') +  $t('m.common.year')"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.make') }}</label>
                    <b-form-input type="text" v-model="make"  :placeholder="$t('m.common.enter') + $t('m.common.make')"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.model') }}</label>
                    <b-form-input type="text" v-model="model" :placeholder="$t('m.common.enter') + $t('m.common.model')"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.alias') }}</label>
                    <b-form-input type="text" v-model="alias" :placeholder="$t('m.common.enter') + $t('m.common.alias')"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.trim') }}</label>
                    <b-form-input type="text" v-model="trim" :placeholder="$t('m.common.enter') + $t('m.common.trim')"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.engine') }}</label>
                    <b-form-input type="text" v-model="engine" :placeholder="$t('m.common.enter') + $t('m.common.engine')"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.color') }}</label>
                    <select class="form-control" name="color" id="vehiclecolor" v-model="color">
                        <option v-for="(item, index) in colorList" :key="index" :value="item.y">{{item.c}}</option>
                    </select>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group class="price-dorlar">
                    <label>{{ $t('m.common.price') }}</label>
                    <b-input-group>
                        <b-input-group-prepend>
                            <b-input-group-text>{{ $t('m.common.moneyType') }}</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input v-model="price"  type="number" :placeholder="$t('m.common.enter') + $t('m.common.price')"></b-form-input>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.stock_num') }}</label>
                    <b-form-input type="number" v-model="stock" :placeholder="$t('m.common.enter') + $t('m.common.stock_num')"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.inv_date') }}</label>
                    <b-form-input type="date" v-model="date"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.condition') }}</label>
                    <select class="form-control" name="" id="vehicletype" v-model="condition">
                        <option v-for="(item, index) in conditionList" :key="index" :value="item.y">{{item.c}}</option>
                    </select>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.odometer') }}</label>
                    <b-form-input type="text" v-model="odometer" :placeholder="$t('m.common.enter') + $t('m.common.c_mileage')"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="4">
                <b-form-group>
                    <label>{{ $t('m.common.plate_num') }}</label>
                    <b-form-input type="text" v-model="plate" :placeholder="$t('m.common.enter') + $t('m.common.plate_num')"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="upload-group text-center">
            <label>{{ $t('m.common.upload_img') }}</label>
            <img v-show="photo" :src="photo" width="100%">
            <div>
                <input type="file" style="margin-left: 16%" id="uploadAvatar" @change="savefile($event)" accept="image/jpeg,image/png,image/jpg" ref="upload">
            </div>
            <b-button class="btn btn-sm btn-success" style="margin-top: 4%" :disabled="showB" @click="saveData">
                {{ $t('m.common.submit') }}
            </b-button>
        </div>
        <model :title="title"
               :content="content"
               :show="show"
               :buttonText="{btnFirst: 'ok'}"
                @closeRemindBox="show=false">
        </model>
    </div>
</template>

<style lang="scss">
    .vehicleForm {
        select {
            height: 35px!important;
        }
        .upload-group {
            width: 30%;
            margin: 0 auto;
            button {
                margin-top: 20px;
            }

        }
    }
    .price-dorlar{
        .input-group-text{
            background:#515b65 ;
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import model from "@/components/model";
    export default {
        name: "vehicleForm",
        components: {
            model
        },
        props: ['vehicleInfo'],
        data() {
            return {
                title: '',
                content: '',
                show: false,
                showB: false,
                vin: '',
                data: {},
                year: '',
                make: '',
                alias:'',
                trim: '',
                engine: '',
                price: '',
                stock: '',
                condition: 'new',
                odometer: '',
                model: '',
                color: 'Black',
                date: '',
                plate: '',
                photo: '',
                deviceMac: '',
                changedLanguage: null,
                colorList: [{c: this.$t('m.colors.black'), y: "Black"}, {c: this.$t('m.colors.white'), y:'White'}, {c: this.$t('m.colors.silver'), y: 'Silver'}, {c: this.$t('m.colors.blue'), y: 'Blue'}, {c: this.$t('m.colors.red'), y: 'Red'}, {c: this.$t('m.colors.brown'), y: 'Brown'}, {c: this.$t('m.colors.gold'), y: 'Gold'}, {c: this.$t('m.colors.orange'), y: 'Orange'}, {c: this.$t('m.colors.yellow'), y: 'Yellow'}, {c: this.$t('m.colors.purple'), y: 'Purple'}, {c: this.$t('m.colors.green'), y: 'Green'}, {c: this.$t('m.colors.pink'), y: 'Pink'},{c: this.$t('m.colors.others'), y: 'Others'}],
                conditionList: [{c: this.$t('m.common.c_new'), y: "1"}, { c: this.$t('m.common.c_used'), y: "3"}, { c: this.$t('m.common.c_demo'), y: "2" }]
            }
        },
        watch: {
            'vehicleInfo':{
                immediate: true,
                handler(curVal){
                    this.showB = false;
                    this.data = curVal;
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
                    this.condition = this.data.vehicleType;
                    this.odometer = this.data.currentMileage * 0.0006214;
                    this.plate = this.data.plate;
                    this.photo = this.data.photoPath;
                    this.vin = this.data.vin;
                    this.deviceMac = this.data.mac;
                },
                deep: true
            }
        },
        mounted(){
            if (this.$i18n.locale === 'en-US') {
                this.changedLanguage = "English";
            } else {
                this.changedLanguage = 'Chinese';
            }
        },
        methods: {
            savefile(event) {
                let file = event.target.files;
                let fb = new FormData();
                fb.append("image", file[0]);
                httpClient.post('/api/v1/uploadFile', fb).then(response => {
                    if (response.data.code == 200) {
                        this.photo = response.data.data.path;
                        this.title = this.$t('m.tip.suc');
                        this.content = this.$t('m.tip.upload');
                        this.show = true;
                        this.showB = false;
                    }
                }).catch(error => {
                    console.error(error)
                })
            },
            saveData() {

                let _mileage = null;//距离单位转换
                if(this.odometer){
                    if(this.changedLanguage === 'English'){
                        _mileage = ((this.odometer * 1609.344).toFixed(0))
                    }else{
                        _mileage = ((this.odometer * 1000).toFixed(0))
                    }
                }else{
                    _mileage = 0
                }
                httpClient.post('/api/v1/vehicle/bind/device',{
                    vin: this.vin,
                    year: this.year,
                    make: this.make,
                    deviceMac: this.deviceMac,
                    model: this.model,
                    alias: this.alias,
                    trim: this.trim,
                    engineType: this.engine,
                    color: this.color,
                    price: Number(this.price) ? this.price : '',
                    stockNumber: this.stock,
                    inventoryDate: new Date(this.date).getTime(),
                    vehicleTypeCode: Number(this.condition),
                    currentMileage: _mileage,
                    plate: this.plate,
                    photoPath: this.photo

                }).then(response => {
                    this.$emit("showStep3", response.data.data)
                }).catch(err => {
                    console.log("server error");
                })
            }
        }
    }
</script>
