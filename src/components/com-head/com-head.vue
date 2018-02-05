<template>
  <div>
    <div class="header" :class="{fixedTop:fixedTop}">
      <span @click="back" v-if="hasBack"></span>
      <h1>{{title}}</h1>
      <em v-if="hasCart"></em>
      <i v-if="hasMessage">消息</i>
    </div>
    <div class="cover" v-if="fixedTop"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String
    },
    fixedTop: {
      type: Boolean,
      default: false
    },
    hasCart: {
      type: Boolean,
      default: false
    },
    hasBack: {
      type: Boolean,
      default: true
    },
    hasMessage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";

  .header{
    width: 100%;
    height: 44px;
    position: relative;
    background: @color-bg-fb;
    border-bottom: 1px solid @color-border;
    &.fixedTop{
      position: fixed;
      z-index: 99;
    }
    span{
      width: 44px;
      height: 44px;
      display: block;
      position: absolute;
      top: 0;
      left: 6px;
      // .bgimage('./btn_back_default');
      .bgimage('../../components/com-head/btn_back_default');
      background-size: 18px;
      background-position: center;
      background-repeat: no-repeat;
    }
    h1{
      width: 100%;
      height: 44px;
      line-height: 44px;
      font-size: @font-size-large;
      text-align: center;
    }
    em{
      display: block;
      width: 50px;
      height: 44px;
      position: absolute;
      top: 0;
      right: 10px;
      background: url(../../common/images/cart.png) no-repeat center;
      background-size: 20px;
    }
    i{
      display: block;
      width: 50px;
      height: 44px;
      position: absolute;
      top: 0;
      right: 10px;
      padding-left: 25px;
      font-style: normal;
      line-height: 44px;
      background: url(../../components/com-head/message-icon.png) no-repeat left center;
      background-size: 20px;
    }
  }
  .cover{
    height: 44px;
  }
</style>