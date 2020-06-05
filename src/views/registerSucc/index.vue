<template>
    <div class="animated fadeIn flex-row app align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <img src="@/assets/pages-img/logo.svg" width="50%">
            </div>
            <br>
            <h1 class="text-muted text-center">{{ $t('m.register.title') }}</h1>
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class=" mx-4">
                        <div class=" px-4 align-items-center text-center">
                            <p style="font-size: 144px"><i class="cui cui-envelope-letter"></i></p>
                            <p class="text-muted">{{ $t('m.register.send_email') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .register-success {
        max-width: 600px;
        margin: 0 auto;
    }
</style>
