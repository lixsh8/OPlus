<template>
  <div :class='{"mf-loading-container": !noSize}'>
    <img class="loading-img" src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'
  export default {
    name: COMPONENT_NAME,
    props: {
      noSize: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .mf-loading-container
    img
      width: 20px
      height: 20px
      display: block
  .loading-img
    display: block
    width: 100%
    height: 100% 
</style>