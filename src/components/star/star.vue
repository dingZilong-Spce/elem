<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" class="item" :class="itemClass"></span>
  </div>
</template>

<script>
    const LENGTH = 5
    const ON = 'on'
    const HALF = 'half'
    const OFF = 'off'
export default {
  name : 'star',
  props:{
    size:{
      type : Number
    },
    score:{
      type : Number
    }
  },
  computed:{
    starType(){
      return 'star-' + this.size
    },
    itemClasses(){
      let result = []
      //计算分数是多少
      let score = Math.floor(this.score * 2) / 2
      //是否存在半星的情况
      let hasDecimal = score % 1 !== 0
      //保存整数
      let intger = Math.floor(score)
      //添加整星
      for(let i =0;i<intger;i++){
        result.push(ON)
      }
      //存在半星 添加半星
      if(hasDecimal){
        result.push(HALF)
      }
      //长度小于5 添加空星
      while(result.length < LENGTH){
        result.push(OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import  '~common/stylus/mixin.styl'
  .star
    display flex 
    justify-content center
    align-items center
    .item
      background-repeat no-repeat
    &.star-48
      .item
        width 20px
        height 20px 
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0px
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .item
        width 15px
        height 15px 
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .item
        width 10px
        height 10px 
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0px
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
