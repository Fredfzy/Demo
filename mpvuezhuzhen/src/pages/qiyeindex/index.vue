<template>
  <!--企业端首页-->
  <div  id="qiye-container" class="container">
    <div v-if="isHome">
      <div class="swiper">
        <swiper indicator-dots="true" autoplay="true" interval="5000" duration="1000">
          <block v-for="(item, index) in imgUrls" :index="index" :key="key">
            <swiper-item>
              <image :src="item.url" class="slide-image" mode="aspectFill"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div class="qiye-jiugongge">
        <div class="qiye-jiugongge-item" v-for="(item,index) in imgs" :index="index" :key="key" @click="bindViewTap(item.weburl)">
          <img :src="item.url" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="qiye-gonggao">
        <div class="gonggao-left">
          <img src="/static/img/qiye_home/qiyegonggao.png" alt="" :style="{width: 104 +'rpx',height: 24 +'rpx',marginBottom:18+'rpx',float:'left'}">
          <span>|</span>
          <div class="notice-bar">
            <van-notice-bar
              background-color="#fff"
              color="#666"
              text="水稻成熟季快要到，请关注天气并准备好相关机械..."
            />
          </div>
        </div>
      </div>
      <div class="qiye-list">
        <div class="qiye-listTitle">
          <img src="/static/img/qiye_home/title.png" alt="" :style="{width:353+'rpx',height:29+'rpx'}">
        </div>
        <div class="qiye-listContent">
          <div class="qiye-listContent-img">
            <img src="/static/img/qiye_home/nongji2.png" alt="" :style="{width:160+'rpx',height:160+'rpx'}">
          </div>
          <view class="qiye-listContent-xuqiu" style="width: 500rpx;height:180rpx">
            <text class="qiye-listContent-text1">大泉村兴泉红薯合作社1#基地1#地块 需要插秧机4台，共20亩地</text>
            <text class="qiye-listContent-text2">作业时间: 11月2日-11月6日</text>
            <text class="qiye-listContent-text3">￥100元/亩</text>
            <text class="qiye-listContent-text4">刚刚</text>
          </view>
          <view class="qiye-listContent-pinjia" style="width: 500rpx;height: 86rpx">
            <img src="/static/img/qiye_home/toubiao.png" alt="" style="width:48rpx;height:48rpx;margin-top: 24rpx">
            <text class="qiye-pinjia-text">兴泉红薯合作社</text>
            <view class="qiye-pinjia-xing" style="width: 192rpx">
              <text class="qiye-pinjia-text1">评分:</text>
              <view v-for="(item,index) in xingxing" :index="index" :key="key">
                <img :src="item.url" alt="" style="width: 26rpx;height:26rpx;float: left;margin-top: 7rpx">
              </view>
            </view>
          </view>
        </div>
        <div class="qiye-listContent">
          <div class="qiye-listContent-img">
            <img src="/static/img/qiye_home/nongji1.png" alt="" :style="{width:160+'rpx',height:160+'rpx'}">
          </div>
          <view class="qiye-listContent-xuqiu" style="width: 500rpx;height:180rpx">
            <text class="qiye-listContent-text1">大泉村兴泉红薯合作社1#基地1#地块 需要插秧机4台，共20亩地</text>
            <text class="qiye-listContent-text2">作业时间: 11月2日-11月6日</text>
            <text class="qiye-listContent-text3">￥100元/亩</text>
            <text class="qiye-listContent-text4">刚刚</text>
          </view>
          <view class="qiye-listContent-pinjia" style="width: 500rpx;height: 86rpx">
            <img src="/static/img/qiye_home/toubiao.png" alt="" style="width:48rpx;height:48rpx;margin-top: 24rpx">
            <text class="qiye-pinjia-text">兴泉红薯合作社</text>
            <view class="qiye-pinjia-xing" style="width: 192rpx">
              <text class="qiye-pinjia-text1">评分:</text>
              <view v-for="(item,index) in xingxing" :index="index" :key="key">
                <img :src="item.url" alt="" style="width: 26rpx;height:26rpx;float: left;margin-top: 7rpx">
              </view>
            </view>
          </view>
        </div>
      </div>
    </div>
    <div v-if="isMyInfo" style="width: 100%;">
      <view style="width: 100%;background-color: #2879c4">
        <view style="width: 100%;padding-top: 32rpx;padding-bottom: 28rpx;padding-left: 35rpx;box-sizing: border-box">
          <image style="width: 130rpx; height: 130rpx;background-color: #fff8e9;border-radius: 68rpx;display: inline-block;position: relative;"></image>
          <view style="width: 392rpx;height: 64rpx;display: inline-block;position: absolute;top:60rpx;left: 184rpx;">
            <text style="width: 181rpx;height: 34rpx;color: #ffffff;font-size: 36rpx;line-height: 30rpx;display: inline-block;margin-right: 50rpx;">请点击登录</text>
            <text style="color: #ffffff;font-size: 30rpx;line-height: 56rpx;border: solid 2rpx #ffffff;border-radius: 4rpx;width: 160rpx;height: 60rpx;display: inline-block;padding-left: 19rpx;box-sizing: border-box;">切换角色</text>
          </view>
          <image style="width: 140rpx;height: 60rpx;position: absolute;top: 60rpx;right: 0rpx;" :src="wodeImgs.img1"></image>
        </view>
        <view style="width: 100%;padding-left: 20rpx;padding-right: 20rpx;padding-bottom:20rpx;box-sizing: border-box;">
          <view style="width: 100%;height: 110rpx;background-color: #ffffff;border-radius: 8rpx;box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(146, 146, 146, 0.2);">
            <view style="position: relative;">
              <image :src="wodeImgs.img3" style="width: 60rpx;height: 60rpx;position: absolute;top: 24rpx;left: 29rpx;"></image>
              <text style="position: absolute;top: 32rpx;left: 98rpx;font-size: 24rpx;color: #333333;">我的积分：<text style="font-size: 32rpx;color: #333333;font-weight: bold;">425</text></text>
              <image :src="wodeImgs.img2" style="width: 60rpx;height: 60rpx;position: absolute;top: 24rpx;left: 415rpx;"></image>
              <text style="position: absolute;top: 32rpx;left: 484rpx;font-size: 24rpx;color: #333333;">我的抢单：<text style="font-size: 32rpx;color: #333333;font-weight: bold;">55</text></text>
            </view>
          </view>
        </view>
        <view style="width: 100%;padding-top: 20rpx;box-sizing: border-box;background-color: #f0f0f0;">
          <view style="width: 100%;height: 210rpx;background-color: #fff;margin-bottom: 20rpx;line-height: 74rpx;">
            <view style="width: 100%;height: 74rpx;border-bottom: 1rpx solid #dcdcdc;position: relative;">
              <image :src="wodeImgs.img7" style="width: 5rpx;height: 24rpx;margin-left: 24rpx;"></image>
              <text style="color:#444;font-size: 32rpx;margin-left: 20rpx;font-weight: bold;">我的订单</text>
              <text style="font-size: 24rpx;color: #999;margin-left: 380rpx;">查看全部需求</text>
              <van-icon name="arrow" color="#999" size="24rpx" custom-style="position:absolute;top:30rpx;right:16rpx;"/>
            </view>
            <view style="width: 100%">
              <view style="width: 33.3%;text-align: center;line-height: 60rpx;display: inline-block">
                <image :src="wodeImgs.img4" style="width: 46rpx;height: 43rpx;display: block;margin-top: 20rpx;margin-left: 100rpx;"></image>
                <text style="font-size: 28rpx;color: #666;">已接单</text>
              </view>
              <view style="width: 33.3%;text-align: center;line-height: 60rpx;display: inline-block">
                <image :src="wodeImgs.img5" style="width: 46rpx;height: 43rpx;display: block;margin-top: 20rpx;margin-left: 100rpx;"></image>
                <text style="font-size: 28rpx;color: #666;">进行中</text>
              </view>
              <view style="width: 33.3%;text-align: center;line-height: 60rpx;display: inline-block">
                <image :src="wodeImgs.img6" style="width: 46rpx;height: 43rpx;display: block;margin-top: 20rpx;margin-left: 100rpx;"></image>
                <text style="font-size: 28rpx;color: #666;">已完成</text>
              </view>
            </view>
          </view>
          <view style="width: 100%;border-top:1rpx solid #dcdcdc; background-color: #fff;">
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;">
              <image :src="wodeImgs.img10" style="width: 42rpx;height: 35rpx;"></image>
              <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">我的基本信息</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;">
              <image :src="wodeImgs.img12" style="width: 42rpx;height: 35rpx;"></image>
              <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">我的优惠券</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;">
              <image :src="wodeImgs.img8" style="width: 42rpx;height: 35rpx;"></image>
              <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">查看溯源</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;">
              <image :src="wodeImgs.img9" style="width: 42rpx;height: 35rpx;"></image>
              <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">帮助和反馈</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;">
              <image :src="wodeImgs.img11" style="width: 42rpx;height: 35rpx;"></image>
              <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">设置</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
          </view>
        </view>
      </view>
    </div>
    <div class="my-tabbar">
      <div class="my-tabbar-top">
        <div class="my-btn">
          <img src="/static/img/qiye_home/btn_release.png" alt="" class="my-btn-img">
          <span class="my-btn-info">发需求</span>
        </div>
      </div>
      <van-tabbar :active="active" @change="onChange">
        <van-tabbar-item>
          <span>首页</span>
          <image slot="icon" :src="icon.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon.active" mode="aspectFit" />
        </van-tabbar-item>
        <van-tabbar-item>
          <!--<span>发需求</span>-->
          <!--<image slot="icon" :src="icon1.normal" class="icon" mode="aspectFit" />-->
          <!--<image slot="icon-active" :src="icon1.active" class="icon" mode="aspectFit" />-->
        </van-tabbar-item>
        <van-tabbar-item>
          <text>我的</text>
          <image slot="icon" :src="icon2.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon2.active" mode="aspectFit" />
        </van-tabbar-item>
        <!--<van-tabbar-item icon="chat" dot>标签</van-tabbar-item>-->
        <!--<van-tabbar-item icon="records" info="5">我的</van-tabbar-item>-->
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      appId:'wx71e3e29379034534',
      secret:'5441882289d13434a70f8bc7788f56d1',
      jsCode:'',
      userInfo: {},
      isHome:true,
      isMyInfo:false,
      value:'',
      active: 0,
      wodeImgs:{
        img1:this.url+"/upload/static/img/youke_home/img_wode1.png",
        img2:this.url+"/upload/static/img/youke_home/img_wode2.png",
        img3:this.url+"/upload/static/img/youke_home/img_wode3.png",
        img4:this.url+"/upload/static/img/youke_home/img_wode4.png",
        img5:this.url+"/upload/static/img/youke_home/img_wode5.png",
        img6:this.url+"/upload/static/img/youke_home/img_wode6.png",
        img7:this.url+"/upload/static/img/youke_home/img_wode7.png",
        img8:this.url+"/upload/static/img/youke_home/img_wode8.png",
        img9:this.url+"/upload/static/img/youke_home/img_wode9.png",
        img10:this.url+"/upload/static/img/youke_home/img_wode10.png",
        img11:this.url+"/upload/static/img/youke_home/img_wode11.png",
        img12:this.url+"/upload/static/img/youke_home/img_wode12.png",
      },
      icon:{
        normal: this.url+'/upload/static/img/qiye_home/home1.png',
        active: this.url+'/upload/static/img/qiye_home/home.png',
      },
      icon1:{
        normal: this.url+'/upload/static/img/qiye_home/btn_release.png',
        active: this.url+'/upload//static/img/qiye_home/btn_release.png',
      },
      icon2:{
        normal: this.url+'/upload/static/img/qiye_home/wode1.png',
        active: this.url+'/upload/static/img/qiye_home/wode.png',
      },

      imgUrls: [
        {
          url:this.url+'/upload/static/img/qiye_home/banner.png',
        },
        {
          url:this.url+'/upload/static/img/qiye_home/banner1.png',
        },
        {
          url:this.url+'/upload/static/img/qiye_home/banner2.png',
        },
      ],
      imgs:[
        {
          url:this.url+"/upload/static/img/qiye_home/wulianwang.png",
          weburl:"../zigBee/barlowVegetableGarden/main",
          // weburl:"../nonghu_index/index/main",
          // weburl:"../youke_index/index/main",
          name:"物联网"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/nongchangpinsuyuan.png",
          weburl:"../productTraceability/main",
          name:"产品溯源"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/nongshixuqiu.png",
          weburl:"../cropDemand/main",
          name:"农事需求"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/nongmuxuhuan.png",
          weburl:"../farmingCycle/main",
          name:"农牧循环"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/lvyoutuisong.png",
          // weburl:"../tourismPush/main",
          weburl:"../youke_index/index/main",
          name:"旅游推送"
        },
      ],
      xingxing:[
        {
          url:this.url+"/upload/static/img/qiye_home/xing.png"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/xing.png"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/xing.png"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/xing.png"
        },
        {
          url:this.url+"/upload/static/img/qiye_home/xing.png"
        },
      ]
    }
  },
  methods: {
    bindViewTap (weburl) {
      const url=weburl
      wx.navigateTo({url});
    },
    getUserInfo () {
      // 调用登录接口
      // console.log(this.url);
      // console.log(this.globalData);
      // this.globalData.imgUrl={url:'http://47.98.32.171:9090/upload'};
      wx.login({
        success: (res) => {
          this.jsCode=res.code;
          if(res.code){
            this.$flyio.post('http://47.98.32.171:9092/WeChatApp/TestLogin',{
              appId:this.appId,
              secret:this.secret,
              jsCode:this.jsCode
            })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          // wx.getUserInfo({
          //   success: (res) => {
          //     this.userInfo = res.userInfo
          //   }
          // })
          console.log(res);
        }
      })
    },
    onChange(event) {
      // console.log(event.mp.detail);
      if(event.mp.detail==0){
        this.isHome=true;
        this.isMyInfo=false;
      }
      else if(event.mp.detail==2){
        this.isHome=false;
        this.isMyInfo=true;
      }
    },
    getFly(){
      this.$flyio.post('http://47.98.32.171:9092/WeChatApp/TestLogin',{
        appId:this.appId,
        secret:this.secret,
        jsCode:this.jsCode
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo();
    // this.getFly();
  }
}
</script>

<style >
  /*企业list*/
  .qiye-listTitle{
    width: 100%;
    height: 80rpx;
    border: 1rpx solid #e6e6e6;
    text-align: center;
    line-height: 80rpx;
  }
  .qiye-listContent{
    width: 750rpx;
    height: 294rpx;
    border: 1rpx solid #e6e6e6;
    padding-top: 30rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    position: relative;
  }
  .qiye-listContent-xuqiu{
    position: absolute;
    top: 30rpx;
    right:30rpx;
    border-bottom: 1rpx dashed #e6e6e6;
  }
  .qiye-listContent-text1{
    display: block;
    font-size: 32rpx;
    line-height: 38rpx;
    color: #000;
  }
  .qiye-listContent-text2{
    display: block;
    font-size: 24rpx;
    line-height: 58rpx;
    color: #999;
  }
  .qiye-listContent-text3{
    display: block;
    font-size: 30rpx;
    line-height: 38rpx;
    color: #f6682b;
  }
  .qiye-listContent-text4{
    display: block;
    font-size: 24rpx;
    line-height: 38rpx;
    color: #808080;
    position: absolute;
    bottom: 0rpx;
    right: 0rpx;
  }
  .qiye-listContent-pinjia{
    position: absolute;
    bottom: 0rpx;
    right:30rpx;
  }
  .qiye-pinjia-text{
    display: inline-block;
    font-size: 26rpx;
    color: #000000;
    position: absolute;
    top: 32rpx;
    left:64rpx
  }
  .qiye-pinjia-xing{
    position: absolute;
    top: 32rpx;
    right: 0rpx;
  }
  .qiye-pinjia-text1{
    font-size: 24rpx;
    color: #999999;
    float: left;
    margin-right: 6rpx;
  }
  /*企业公告*/
  .qiye-gonggao{
    width: 750rpx;
    height: 70rpx;
    border-bottom: 10rpx solid #e6e6e6;
    position: relative;
  }
  .gonggao-left{
    width: 126 rpx;
    height: 24rpx;
    margin: 24rpx 28rpx 22rpx 28rpx;
  }
  .gonggao-left span{
    display: inline-block;
    width: 1rpx;
    color: #c3c3c3;
    margin-bottom: 18rpx;
    position: absolute;
    top:8rpx;
    left: 150rpx;
  }
  .notice-bar{
    width: 545rpx;
    height: 25 rpx;
    float: left;
    margin-left: 20rpx;
    margin-top: 14rpx;
  }
  #qiye-container .van-notice-bar{
    height: 0;
  }
  /*九宫格*/
  .qiye-jiugongge{
    box-sizing: border-box;
    padding-left: 44rpx;
    display: flex;
    flex: 1;
    border-bottom:1px solid #e6e6e6;
  }
  .qiye-jiugongge-item{
    margin-top: 20rpx;
    margin-right: 36rpx;
    text-align: center;
  }
  .qiye-jiugongge-item img{
    width: 98rpx;
    height: 98rpx;
  }
  .qiye-jiugongge-item span{
    font-size: 24rpx;
    line-height: 58rpx;
    color: #000000;
  }
  /*轮播图*/
  .swiper{
    width: 100%;
  }
  .swiper image{
    width: 750rpx;
    height: 362rpx;
  }

  /*tabbar中间按钮*/
  .my-tabbar-top{
    position: fixed;
    bottom: 50rpx;
    left: 334rpx;
    z-index: 2;
  }
  .my-btn{
    position: relative;
  }
  .my-btn-img{
    width: 90rpx;
    height: 90rpx;
    background-image: linear-gradient(-45deg, #fe8754 0%, #f6b62b 100%);
    box-shadow: 0rpx 10rpx 27rpx 0rpx rgba(246, 182, 43, 0.45);
    border-radius: 50rpx;
  }
  .my-btn-info{
    position: absolute;
    bottom: -42rpx;
    left: 13rpx;
    font-size:22rpx;
    color: #6a6a6a;
  }


  #qiye-container .van-tabbar{
    height: 98rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 0rpx 40rpx 0rpx rgba(0, 0, 0, 0.31);
    border: solid 1rpx #ffffff;
  }
  #qiye-container .van-tabbar-item{
    font-size: 22rpx;
    line-height: 38rpx;
    margin-bottom: 0rpx;
    color: #6a6a6a;
  }
  #qiye-container .van-tabbar-item__icon image{
    width: 40 rpx;
    height: 44 rpx;
  }
  #qiye-container .van-tabbar-item--active{
    color: #11be59;
  }
  #qiye-container .van-tabbar-item__icon{
    margin-bottom: -4rpx;
  }
</style>
