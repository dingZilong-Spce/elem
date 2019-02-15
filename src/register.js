import { createApi } from 'cube-ui'
import Vue from 'vue'
import Detail from 'components/showDetail/showDetail'
import ShopList from 'components/shopList/shopList'
import ShopSticky from 'components/shopSticky/shopSticky'
import FoodDetail from 'components/foodDetail/foodDetail'
//api模式调用
createApi(Vue, Detail)
createApi(Vue, ShopList)
createApi(Vue, ShopSticky)
createApi(Vue, FoodDetail)

