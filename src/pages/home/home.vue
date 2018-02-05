<template>
  <div class="home">
    <!-- 头部 -->
    <div class="h-header exce-flex-wrap">
      <div class="project-change">
        <span class="project-name">卓越世纪中心</span>
      </div>
      <div class="qr-box exce-flex-item">
        <span class="qr-title">扫一扫</span>
      </div>
    </div>
    <!-- 广告轮播 -->
    <slide ref="slide" v-if="items.length>0">
      <div v-for="(item, index) in items" :key="index" class="slide-item">
        <a @click="link(item.staticCover)">
          <img :src="item.staticCover">
        </a>
      </div>
    </slide>
    <div class="nav-wrap">
      <personal-nav :navs="navs" @navClick="navClick"></personal-nav>
    </div>
    <!-- 消息 -->
    <slide ref="slideMessage" v-if="messages.length>0" class="message square-dots" :autoPlay="false">
      <div v-for="message in messages" :key="message.id" class="slide-item">
        <a @click="link(message.staticCover)">
          <div class="l"><img :src="messageIcon(message.templetType)" alt="" /></div>
          <div class="r">
            <div class="title">{{getMessageTypeText(message.showData.announcementType)}}</div>
            <div class="subtitle">{{message.showData.createTime}}</div>
            <div class="cnt">{{message.showData.announcementName}}</div>
          </div>
        </a>
      </div>
    </slide>
    <!-- 精彩活动 -->
    <div class="act-wrap">
      <div class="act-hd">精彩活动 <span @click="moreAct">更多</span></div>
      <slide ref="slideAct" v-if="activities.length>0" class="act square-dots" :autoPlay="false">
        <div v-for="activitie in activities" :key="activitie.showData.id" class="slide-item">
          <a @click="link(activitie.staticCover)">
            <div class="banner"><img :src="activitie.showData.conver" alt="" /></div>
            <div class="bd">
              <div class="title">{{activitie.showData.title}}</div>
              <div class="date">{{activitie.showData.actBtime}}</div>
              <div class="addr">{{activitie.showData.actAdd}}</div>
            </div>
          </a>
        </div>
      </slide>
    </div>
    <!-- 为你推荐 -->
    <div class="shop-wrap">
      <div class="act-hd shop-hd">为你推荐 <span @click="goShop">更多</span></div>
      <div class="content" v-if="goods.length>0">
        <GoodsList :goods="goods" @goodClick="goodClickHandle"></GoodsList>
      </div>
    </div>
    <transition name="slide-in">
      <router-view></router-view>      
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import Slide from '../../components/slide/slide'
import GoodsList from '../../components/goods-list/goods-list'
import PersonalNav from '../../components/personal-nav/personal-nav'

