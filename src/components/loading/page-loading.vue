<template>
  <div class="page-loading">
    <loading :noSize="noSize"></loading>
  </div>
</template>
<script>
import Loading from './loading'

export default {
  data () {
    return {
      noSize: true
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="less" scoped>
  .page-loading{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255,255,255,.5);
    z-index: 99;

    div{
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      margin-top: -25px;
      margin-left: -25px;
    }
    
  }
</style>