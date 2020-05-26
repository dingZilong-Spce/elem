<template>
  <div class="shop-wrapper">
    <div class="content"
         @click.stop="toggleList">
      <div class="left">
        <div class="logo-wrapper">
          <div class="logo"
               :class="{'hightlight':totalPrice>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="bubble-wrapper"
               v-if="foodCount > 0">
            <bubble :num="foodCount"></bubble>
          </div>
        </div>
        <div class="price"
             :class="{'hightlight':totalPrice > 0 }">
          ￥{{totalPrice}}
        </div>
        <div class="money">
          <span v-text="'另需配送费￥'+ deliveryPrice +'元'"></span>
        </div>
      </div>
      <div class="right"
           :class="{'hightlight':payPrice=='结算'}"
           @click="pay">
        <span v-text="payPrice"
              class="dispatching"></span>
      </div>
    </div>
    <div class="ball-wrapper">
      <div v-for="(item,index) in balls"
           :key="index">
        <transition @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop">
          <div class="ball"
               v-show="item.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from 'components/bubble/bubble'
const BALL_NUM = 10
const innerClsHook = 'inner-hook'
//辅助函数
function createBalls () {
  let balls = []
  for (let i = 0; i < BALL_NUM; i++) {
    balls.push({
      show: false
    })
  }
  return balls
}
export default {
  name: 'shopCar',
  props: {
    selectFood: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    sticky: {
      type: Boolean,
      default: false
    },
    fold: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      balls: createBalls(),
      listFold: this.fold
    }
  },
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    afterDrop (el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    dropping (el, done) {
      //触发浏览器重绘
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    //购物车列表切换
    toggleList () {
      debugger
      if (this.listFold) {
        console.log('1', this.listFold);
        if (!this.foodCount) {
          return
        }
        this.listFold = false
        this._showShopList()
        this._showShopSticky()
      } else {
        console.log('2', this.listFold);
        this.listFold = true
        this._hideShopList()
      }
    },
    //展示购物车列表
    _showShopList () {
      this.shopListComp = this.shopListComp || this.$createShopList({
        $props: {
          selectFood: 'selectFood'
        },
        $events: {
          afterLeave: () => {
            this._hideShopSticky()
          },
          hide: () => {
            this.listFold = true
          },
          add: (el) => {
            this.shopStickyComp.drop(el)
          }
        }
      })
      this.shopListComp.show()
    },
    //隐藏购物车列表
    _hideShopList () {
      const list = this.sticky ? this.$parent.list : this.shopListComp
      list.hide && list.hide()
      console.log(list);
    },
    //显示购物车层级组件
    _showShopSticky () {
      console.log(this.shopListComp);

      this.shopStickyComp = this.shopStickyComp || this.$createShopSticky({
        $props: {
          selectFood: 'selectFood',
          minPrice: 'minPrice',
          deliveryPrice: 'deliveryPrice',
          fold: 'listFold',
          list: this.shopListComp
        }
      })
      this.shopStickyComp.show()
    },
    //隐藏购物车层级组件
    _hideShopSticky () {
      this.shopStickyComp.hide()
    },
    pay (e) {
      if (this.totalPrice < this.minPrice) {
        return
      }
      this.dialog = this.$createDialog({
        title: '支付',
        content: `支付${this.totalPrice}元`,
      })
      this.dialog.show()
      e.stopPropagation();
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFood.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    payPrice () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return '结算'
      }
    },
    foodCount () {
      let count = 0
      this.selectFood.forEach((food) => {
        count += food.count
      })
      return count
    }
  },
  created () {
    this.dropBalls = []
  },

  watch: {
    //监听fold变化 解决组件重复显示
    fold (newVal) {
      this.listFold = newVal
    },
    foodCount (count) {
      if (!this.fold && count === 0) {
        this._hideShopList()
      }
    }
  },
  components: {
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.shop-wrapper
  height 100%
  .content
    height 100%
    display flex
    background $color-background
    font-size 0
    color $color-light-grey
    .left
      flex 1
      .logo-wrapper
        display inline-block
        margin 0 12px
        position relative
        top -10px
        width 56px
        height 56px
        padding 6px
        box-sizing border-box
        border-radius 50%
        background $color-background
        .logo
          background $color-dark-grey
          font-size 24px
          height 100%
          width 100%
          border-radius 50%
          text-align center
          vertical-align top
          &.hightlight
            background-color $color-blue
            .icon-shopping_cart
              color $color-white
          .icon-shopping_cart
            line-height 44px
            font-size $fontsize-large-xxx
            color $color-light-grey
        .bubble-wrapper
          position absolute
          top 0
          right 0px
      .price
        vertical-align top
        display inline-block
        margin-top 12px
        font-size $fontsize-large
        color $color-light-grey
        box-sizing border-box
        font-weight 700
        line-height 24px
        padding-right 12px
        border-right 1px solid rgba(255, 255, 255, 0.1)
        &.hightlight
          color $color-white
      .money
        display inline-block
        font-size 12px
        font-weight 700
        line-height 24px
        vertical-align top
        margin 12px 0 0 12px
    .right
      flex 0 0 105
      width 105px
      padding 0 8px
      background-color $color-dark-grey
      line-height 48px
      height 48px
      text-align center
      &.hightlight
        background-color $color-green
        .dispatching
          color $color-white
      .dispatching
        font-weight 700
        font-size $fontsize-small
        color $color-light-grey
  .ball-wrapper
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background $color-blue
        transition all 0.4s linear
</style>
 