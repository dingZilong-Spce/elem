<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/header/header'
import { getSeller } from 'api/index'
import Tab from 'components/tab/tab'
import Goods from 'components/goods'
import Ratings from 'components/ratings'
import Seller from 'components/seller'

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then((res) => {
        this.seller = res
      })
    }
  },
  computed: {
    tabs(){
      return [
        {
          label : '商品',
          component : Goods,
          data : {
            seller:this.seller
          }
        },
        {
          label : '评价',
          component : Ratings,
          data : {
            seller:this.seller
          }
        },
        {
          label : '商家',
          component : Seller,
          data : {
            seller:this.seller
          }
        },
      ]
    }
  },
  components: {
    VHeader,
    Tab,
    Goods,
    Ratings,
    Seller
  }
}
</script>
<style lang="stylus" scoped>
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
