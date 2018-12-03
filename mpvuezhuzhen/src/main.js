import Vue from 'vue'
import App from './App'
// import MpvueRouterPatch from 'mpvue-router-patch'

// Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
// Vue.prototype.url="http://192.168.1.36:8080"
Vue.prototype.url="http://47.98.32.171:9090"
App.mpType = 'app'

const app = new Vue(App)
// app.globalData.imgUrl="http://47.98.32.171:9090/upload"
// Vue.prototype.globalData = app.globalData
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly;
Vue.prototype.$flyio = fly;
app.$mount()
