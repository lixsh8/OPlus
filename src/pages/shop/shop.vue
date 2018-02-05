<template>
  <div class="preference">
    <com-head :title="title" :hasCart="hasCart"></com-head>
    <div class="main">
      <bubble></bubble>
      <div class="nav">
        <scroll ref="scroll">
          <ul>
            <li v-for="(cate, index) in cates" 
              :key="cate.id" :dataId='index' :class="{'active':cateIndex==index}"
              @click="cateClick($event, cate.id)"
              >{{cate.classifyName}}</li>
          </ul>
        </scroll>
      </div>
      <div class="cnt">
        <div>
          <scroll ref="scroll" :noBg="noBg"
            :data="goods"
            :startY="parseInt(startY)"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp"
            >
            <GoodsList :goods="goods" @goodClick="goodClickHandle"></GoodsList>
          </scroll>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import ComHead from '../../components/com-head/com-head'
import GoodsList from '../../components/goods-list/goods-list'
import Scroll from '../../components/scroll/scroll'
import Bubble from '../../components/bubble/bubble'
import Loading from '../../components/loading/loading'

export default {
  data() {
    return {
      title: '卓越优选',
      hasCart: true,
      cates: [],
      cateIndex: 0,
      goods: [],
      pageNo: 1,
      pageSize: 10,
      sortType: 1,
      businessID: '01184d9f-254f-11e5-b69c-02004c4f4f50',
      classify: '',
      viewType: '02',
      ortType: 1,
      defaultCate: '',
      currentCate: '',
      noBg: true,
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
  created() {
    if (!this.$token) {
      this.$router.push('/home')
    }
  },
  mounted() {
    // 分类
    this.$http
      .get(
        `/api/DbCenter/product/getBusByProductCategroy?token=${this
          .$token}&projectId=${this.pid}`
      )
      .then(res => {
        if (res.data.data.length > 0) {
          var data = res.data.data
          for (var i = 0; i < data.length; i++) {
            if (data[i].busName === '卓越优选') {
              this.cates = data[i].busProductClassifyBean
              this.defaultCate = this.cates[0].id
            }
          }
        }
      })
    // 优选
  },
  components: {
    ComHead,
    Bubble,
    Loading,
    Scroll,
    GoodsList
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
  methods: {
    cateClick(event, classify) {
      this.pageNo = 1
      this.goods = []
      this.cateIndex = event.target.getAttribute('dataId')
      this.currentCate = classify
      this.loadProduct(classify)
    },
    goodClickHandle(goodId) {
      console.log(goodId)
    },
    onPullingDown() {
      console.log('onPullingDown')
      this.pageNo = 1
      this.goods = []
      this.loadProduct(this.defaultCate)
      // this.$refs.scroll.forceUpdate()
    },
    onPullingUp() {
      console.log('onPullingUp')
      this.pageNo += 1
      this.loadProduct(this.currentCate)
    },
    loadProduct(classify) {
      this.$http
      .get(`/api/DbCenter/product/getProductSpecList?token=${this.$token}&projectId=${this.pid}&pageNo=${this.pageNo}
        &pageSize=${this.pageSize}&classify=${classify}&businessID=${this.businessID}&viewType=${this.viewType}
        &sortType=${this.sortType}`
      )
      .then(res => {
        console.log(res.data.data)
        if (res.data.code === '000' && res.data.data.length > 0) {
          this.goods = this.goods.concat(res.data.data)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }).catch(error => {
        console.log(error)
        this.$refs.scroll.forceUpdate()
      })
    }
  },
  watch: {
    defaultCate: function(val, oldVal) {
      this.loadProduct(val)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/style/variable.less';
@import '../../common/style/mixin.less';

.preference {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background: @color-bg;
  color: @color-text;

  .main {
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;

    .nav {
      width: 86px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: @color-bg-sec;

      ul {
        li {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-text;
          border-bottom: 1px solid @color-borde-sub;

          &.active {
            background: @color-bg;
            color: @color-text-spc;
          }
        }
      }
    }

    .cnt {
      position: absolute;
      top: 10px;
      left: 90px;
      bottom: 0;
      right: 0;
    }
  }
}
</style>