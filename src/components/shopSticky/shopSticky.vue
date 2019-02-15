<template>
  <div class="sticky" v-show="visible">
    <shop-car
      ref="ShopCar"
      :selectFood="selectFood"
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :fold="fold"
      :sticky=true
    >
    </shop-car>
  </div>
</template>

<script>
import ShopCar from 'components/shopCar/shopCar'
import Popup from 'common/mixins/popup'
export default {
  name:'ShopSticky',
  mixins:[Popup],
  props:{
    selectFood:{
      type:Array,
      default(){
        return []
      }
    },
    minPrice:{
      type:Number,
      default:0
    },
    deliveryPrice: {
        type: Number,
        default: 0
    },
    fold:{
      type:Boolean,
      default:true
    },
    list:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    drop(el){
      this.$refs.ShopCar.drop(el)
    }
  },
  components:{
    ShopCar
  }
}
</script>

<style lang="stylus" scoped>
  .sticky
    position absolute
    left 0 
    bottom 0
    z-index 999
    width 100%
    height 48px
</style>
