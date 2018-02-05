import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const Home = (resolve) => {
  import('pages/home/home').then((module) => {
    resolve(module)
  })
}

const Eservice = (resolve) => {
  import('pages/eservice/eservice').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('pages/user/user').then((module) => {
    resolve(module)
  })
}

const Allserv = (resolve) => {
  import('pages/allserv/allserv').then((module) => {
    resolve(module)
  })
}

const Pass = (resolve) => {
  import('pages/pass/pass').then((module) => {
    resolve(module)
  })
}

const Parking = (resolve) => {
  import('pages/parking/parking').then((module) => {
    resolve(module)
  })
}

const Shop = (resolve) => {
  import('pages/shop/shop').then((module) => {
    resolve(module)
  })
}

const Actlist = (resolve) => {
  import('pages/actlist/actlist').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'allserv/:code',
          component: Allserv
        },
        {
          path: 'pass',
          component: Pass
        },
        {
          path: 'parking',
          component: Parking
        },
        {
          path: 'shop',
          component: Shop
        },
        {
          path: 'actlist',
          component: Actlist
        }
      ]
    },
    {
      path: '/eservice',
      component: Eservice
    },
    {
      path: '/user',
      component: User
    }
  ]
})
