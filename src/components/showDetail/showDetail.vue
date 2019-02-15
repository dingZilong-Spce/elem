<template>
  <transition name="fade">
    <div class="detail" v-show="visible">
      <div class="detail-wrapper clear-fix">
        <div class="main">
          <h1 class="name" v-text="seller.name"></h1>
          <div class="star">
            <star :size="48" :score="seller.score"></star>
          </div>
          <banner :bannerText="'优惠信息'" class="title"></banner>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(item,index) in seller.supports" :key="index" class="supports-item">
              <support-icon class="icon" :size="2" :type="seller.supports[index].type"></support-icon>
              <span class="text" v-text="seller.supports[index].description"></span>
            </li>
          </ul>
          <banner :bannerText="'商家公告'" class="title"></banner>
          <div class="bulletin">
            <p class="content" v-text="seller.bulletin"></p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
      <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import Star from 'components/star/star'
import Banner from 'components/banner/banner'
import SupportIcon from 'components/supportIcon/supportIcon'
import Popup from 'common/mixins/popup'
export default {
 name : 'detail',
 mixins : [Popup],
 props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components:{
    Star,
    Banner,
    SupportIcon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
@import '~common/stylus/index'
.detail
    color $color-white
    height 100%
    width 100%
    opacity 1
    overflow auto
    z-index 100
    position fixed
    top 0
    left 0
    background $color-background-s
    backdrop-filter blur(10px)
    &.fade-enter-active,&.fade-leave-active
      transition all .5s
    &.fade-enter,&.fade-leave-active
      opacity 0
      background: $color-background
    .detail-wrapper
      overflow hidden
      width 100%
      min-height 100%
      .main
        margin-top 64px
        padding-bottom 64px
        .name
          font-size 16px
          line-height 16px
          font-weight 700
          text-align center
        .star
          margin-top 8px
          padding 2px 0
        .title
          width 80%
          margin 28px auto 24px auto
          .line
            top -6px
            border-bottom 1px solid rgba(255,255,255,.2)
        .supports
          width 80%
          margin 0 auto
          .supports-item
            display flex
            align-items center
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0px
          .icon 
            margin-right 16px
          .text
            font-size 12px
            font-weight 200
        .bulletin
          width 80%
          margin 24px auto 0
          display flex
          justify-content center
          padding 0 12px
          .content
            font-size 12px
            line-height 24px
            font-weight 200
    .detail-close
      position relative
      clear both
      width 30px
      height 30px
      margin: -64px auto 0 auto
      font-size 32px
      color rgba(255,255,255,.5)
</style>
