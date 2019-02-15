<template>
  <div class="control">
    <transition name="move">
      <div class="decrease" v-show="food.count > 0" @click.stop="decreaseNum">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="num">{{count}}</div>
    <div class="add icon-add_circle" @click.stop="addNum"></div>
  </div>
</template>

<script>
const EVENT_ADD = 'add'
export default {
  name : 'control',
  props:{
    food:{
      type : Object
    }
  },
  methods:{
    addNum(event){
      if(!this.food.count){
        this.$set(this.food,'count',1)
      }else{
        this.food.count++
      }
      //第一个参数就是goods组件内驱动这个事件得名称@add
      this.$emit(EVENT_ADD,event.target)
    },
    decreaseNum(){
      if(this.food.count){
        this.food.count--
      }
    }
  },
  computed:{
    count(){
      if(this.food.count > 0){
        return this.food.count
      }
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"

  .control
    display flex
    align-items center
    .decrease
      display inline-block
      padding 6px
      opacity 1
      .inner
        line-height: 24px
        font-size: $fontsize-large-xxx
        color: $color-blue
      &.move-enter-active, &.move-leave-active
        transition: all .4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .add 
      display inline-block
      padding 6px
      line-height: 24px
      font-size: $fontsize-large-xxx
      color: $color-blue
    .num 
      width 12px
      line-height 24px
      text-align center
      font-size: $fontsize-small-s
      color: $color-grey
</style>
