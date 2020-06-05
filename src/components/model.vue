<template>

  <transition name="fade">
    <div id="popup-edit" v-if="show">
        <div class="modal-dialog modal-md popup-content">
            <div role="document" class="modal-content" id="__BVID__42___BV_modal_content_"
                 aria-labelledby="__BVID__42___BV_modal_header_" aria-describedby="__BVID__42___BV_modal_body_">
                <header class="modal-header" id="__BVID__42___BV_modal_header_"><h5 class="modal-title">{{title}}</h5>
                    <button type="button" aria-label="Close" class="close" @click="closePopup()">×</button>
                </header>
                <div class="modal-body" id="__BVID__42___BV_modal_body_">
                    <div>{{content}}</div>
                </div>
                <footer class="modal-footer" id="__BVID__42___BV_modal_footer_">
                    <button v-if="buttonText && buttonText.btnFirst" type="button" class="btn btn-secondary"
                            @click="closePopup(buttonText.origin ? buttonText.origin:'')">{{buttonText ? buttonText.btnFirst : ''}}
                    </button>
                    <button v-if="buttonText && buttonText.btnSecond" type="button" class="btn btn-primary" @click="closePopup(type='ok',buttonText.userId)">{{buttonText.btnSecond}}
                    </button>
                </footer>
            </div>
        </div>
      <div class="bg" @click="closePopup()"></div>
    </div>
  </transition>


</template>


<script>
    export default {
        name: "modal",
        props: ["show", 'title', 'content', 'buttonText'],
        methods: {
            closePopup(type, id) {
                this.$emit('closeRemindBox', type, id);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .mo-module {
        .modal-footer {
            button.btn-secondary {
                display: none;
            }
        }
    }
    .fade-enter{
      opacity:0;
    }
    .fade-enter-active{
      transition:opacity .3s;
    }
    .fade-leave-active{
      transition:transform .3s;
    }

    #popup-edit {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2222;

        .popup-content {
            width: 100%;
            position: fixed;
            z-index: 10;
            transform: translateX(-50%);
            left: 50%;
            top: 25%;
        }

        .bg {
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            background: rgba(10,53,68,.5);
            z-index: 8;
        }
    }
</style>
