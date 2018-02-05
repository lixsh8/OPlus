<template>
  <div class="foot-nav exce-flex-wrap">
    <router-link to="/home" tag="div" class="exce-flex-item pservice">个人服务</router-link>
    <router-link to="/eservice" tag="div" class="exce-flex-item eservice">企业服务</router-link>
    <router-link to="/user" tag="div" class="exce-flex-item user">我</router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/style/variable.less';
@import '../../common/style/mixin.less';

  .foot-nav{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    background: @color-bg-fb;
    border-top: 1px solid #ccc;

    .exce-flex-item{
      text-align: center;
      font-size: @font-size-medium;
      background-size: 25px;
      background-repeat: no-repeat;
      background-position: center 3px;
      padding-top: 25px;

      &.router-link-exact-active{
        color: @color-theme;
      }
    }

    .pservice{
      .bgimage('../../common/images/btn_peservices_default');

      &.router-link-exact-active{
        .bgimage('../../common/images/btn_peservices_select');
      }
    }

    .eservice{
      .bgimage('../../common/images/btn_enservices_default');

      &.router-link-exact-active{
        .bgimage('../../common/images/btn_enservices_select');
      }
    }

    .user{
      .bgimage('../../common/images/btn_personal_default');

      &.router-link-exact-active{
        .bgimage('../../common/images/btn_personal_select');
      }
    }
  }
</style>