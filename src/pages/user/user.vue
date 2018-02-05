<template>
  <div class="user">
    <com-head :hasBack="hasBack" :hasMessage="hasMessage" :title="title"></com-head>

    <div class="list user-head">
      <div class="list-item exce-flex-wrap">
        <img src="./140x140.jpg" alt="">
        <div class="exce-flex-item bd head-bd">
          <h6>小星星</h6>
          <p class="txt-ellipsis">我就是我，是颜色不一样的烟火我就是我，是颜色不一样的烟火我就是我，是颜色不一样的烟火我就是我，是颜色不一样的烟火</p>
        </div>
        <span class="arr"></span>
      </div>
    </div>

    <div class="list">
      <div class="list-item exce-flex-wrap">
        <span class="list-icon icon-order"></span>
        <div class="exce-flex-item bd">
          <h6>订单</h6>
        </div>
        <span class="arr"></span>
      </div>
    </div>
  </div>
</template>
<script>
import ComHead from '../../components/com-head/com-head'

export default {
  data () {
    return {
      hasBack: false,
      hasMessage: true,
      title: '我'
    }
  },
  components: {
    ComHead
  }
}
</script>
<style lang="less" scoped>
  @import '../../common/style/common.less';
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";

  .user-head{
    margin-top: 20px;

    img{
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  
</style>