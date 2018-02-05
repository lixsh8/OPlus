<template>
  <div class="pass">
    <span class="back" @click="back"></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
  .pass{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url(./passpage.png) no-repeat center top;
    background-size: cover;

    .back{
      display: block;
      position: absolute;
      width: 100px;
      height: 50px;
    }
  }
</style>