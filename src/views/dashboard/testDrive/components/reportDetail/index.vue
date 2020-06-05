<template>
    <div class="table-card">
        <table class="table table-responsive-sm table-bordered" v-if="data">
            <thead>
                <tr class="pure-grey">
                    <th width="8%"></th>
                    <th width="23%" v-for="(item, key) in data['head']" :key="key">{{ item ? $t(item) : '' }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ type == 'speed' ?  $t('m.report.duration') : $t('m.report.duratime_times') }}</td>
                    <td v-for="(item, key) in data.body" :key="key">
                        <template v-if="[1, 2].includes(key) && ['acc', 'turn', 'pong'].includes(type)">
                            {{ Object.keys(item).length == 0 ? '' : checkNull(item.durationTime) + $t('m.report.times') + '(' + checkNull(item.durationTimeStatictics) + '%)'  }}
                        </template>
                        <template v-else>
                            {{ Object.keys(item).length == 0 ? '' :  sTransferM(item.durationTime) + '(' + checkNull(item.durationTimeStatictics) + '%)' }}
                        </template>
                    </td>
                </tr>
                <tr class="green-bc">
                    <td>{{ $t('m.report.happy') }}</td>
                    <td v-for="(item, key) in data.body" :key="key">{{ checkObjectNull(item, checkNull(item.positiveEmotionStatistics) + '%') }}</td>
                </tr>
                <tr class="yellow-bc">
                    <td>{{ $t('m.report.normal_happy') }}</td>
                    <td v-for="(item, key) in data.body" :key="key">{{ checkObjectNull(item, checkNull(item.neutralEmotionStatistics) + '%') }}</td>
                </tr>
                <tr class="red-bc">
                    <td>{{ $t('m.report.no_happy') }}</td>
                    <td v-for="(item, key) in data.body" :key="key">{{ checkObjectNull(item, checkNull(item.negativeEmotionStatistics) + '%' )}}</td>
                </tr>
                <tr class="blue-bc">
                    <td>{{ $t('m.cloud.emotion_net_worth') }}</td>
                    <td v-for="(item, key) in data.body" :key="key">{{ checkObjectNull(item, checkNull(item.emotionNetWorth) + '%' ) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .pure-grey {
        background: #f0f3f5;
    }
    .blue-bc {
        background: #b1e0ee;
    }
    .green-bc {
        background: #a2dab6;
    }
    .red-bc {
        background: #f8b2b1;
    }
    .yellow-bc {
        background: #fbdc7f;
    }
</style>

<script>
    import { checkNull } from "@/utils/db"
    export default {
        name: "tableCard",
        props: ['data', 'type'],
        methods: {
            checkNull,
            sTransferM(time) {
                let temp = String((time/60).toFixed(2));
                let temp2 = time % 60;
                return temp[0] + `${ this.$t('m.report.minutes') } ${temp2}${ this.$t('m.report.second')}`
            },
            checkObjectNull(data, data2) {
                return Object.keys(data).length == 0 ? '' : data2;
            }
        }
    }
</script>


