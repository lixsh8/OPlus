<template>
  <div class="all-serv">
    <ComHead title='全部应用' :fixedTop="isFixedTop"></ComHead>
    <div class="scroll-wrap">
      <scroll ref="scroll">
        <section class="app" v-for="app in apps" :key="app.id">
          <div class="app-hd" :class="{'title': app.name==='我的应用'}">{{app.name}}<span v-if="app.name==='我的应用'">编辑</span></div>
          <div class="app-bd">
            <ul class="app-list">
              <li class="app-item" v-for="item in app.modules" @click="clickItem(item.id, item.url)" :key="item.id">
                <img :src="item.img" alt="">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
        </section>
      </scroll>
    </div>
  </div>
</template>
<script>
  import ComHead from '../../components/com-head/com-head'
  import Scroll from '../../components/scroll/scroll'
  export default {
    data () {
      return {
        isFixedTop: true,
        apps: []
      }
    },
    created () {
      let CODE = this.$route.params.code || 'M02'
      this.$http.get(`/api/DbCenter/dataSync/getModulesWithUserDefined?token=${this.$token}&sys_projectId=${this.pid}&code=${CODE}&system=5&info=iOS`)
        .then(res => {
          if (res.data) {
            this.apps = res.data.data[0].modules
          }
        })
    },
    components: {
      ComHead,
      Scroll
    },
    methods: {
      clickItem(id, url) {
        console.log(id + '-------' + url)
        if (url) {
          window.location.href = url
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";

  .all-serv{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: @color-bg;
    color: @color-text;
  }
  .scroll-wrap{
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .app{
    background: @color-bg-sec;
    .app-hd{
      height: 25px;
      padding: 15px 15px 0 15px;
      font-size: @font-size-medium-x;
      border-bottom: 1px solid @color-borde-sub;
      background: @color-bg-fb;
      &.title{
        background: @color-bg-sec;
      }
      span{
        display: block;
        width: 50px;
        height: 40px;
        line-height: 47px;
        float: right;
        margin-top: -15px;
        text-align: center;
      }
    }
    .app-list{
      .clearfix();
      .app-item{
        float: left;
        width: 33.33%;
        border-right: 1px solid @color-borde-sub;
        border-bottom: 1px solid @color-borde-sub;
        box-sizing: border-box;
        &:nth-child(3n){
          border-right: none;
        }
        img{
          display: block;
          width: 40px;
          height: 40px;
          margin: 20px auto;
          margin-bottom: 0;
        }
        span{
          display: block;
          width: 100%;
          padding: 10px 0 20px 0;
          font-size: @font-size-medium;
          line-height: 1;
          text-align: center;
        }
      }
    }
  }
</style>