<template>
    <div class="test-report-all">
        <div class="content">
            <b-tabs>
                <b-tab :title="$t('m.report_all.user_analysis')" @click="type = 'user'" active class="outline-none">
                    <user-analysis v-if="type == 'user'"></user-analysis>
                </b-tab>
                <b-tab :title="$t('m.report_all.appoint_analysis')" @click="type = 'order'" class="outline-none">
                    <order-analysis v-if="type == 'order'"></order-analysis>
                </b-tab>
                <b-tab :title="$t('m.report_all.emotion_analysis')" @click="type = 'emotion'" class="outline-none">
                    <emotion-analysis v-if="type == 'emotion'"></emotion-analysis>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import userAnalysis from './components/reportAll/userAnalysis';
    import orderAnalysis from './components/reportAll/orderAnalysis';
    import emotionAnalysis from './components/reportAll/emotionAnalysis';
    export default {
        name: "testReportAll",
        components: {
            userAnalysis,
            orderAnalysis,
            emotionAnalysis
        },
        data() {
            return {
                type: 'user'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outline-none:focus {
        outline: none;
    }
</style>
