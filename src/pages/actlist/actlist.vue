<template>
  <div class="act">
    <com-head :title="title"></com-head>
    <div class="act-list" v-if="actlist.length>0">
      <div class="scroll-wrap">
        <scroll ref="scroll" :noBg="noBg"
          :data="actlist"
          :startY="parseInt(startY)"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp"
        >
          <div class="act-item" v-for="act in actlist" :key="act.id" @click="goDetail($event,act.showData.id)">
            <div class="banner"><img :src="act.showData.conver" alt="" /></div>
            <div class="bd">
              <div class="title">{{act.showData.title}}</div>
              <div class="date">{{act.showData.actBtime}}</div>
              <div class="addr">{{act.showData.actAdd}}</div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
    <page-loading v-show="loading"></page-loading>
  </div>
</template>
<script>
import ComHead from '../../components/com-head/com-head'
import Scroll from '../../components/scroll/scroll'
import PageLoading from '../../components/loading/page-loading'

export default {
  data() {
    return {
      title: '活动列表',
      noBg: true,
      loading: true,
      pageIndex: 1,
      pageSize: 10,
      actlist: [],
      scrollbar: true,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有数据了！',
      startY: 0
    }
  },
  created () {
    if (!this.$token) {
      this.$router.push('/home')
    }
    this.getActList()
  },
  computed: {
    scrollbarObj: function() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh ? {threshold: parseInt(this.pullDownRefreshThreshold), stop: parseInt(this.pullDownRefreshStop)} : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {threshold: parseInt(this.pullUpLoadThreshold), txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}} : false
    }
  },
  components: {
    ComHead,
    PageLoading,
    Scroll
  },
  methods: {
    goDetail(event, id) {
      console.log(id)
    },
    getActList() {
      this.$http.get(`/api/DbCenter/bbsApp/getActListByType?token=${this.$token}&projectId=${this.pid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
      .then(res => {
        console.log(res.data.data)
        this.loading = false
        if (res.data.code === '000' && res.data.data.length > 0) {
          this.actlist = this.actlist.concat(res.data.data)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }).catch(error => {
        console.log(error)
        this.$refs.scroll.forceUpdate()
      })
    },
    onPullingDown() {
      console.log('onPullingDown')
      this.pageIndex = 1
      this.actlist = []
      this.getActList()
    },
    onPullingUp() {
      this.pageIndex += 1
      console.log('onPullingUp' + this.pageIndex)
      this.getActList()
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";

  .act{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    background: @color-bg;
    color: @color-text;
  }
  .scroll-wrap{
    position: absolute;
    top: 55px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .act-list{
    background: @color-bg-sec;
    
    .act-item{
      display: block;
      margin-bottom: 10px;
      background: @color-bg-sec;

      .banner{
        position: relative;
        padding-top: 50%;
        img{
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
      .bd{
        padding: 10px 15px;
        padding-bottom: 30px;
        text-align: left;
        .title{
          padding-bottom: 6px;
          font-size: @font-size-medium-x;
          color: @color-text;
          line-height: 22px;
        }
        .date{
          padding-left: 24px;
          font-size: @font-size-small;
          line-height: 22px;
          color: @color-text-sub;
          background: url(../../common/images/date.png) no-repeat left center;
          background-size: 16px;
        }
        .addr{
          padding-left: 24px;
          font-size: @font-size-small;
          line-height: 22px;
          color: @color-text-sub;
          background: url(../../common/images/addr.png) no-repeat left center;
          background-size: 16px;
        }
      }
    }
  }
</style>