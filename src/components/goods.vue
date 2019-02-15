<template>
  <div class="goods">
    <div class="scroll-wrapper">
      <cube-scroll-nav
        :side= true
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
      <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-icon
                  v-if="props.txt.type>=1"
                  :size=3
                  :type="props.txt.type"
                ></support-icon>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name">
          <ul>
            <li v-for="food in item.foods" :key="food.name" class="food-item" @click="Food(food)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 v-text="food.name" class="name"></h2>
                <p class="desc" v-text="food.description"></p>
                <div class="sale-wrapper">
                  <span v-text="'月售'+ food.sellCount+'份'" class="count"></span><span class="ratings" v-text="'好评率'+ food.rating +'%'"></span>
                </div>
                <div class="price">
                  <span class="now" v-text="'￥'+food.price"></span>
                  <span v-show="food.oldPrice" class="old" v-text="food.oldPrice"></span>
                </div>
                <div class="control-wrapper"> 
                  <control @add="onAdd" :food="food"></control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-car">
      <shop-car ref="shopCar" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFood="selectFood"></shop-car>
    </div>
  </div>
  
</template>

<script>
import { getGoods } from 'api'
import SupportIcon from 'components/supportIcon/supportIcon'
import ShopCar from 'components/shopCar/shopCar'
import Control from 'components/control/control'
import Bubble from 'components/bubble/bubble'
export default {
  name : 'goods',
  props:{
    data:{
      type : Object,
      default(){
        return 
      }
    }
  },
  data() {
    return {
      goods:[] ,//商品数据
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      food : {}
    }
  },
  computed:{  
    seller(){
      return this.data.seller
    },
    selectFood(){
      let foods = []
      this.goods.forEach((good) =>{
        good.foods.forEach((food) =>{
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    },
    barTxts() {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
    }
  },
  methods:{
    fetch(){
      //这里fetched的作用是只作用一次 
      //第一次fetched未定义进入请求 之后为true不在请求
      if(!this.fetched){
        this.fetched = true
        getGoods().then((res) => {
          this.goods = res
          console.log(this.goods)
        })
      }
      
    },
    onAdd(e){
      this.$refs.shopCar.drop(e)
    },
    Food(food){
      this.food = food
      this._showFoodDetail()
    },
    _showFoodDetail(){
      this.foodDetailComp  = this.foodDetailComp || this.$createFoodDetail({
        $props : {
          food : 'food'
        },
        $events : {
          leave : () =>{
            this.shopStickyComp.hide()
          },
          add :  (el) =>{
            this.shopStickyComp.drop(el)
          }
        }
      })
      this.foodDetailComp.show()
      this._showShopSticky()
    },
    _showShopSticky(){
      this.shopStickyComp = this.shopStickyComp || this.$createShopSticky({
        $props : {
          selectFood:'selectFood',
          minPrice: this.seller.minPrice,
          deliveryPrice:this.seller.deliveryPrice,
          fold:true
        }
      })
      this.shopStickyComp.show()
    }
  },
  components:{
    SupportIcon,
    ShopCar,
    Control,
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
  .goods
    position relative
    height 100%
    .scroll-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex: 1
        position: relative
      .num
        position absolute
        top -10px
        right -8px
      .support-ico
        display: inline-block
        vertical-align: top
        margin-right: 4px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      position relative
      &:last-child
        border-none()
        margin-bottom 0px
      .icon
        width 57px
        flex 0 0 57
      .content
        flex 1
        margin-left 10px
        .name
          font-size $fontsize-medium
          color $color-dark-grey
          line-height 14px
          margin 2px 0 8px 0
          height 14px
        .desc,.sale-wrapper
          line-height 10px
          font-size $fontsize-small-s
          color: $color-light-grey
        .desc 
          line-height 12px
          margin-bottom 8px
          word-break break-word
        .sale-wrapper
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          margin-top 8px
          .now 
            font-size $fontsize-medium
            color $color-red
            margin-right 8px
          .old
            text-decoration line-through
            color  $color-light-grey
            font-size: $fontsize-small-s
        .control-wrapper
          position absolute
          right 0
          bottom 12px
    .shop-car
      position absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>
