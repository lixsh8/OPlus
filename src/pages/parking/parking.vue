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
    background: url(./parking.png) no-repeat center top;
    background-size: cover;

    .back{
      display: block;
      position: absolute;
      width: 100px;
      height: 50px;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        left: 20px;
        top: 20px;
        transform: rotate(-45deg);
        border: 1px solid #fff;
        border-right: none;
        border-bottom: none;
      }
    }
  }
</style>