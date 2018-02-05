<template>
  <div class="goods-list">
    <ul>
      <li class="list-item" v-for="(good, index) in goods" :key="index">
        <a @click="goodClick(good.id)">
          <div class="pic"><img :src="good.coverUrl||good.productImgPath" alt=""></div>
          <div class="title">{{good.productName}}</div>
          <div class="price">￥{{good.price}}</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    goods: {
      type: Array
    }
  },
  methods: {
    goodClick(id) {
      this.$emit('goodClick', id)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";
  .goods-list{
    padding: 0 15px;
    box-sizing: border-box;
    ul{
      &::after{
        content: '';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
      }

      li{
        width: 50%; 
        float: left;
        margin-bottom: 12px;
        box-sizing: border-box;
        
        a{
          display: block;
          background: @color-bg-pn;
        }
        &:nth-child(2n+1){
          padding-right: 7.5px;
        }
        &:nth-child(2n){
          padding-left: 7.5px;
        }
        .pic{
          position: relative;
          width: 100%;
          padding-top: 100%;

          img{
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .title{
          padding: 10px;
          font-size: @font-size-medium;
          color: @color-text;
          .no-wrap();
        }
        .price{
          padding: 0 10px 10px 10px;
          font-size: @font-size-medium-x;
          color: @color-text-spc;
        }
      }
    }
  }
</style>