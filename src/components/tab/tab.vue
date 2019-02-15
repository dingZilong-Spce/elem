<template>
    <div class="tab"> 
      <cube-tab-bar
        :useTransition=false
        :showSlider = true
        v-model="selectedLabel"
        :data="tabs"
        ref="tab"
      >
      </cube-tab-bar>
      <div class="slide-wrapper">  
        <cube-slide 
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        :allow-vertical="true"
        :options="options"
        ref="slide"
        @change="onChange"
        @scroll="onScroll"
        >
          <cube-slide-item v-for="(tab,index) in tabs" :key="index">
            <component :is="tab.component" :data="tab.data"  ref="component"></component>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script>
export default {
  name : 'tab',
  props:{
    tabs:{
      type : Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      index: 0,
      options: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  methods: {
    onChange(current){
      this.index = current
      const component = this.$refs.component[current]
      component.fetch && component.fetch()
    },
    onScroll(pos){
      const tabBarWidth = this.$refs.tab.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -pos.x / slideWidth * tabBarWidth
      this.$refs.tab.setSliderTransform(transform)
    }
  },
  mounted() {
    this.onChange(this.index)
  },
  computed: {
    selectedLabel:{
      get(){
        return this.tabs[this.index].label
      },
      set(newValue){
        this.index = this.tabs.findIndex((tab)=>{
          return tab.label === newValue
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  
  .tab
    display flex
    flex-direction  column
    height 100%
    >>> .cube-tab
      padding 10px 0
    .slide-wrapper
      flex 1
      overflow hidden
</style>
