<template>
    <div id="toast-container" class="toast-top-right" v-show="alertData.length > 0">
        <div class="toast toast-error" aria-live="polite" v-for="(item, key) in alertData" :key="key">
            <span class="fa fa-warning"></span>
            <h4 class="toast-title">{{item.title}}</h4>
            <div class="toast-message" @click="$router.push('/inventory/alerts/detail/' + item.id)">{{item.desc}}</div>
            <i class="fa fa-close" @click="hide(key)"></i>
        </div>
    </div>
</template>

<style lang="scss">
    #toast-container {
        position: fixed;
        z-index: 999999;
        right: 24px;
        top: 10px;
        .toast-error {
            background-color: #bd362f;
        }
        .toast {
            span {
                font-size: 24px;
                position: absolute;
                left: 4%;
                top: 34%;
            }
            i {
                position: absolute;
                right: 5%;
                top: 35%;
                font-size: 15px;
                color: darkslategrey;
            }
            position: relative;
            pointer-events: auto;
            overflow: hidden;
            margin: 0 0 6px;
            padding: 15px 15px 15px 50px;
            width: 300px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            background-position: 15px center;
            background-repeat: no-repeat;
            -moz-box-shadow: 0 0 12px #999;
            -webkit-box-shadow: 0 0 12px #999;
            box-shadow: 0 0 12px #999;
            color: #fff;
            opacity: .8;
            -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
            filter: alpha(opacity=80);
        }
        .toast-title {
            font-weight: bold;
        }
        .toast-message {
            word-wrap: break-word;
            cursor: pointer;
        }
    }
    #toast-container * {
        box-sizing: border-box;
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import { getDateString } from "@/utils/date";
    import SockJs from 'sockjs-client';
    export default {
        name: "socketWarn",
        data() {
            return {
                topics: [
                    'queue.saas.alertPushMsgTopic',
                    'queue.saas.checkInRecordTopic'
                ],
                topics3: '',
                socketUrl: process.env.VUE_APP_SOCKET_URL,
                maxConnect: 10,
                connect: 0,
                data: null,
                alertData: [],
                sockObj: null,
                timeOut: null
            }
        },
        mounted() {
            this.getTopic().then((data) => {
                this.topics3 = data;
                let topics = [...this.topics, data];
                httpClient.post('/api/v1/socketToken', {
                    topics: topics
                }).then(response => {
                    if (response.data.data && response.data.code == 200) {
                        this.topics.push(data);
                        this.$store.dispatch('save_socket_data', response.data.data);
                        this.initSocket(response.data.data);
                    }
                });
            });
        },
        beforeDestroy: function(){
            clearTimeout(this.timeOut);
            this.sockObj.close();
        },
        methods:{
            getTopic() {
                return new Promise((resolve, reject) => {
                    httpClient.get('/api/v1/clouddrive/notice/topic').then(response => {
                        if (response.data.data && response.data.code == 200) {
                            resolve(response.data.data);
                        } else {
                            reject();
                        }
                    })
                });

            },
            hide(key) {
                this.alertData.splice(key, 1);
            },
            alertMessage(message) {
                let year = message.year ? message.year : 'N/A';
                let make = message.make ? message.make : 'N/A';
                let model = message.model ? message.model : 'N/A';
                let vehicleInfo = (!message.year && !message.make && !message.model) ? 'N/A' : `${year} ${make} ${model}`;
                let stockNum = message.stockNum ? message.stockNum : 'N/A';
                let voltage = message.pushTypeDesc;
                this.alertData.push({
                    title: message.alertTypeName,
                    id: message.alertId,
                    desc: `${stockNum} | ${vehicleInfo} ${message.alertDescription} ${voltage ? voltage : ''} now`
                });
                setTimeout(() => {
                    this.hide(this.alertData.length - 1);
                }, 5000);
            },
            filterMessage(data) {
                let tempData = [{
                    user: data.firstName + " " + data.lastName,
                    action: data.available == '1' ? this.$t('m.index.has_just') + this.$t('m.index.check_in') : this.$t('m.index.has_just') + this.$t('m.index.check_out'),
                    vehicle: `${data.year ? data.year : 'N/A'} ${data.make ? data.make : 'N/A'} ${data.model ? data.model : 'N/A'}`,
                    time: getDateString(Number(data.createTime)),
                    vehicleId: data.vehicleId,
                    userId: data.checkUserId
                }];
                this.$store.dispatch('save_log_list', tempData);
            },
            initSocket(respData) {
                let self = this;
                this.sockObj = new SockJs(this.socketUrl + '/echo/?token=' + encodeURIComponent(respData.token));
                this.sockObj.onopen = function () {
                    self.connect += 1;
                };
                this.sockObj.onmessage = function (e) {
                    let message = JSON.parse(e.data);
                    switch (message.topic) {
                        case self.topics[0] + respData.storeId + respData.tenantId:
                            self.alertMessage(JSON.parse(message.message));
                            break;
                        case self.topics[1] + respData.storeId + respData.tenantId:
                            self.filterMessage(JSON.parse(message.message));
                        case self.topics[2]:
                            self.$store.dispatch('update_number', message.message);
                        default:
                            break;
                    }
                };
                this.sockObj.onclose = function () {
                    if (self.connect < self.maxConnect) {
                        self.timeOut = setTimeout(() => {
                            self.initSocket(self.$store.getters.socketData)
                        }, self.connect * 20000);
                    }
                }
            }
        }
    }
</script>
