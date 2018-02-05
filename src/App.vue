<template>
  <div id="app" class="demo1">
    <transition :name="transitionName">
      <router-view class="router"/>
    </transition>
    <foot-nav/>
  </div>
</template>

<script>
import FootNav from './components/foot-nav/foot-nav'

export default {
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  created() {
    // console.log('app created')
    // Vue.prototype.$token = 'f2fb0d50-ffb7-4d75-9971-774b47ae885b'
    // http://120.24.175.112:6682/DbCenter/user/login?account=22650&userPwd=0659c7992e268962384eb17fafe88364&cType=C5
  },
  components: {
    FootNav
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="less">
@import "./common/style/index.less";

#app{
  padding-bottom: 50px;
}

.router {
  transition: all .5s;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
</style>