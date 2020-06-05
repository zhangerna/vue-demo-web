<template>
  <div id="spin" class="text-center">
    <img src="../assets/pages-img/spin.gif" alt="">
  </div>
</template>

<script>
	export default {
		name: "loading"
	}
</script>

<style lang="scss" scoped>
 #spin{
   z-index:999;
   position: fixed;
   background: #fff;
   opacity: .6;
   width: 100%;
   height: 100%;
   display: none;
   img{
     position:absolute;
     top:50%;
     left:50%;
     transform: translate(-50%,-50%)
   }
 }
</style>