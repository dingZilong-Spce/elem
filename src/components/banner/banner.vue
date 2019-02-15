<template>
  <div class="banner"> 
    <div class="line"></div>
    <div class="text" v-text="bannerText"></div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  props:{
    bannerText:{
      type : String
    },
    bgColor:{
      type: String
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .banner
    display flex
    .line
      flex :1
      position relative
    .text
      padding 0 10px
</style>