export default {
  data () {
    return {
      index: 0,
      items: [], // 轮播图广告
      navs: [],
      messages: [], // 消息
      activities: [], // 活动
      goods: [] // 推荐商品
    }
  },
  created () {
    console.log(this.$token)
    if (this.$token) {
      this.loadData()
    } else {
      this.$http.get(`/api/DbCenter/user/login?account=22650&userPwd=0659c7992e268962384eb17fafe88364&cType=C5`)
      .then(res => {
        Vue.prototype.$token = this.$token = res.data.data.token
        console.log(this.$token + '------' + Vue.prototype.$token)
        this.loadData()
      })
    }
  },
  computed: {
  },
  components: {
    Slide,
    PersonalNav,
    GoodsList
  },
  methods: {
    changeData() {
      this.index = (this.index + 1) % 2
    },
    link(url) {
      location.href = url
    },
    navClick(event, type) {
      switch (type) {
        case '更多':
          this.$router.push('/home/allserv/M02')
          break
        case '卓越优选':
          this.$router.push('/home/shop')
          break
        case '停车缴费':
          this.$router.push('/home/parking')
          break
        case '门禁通行':
          this.$router.push('/home/pass')
          break
      }
    },
    messageIcon(type) {
      switch (type) {
        case 'REWARD':
          return require('./pic_xhh@3x.png')
        case 'ANNOUNCEMENT':
          return require('./pic_wygg@3x.png')
        case 'INVITATION':
          return require('./pic_invite@3x.png')
        case 'SUB':
          return require('./pic_order@3x.png')
        case 'CMPLAIN':
          return require('./pic_suggest@3x.png')
        case 'REPAIR':
          return require('./pic_repair@3x.png')
        default:
          break
      }
    },
    getMessageTypeText(type) {
      switch (type) {
        case 'Ann001':
          return '物业温馨提示'
        case 'Ann002':
          return '您有小红花'
        default:
          return '温馨提示'
      }
    },
    goodClickHandle(goodId) {
      console.log(goodId)
    },
    getNav() {
      this.$http.get(`/apiDbCenter/dataSync/getModules?token=${this.$token}&projectId=${this.pid}&system=5&version=2&sys_language1=en&sys_userId=025E2FA302D143CB901FA5A86E3D9236`)
      .then(res => {
        if (res.data.data.length > 0) {
          localStorage.setItem('nav', res.data.data)
          this.navs = res.data.data[0].modules
        }
      })
    },
    getRemindData() {
      this.$http.get(`/api/DbCenter/home/getMsgRemindData?token=${this.$token}&projectId=${this.pid}`)
        .then(res => {
          if (res.data.data.length > 0) {
            this.messages = res.data.data
          }
        })
    },
    getActList() {
      this.$http.get(`/api/DbCenter/bbsApp/getActListByType?token=${this.$token}&projectId=${this.pid}`)
        .then(res => {
          if (res.data.data.length > 0) {
            this.activities = res.data.data
          }
        })
    },
    getRecommendProducts() {
      this.$http.get(`/api/DbCenter/product/getRecommendedProductList?token=${this.$token}&projectId=${this.pid}`)
        .then(res => {
          if (res.data.code === '000' && res.data.data.recommondedProductsData.length > 0) {
            this.goods = res.data.data.recommondedProductsData
          }
        })
    },
    getAdv() {
      // 滚动广告
      this.$http.get(`/api/DbCenter/dataSync/getNews?sys_projectId=${this.pid}&projectId=${this.pid}&sys_userId=025E2FA302D143CB901FA5A86E3D9236&type=1&Info=iOS%20O+|10.3.1|4.5.0|iPhone%206&sys_source=1&token=${this.$token}`)
        .then(res => {
          if (res.data.length > 0) {
            this.items = res.data
          } else {
            this.items.push(res.data.data)
          }
        })
    },
    loadData() {
      // 导航菜单，模块
      this.getNav()
      // 消息
      this.getRemindData()
      // 精彩活动
      this.getActList()

      // 为你推荐
      this.getRecommendProducts()
      // 滚动广告
      this.getAdv()
    },
    goShop() {
      this.$router.push('/home/shop')
    },
    moreAct() {
      this.$router.push('/home/actlist')
    }
  },
  watch: {
    index() {
      this.$refs.slide.update()
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../common/style/variable.less";
  @import "../../common/style/mixin.less";
  // 头部
  .h-header{
    height: 44px;
    line-height: 44px;
    background-color: @color-bg-hd;

    .project-change{
      width: 7.5rem;
      .bgimage('../../common/images/btn_changeproject_default');
      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 15px center;
      padding-left: 40px;
    }

    .qr-box{
      -webkit-box-orient:unset;
      -webkit-box-pack: end;

      span{
        display: block;
        width: 64px;
        height: 44px;
        margin-right: 15px;
        padding-left: 20px;
        text-align: right;
        .bgimage('../../common/images/btn_scanning_default');
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: 15px center;
      }
    }
  }
  // 导航菜单
  .nav-wrap{
    padding: 12px 0;
    background: @color-bg-sec;
  }
  // 消息
  .message{
    margin-top: 10px;
    a{
      display: block;
      background: @color-bg-sec;
      padding: 10px 15px;
      position: relative;
      .l{
        position: absolute;
        width: 30px;
        height: 30px;
        top: 10px;
        left: 15px;
        img{
          display: block;
          width: 100%;
          height: 30px;
        }
      }
      .r{
        padding-left: 40px;
        text-align: left;
        .title{
          font-size: @font-size-medium-x;
        }
        .subtitle{
          padding-top: 4px;
          font-size: @font-size-small;
          color: @color-text-sub;
        }
        .cnt{
          padding-top: 12px;
          padding-bottom: 20px;
          box-sizing: border-box;
          min-height: 48px;
          .no-wrap();
          font-size: @font-size-medium-x;
        }
      }
    }
  }
  // 精彩活动
  .act-hd{
    position: relative;
    height: 44px;
    padding-left: 15px;
    line-height: 44px;
    &::before{
      content: '';
      display: block;
      position: absolute;
      width: 6px;
      height: 18px;
      left: 0;
      top: 13px;
      background: @color-theme;
    }
    span{
      float: right;
      width: 50px;
      padding-right: 5px;
      font-size: @font-size-medium;
      color: #9D9D9E;
      background: url(../../common/images/arr-r.png) no-repeat 30px center;
      background-size: 16px;
    }
  }
  .act-wrap{
    margin-top: 10px;
    background: @color-bg-sec;
    
    a{
      display: block;
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
  .shop-wrap{
    background: @color-bg-sec;

  }
  // 子路由动画
  .slide-in-enter-active, .slide-in-leave-active{
    transition: all .3s;
  }
  .slide-in-enter, .slide-in-leave-to{
    transform: translate3d(100%, 0, 0)
  }
</style>