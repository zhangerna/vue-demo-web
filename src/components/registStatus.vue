<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <img src="@/assets/pages-img/logo.svg" width="50%">
            </div>
            <br />
            <h2 class="text-center text-muted">{{ $t('m.register.title') }}</h2>
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class=" mx-4">
                        <div class=" px-4 align-items-center text-center">
                            <p :class="errInfo ? 'text-danger' : ''" style="font-size: 144px">
                                <template v-if="icon">
                                    <i :class="icon"></i>
                                </template>
                                <template v-else>
                                    <i :class="errInfo ? 'fa fa-close' : 'cui cui-check'"></i>
                                </template>
                            </p>
                            <p class="text-muted">{{ errInfo ? errInfo : succInfo }}</p>
                            <template v-if="btnGroup && btnGroup.btnFirst && btnGroup.btnSecond">
                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-block btn-outline-primary" type="button" @click="$router.push('/login')">{{ $t('m.login.title2') }}</button>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-block btn-outline-primary" type="button" @click="$router.push('/index')">{{ $t('m.register.home') }}</button>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="btnGroup && btnGroup.btnFirst && !btnGroup.btnSecond">
                                <button class="btn btn-block btn-outline-primary" type="button" @click="$router.push('/login')">{{ $t('m.login.title2') }}</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "registStatus",
        props: ["errInfo", "btnGroup", "succInfo", "icon"]
    }
</script>
