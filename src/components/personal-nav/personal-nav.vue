<template>
  <ul class="nav exce-flex-wrap">
    <li class="exce-flex-item" v-for="nav in navs" :key="nav.id" @click="navClick(nav.name)">
      <img :src="nav.img||require('./pass@3x.png')" alt="">
      <span>{{nav.name}}</span>
    </li>
    <li class="exce-flex-item" @click="navClick('更多')">
      <img src="./more@3x.png" alt="">
      <span>更多</span>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    navClick(type) {
      this.$emit('navClick', event, type)
    }
  },
  props: {
    navs: {
      type: Array
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";

  .nav{
    li{

      img{
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto;
      }
      span{
        display: block;
        padding-top: 10px;
        text-align: center;
        font-size: @font-size-small;
      }
    }
  }
</style>