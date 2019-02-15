<template>
  <div class="header" @click="showDetail">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description" v-text="seller.description + '/' + seller.deliveryTime + '分钟送达'"></div>
        <div v-if="seller.supports" class="supports">
          <support-icon class="icon" :size="1" :type="seller.supports[0].type"></support-icon>
          <span class="text" v-text="seller.supports[0].description"></span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
          <span class="count" v-text="seller.supports.length + '个'"></span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="footer-wrapper">
      <span class="footer-title"></span><span v-text="seller.bulletin" class="footer-text"></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
import SupportIcon from 'components/supportIcon/supportIcon'
export default {
  name: 'v-header',
  data() {
    return {
      detail: false
    }
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    showDetail() {
      this.headerDetailComp = this.headerDetailComp || this.$createDetail({
        $props:{
          seller : 'seller'
        }
      })
      this.headerDetailComp.show()
    }
  },
  components: {
    SupportIcon,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
@import '~common/stylus/index'

.header
  background-color:$color-background-ss
  color:$color-white
  position relative
  overflow hidden
  .content-wrapper
    position relative
    padding :24px 12px 18px 24px
    .avatar
      display :inline-block
      vertical-align :top
      img
        border-radius :2px
    .content
      margin-left :16px
      display :inline-block
      font-size :12px
      .title
        margin :2px 0 8px 0
        .brand
          display :inline-block
          vertical-align :top
          width :30px
          height :18px
          bg-image('brand')
          background-size :30px 18px
          background-repeat :no-repeat
        .name
          font-size :16px
          font-weight :bold
          line-height :18px
          margin-left :6px
      .description
          font-size :12px
          font-weight :200
          line-height :12px
      .supports
        margin-top 10px
        .icon
          vertical-align top
          margin-right 4px
        .text
          font-size 10px
          font-weight 200
          line-height 12px
    .support-count
        position absolute
        right 12px
        bottom 14px
        font-size $fontsize-small-s
        display flex
        align-items center
        height 24px
        line-height 24px
        text-align center
        padding 0 8px
        border-radius 14px
        background: $color-background-sss
        .icon-keyboard_arrow_right
          margin-left: 2px
          font-size: $fontsize-small-s
  .footer-wrapper
    position relative
    background $color-background-sss
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    .footer-title
      display inline-block
      vertical-align top
      width 22px
      height 12px
      background-size 22px 12px
      background-repeat no-repeat
      margin-right 4px
      margin-top 8px
      bg-image('bulletin')
    .footer-text
      vertical-align top
      font-size 10px
      font-weight 200
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      bottom 7px
      font-size 10px
  .background
    width 100%
    height 100%
    position absolute
    z-index -1
    top 0
    left 0
    filter blur(10px)
</style>
