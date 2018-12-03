<template>
  <!--消费者首页-->
  <div  id="xiaofeizhe-container" class="container">
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
          <img :src="item.url" alt="" :style="{width:item.width+'rpx',height:item.height+'rpx'}">
        </div>
      </div>
      <div class="qiye-list">
        <div class="qiye-listTitle">
          <img :src="imgtitle" alt="" style="width:100%;height:100%">
        </div>
        <div class="qiye-listContent" v-for="(item,index) in list" :index="index" :key="key">
          <div class="qiye-listContent-img">
            <img :src="item.img" alt="" :style="{width:690+'rpx',height:220+'rpx'}">
          </div>
          <view class="qiye-listContent-xuqiu" style="width: 100%;">
            <text style="width: 100%; font-size: 32rpx;line-height: 38rpx;color: #000;">{{item.content}}</text>
            <text style="float: left;font-size: 26rpx;line-height: 50rpx;color: #808080;">{{item.address}}</text>
            <text style="float: right;font-size: 26rpx;line-height: 50rpx;color: #808080;">{{item.time}}</text>
          </view>
        </div>
      </div>
    </div>
    <div v-if="isTravel">
      <div class="qiye-list">
        <div class="qiye-listContent" v-for="(item,index) in list" :index="index" :key="key">
          <div class="qiye-listContent-img">
            <img :src="item.img" alt="" :style="{width:690+'rpx',height:220+'rpx'}">
          </div>
          <view class="qiye-listContent-xuqiu" style="width: 100%;">
            <text style="width: 100%; font-size: 32rpx;line-height: 38rpx;color: #000;">{{item.content}}</text>
            <text style="float: left;font-size: 26rpx;line-height: 50rpx;color: #808080;">{{item.address}}</text>
            <text style="float: right;font-size: 26rpx;line-height: 50rpx;color: #808080;">{{item.time}}</text>
          </view>
        </div>
      </div>
    </div>
    <div v-if="isCoupon">
      <div class="youke-listTitle">
        <van-tabs :active="tabactive" color="#11be59" @change="tabsChange">
          <van-tab title="未领取(12)"></van-tab>
          <van-tab title="未使用(3)"></van-tab>
          <van-tab title="已过期(4)"></van-tab>
        </van-tabs>
      </div>
      <view style="width:100%;padding-top: 110rpx;padding-left: 30rpx;padding-right: 30rpx;box-sizing:border-box;" v-if="isWeilingqu">
        <view style="width: 100%;height: 186rpx;text-align: left;margin-bottom: 20rpx" v-for="(item,index) in weilingqulist" :index="index" :key="key">
          <image :src="item.imgbg" style="display: inline-block;width: 450rpx;height: 186rpx;position: relative">
            <text style="font-size: 64rpx;line-height:33rpx;position: absolute;top: 42rpx;left:40rpx;" :style="{color:item.color}">{{item.money}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;position: absolute;top: 121rpx;left: 45rpx;" :style="{color:item.color}">{{item.limitMoney}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;color: #2B2B2B;position: absolute;top: 49rpx;left: 226rpx">{{item.restrict}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;color: #AAAAAA;position: absolute;top: 92rpx;left: 226rpx">有效期至：</text>
            <text style="font-size: 24rpx;line-height:20rpx;color: #AAAAAA;position: absolute;top: 124rpx;left: 226rpx">{{item.time}}</text>
          </image>
          <image :src="item.img" style="display: inline-block;width: 240rpx;height: 186rpx;position: relative;">
            <text style="text-align: center;font-size:36rpx;line-height: 186rpx;color: #fff;position: absolute;top:0rpx;left: 40rpx;">点击领取</text>
          </image>
        </view>
      </view>
      <view style="width:100%;padding-top: 110rpx;padding-left: 30rpx;padding-right: 30rpx;box-sizing:border-box;" v-if="isWeishiyong">
        <view style="width: 100%;height: 186rpx;text-align: left;margin-bottom: 20rpx" v-for="(item,index) in weishiyonglist" :index="index" :key="key" @click="iconTaggle(item)">
          <image :src="item.img" style="display: inline-block;width: 240rpx;height: 186rpx;position: relative;">
            <text style="text-align: center;font-size:40rpx;color: #fff;position: absolute;top:50rpx;left: 64rpx;">{{item.money}}</text>
            <text style="text-align: center;font-size:24rpx;color: #fff;position: absolute;top:116rpx;left: 58rpx;">{{item.limitMoney}}</text>
          </image>
          <image :src="item.imgbg" style="display: inline-block;width: 450rpx;height: 186rpx;position: relative">
            <text style="font-size: 20rpx;line-height:20rpx;position: absolute;top: 33rpx;left: 32rpx;border-radius:6rpx;padding-top:7rpx;padding-right: 9rpx;padding-bottom: 6rpx;padding-left: 11rpx;" :style="{color:item.color,border:'2rpx solid'+item.color}">{{item.type}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;color: #2B2B2B;position: absolute;top: 80rpx;left: 32rpx">{{item.restrict}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;color: #AAAAAA;position: absolute;top: 121rpx;left: 32rpx">有效期至：{{item.time}}</text>
            <van-icon name="checked"  size="50rpx" color="#FF6F61" style="position: absolute;top: 67rpx;left:381rpx;" v-if="item.isIcon"/>
          </image>
        </view>
      </view>
      <view style="width:100%;padding-top: 110rpx;padding-left: 30rpx;padding-right: 30rpx;box-sizing:border-box;" v-if="isYishiyong">
        <view style="width: 100%;height: 186rpx;text-align: left;margin-bottom: 20rpx" v-for="(item,index) in yishiyonglist" :index="index" :key="key">
          <image :src="item.img" style="display: inline-block;width: 240rpx;height: 186rpx;position: relative;">
            <text style="text-align: center;font-size:40rpx;color: #B3B3B3;position: absolute;top:50rpx;left: 64rpx;">{{item.money}}</text>
            <text style="text-align: center;font-size:24rpx;color: #BFBFBF;position: absolute;top:116rpx;left: 58rpx;">{{item.limitMoney}}</text>
          </image>
          <image :src="item.imgbg" style="display: inline-block;width: 450rpx;height: 186rpx;position: relative">
            <text style="font-size: 20rpx;line-height:20rpx;position: absolute;top: 33rpx;left: 32rpx;border:2px solid rgba(218,218,218,1);color:#BFBFBF;border-radius:6rpx;padding-top:7rpx;padding-right: 9rpx;padding-bottom: 6rpx;padding-left: 11rpx;">{{item.type}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;color:#BFBFBF;position: absolute;top: 80rpx;left: 32rpx">{{item.restrict}}</text>
            <text style="font-size: 24rpx;line-height:20rpx;color: #BFBFBF;position: absolute;top: 121rpx;left: 32rpx">有效期至：{{item.time}}</text>
            <image :src="item.imgType" style="width: 135rpx;height: 135rpx;position: absolute;top: 12rpx;left: 307rpx;"></image>
          </image>
        </view>
      </view>
    </div>
    <div v-if="isTraceability" style="width: 100%;">
      <view style="width: 100%;height: 3772rpx;" class="suyuanbg">
        <img src="http://47.98.32.171:9090/upload/static/img/qiye_suyuan/banner_bg.png" alt="" style="width: 100%;height: 3900rpx;">
        <img src="http://47.98.32.171:9090/upload/static/img/qiye_suyuan/icon_arrow.png" alt="" style="width:84rpx;height: 24rpx;position: absolute;top: 1240rpx; left: 333rpx">
        <view style="width: 710rpx;" class="img-bg">
          <view class="img-list" style="width: 650rpx;height: 300rpx;position: relative" v-for="(item,index) in suyuanlist" :index="index" :key="key">
            <img :src="item.imgurl" alt="" style="width: 650rpx;height: 300rpx;">
            <text class="img-text">{{item.name}}</text>
            <button class="img-btn" type="default">查看溯源</button>
          </view>
        </view>
      </view>
    </div>
    <div v-if="isMyInfo" style="width: 100%">
      <view style="width: 100%;background-color: #28C469">
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
          <view style="width: 100%;border-top:1rpx solid #dcdcdc; background-color: #fff;">
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;" @click="onGo">
               <image :src="wodeImgs.img10" style="width: 42rpx;height: 35rpx;"></image>
               <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">账户管理</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;">
               <image :src="wodeImgs.img12" style="width: 42rpx;height: 35rpx;"></image>
               <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">我的优惠券</text>
              <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
            </view>
            <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;" @click="onGo1">
               <image :src="wodeImgs.img13" style="width: 42rpx;height: 35rpx;"></image>
               <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">身份证验证</text>
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
      <van-tabbar :active="active" @change="onChange" >
        <van-tabbar-item>
          <span>首页</span>
          <image slot="icon" :src="icon.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon.active" mode="aspectFit" />
        </van-tabbar-item>
        <van-tabbar-item>
          <span>旅游</span>
          <image slot="icon" :src="icon1.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon1.active" mode="aspectFit" />
        </van-tabbar-item>
        <van-tabbar-item>
          <span>优惠券</span>
          <image slot="icon" :src="icon2.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon2.active" mode="aspectFit" />
        </van-tabbar-item>
        <van-tabbar-item>
          <span>溯源</span>
          <image slot="icon" :src="icon3.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon3.active" mode="aspectFit" />
        </van-tabbar-item>
        <van-tabbar-item>
          <text>我的</text>
          <image slot="icon" :src="icon4.normal" class="icon" mode="aspectFit" />
          <image slot="icon-active" :src="icon4.active" mode="aspectFit" />
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      isWeilingqu:true,
      isWeishiyong:false,
      isYishiyong:false,
      isHome:true,//首页
      isTravel:false,//旅游
      isCoupon:false,//优惠券
      isTraceability:false,//溯源
      isMyInfo:false,//我的
      imgtitle:this.url+"/upload/static/img/youke_home/img_title.png",
      value:'',
      active: 0,
      tabactive: 0,
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
        img13:this.url+"/upload/static/img/youke_home/img_wode13.png",
      },
      suyuanlist:[
      {
        name:"宏洲有机大米",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_rice.png"
      },
      {
        name:"果子王仙桃",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_peach.png"
      },
      {
        name:"杨记小磨麻油",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_oil.png"
      },
      {
        name:"梁穆山板栗",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_chestnut.png"
      },
      {
        name:"明天农牧即食玉米",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_corn.png"
      },
      {
        name:"大展黄玉梨",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_pear.png"
      },
      {
        name:"福朝葡萄",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_grape.png"
      },
      {
        name:"大泉雨花茶",
        imgurl:this.url+"/upload/static/img/qiye_suyuan/img_tea.png"
      },
    ],
      weilingqulist:[
        {
          money:"￥30",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan2.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
        {
          money:"￥50",
          limitMoney:"满300元可用",
          restrict:"限江苏大展集团",
          time:"2019年2月10日",
          color:"#11BE59",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan3.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
        {
          money:"￥10",
          limitMoney:"不限有效期",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan2.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
        {
          money:"￥10",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan2.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
        {
          money:"￥15",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan2.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
        {
          money:"￥15",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan2.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
        {
          money:"￥15",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan2.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan1.png'
        },
      ],
      weishiyonglist:[
        {
          money:"￥30",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          type:'购物满减券',
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan5.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan7.png',
          isIcon:false,//是否选中
        },
        {
          money:"￥50",
          limitMoney:"满300元可用",
          restrict:"限江苏大展集团",
          time:"2019年2月10日",
          color:"#11BE59",
          type:'购物满减券',
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan6.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan7.png',
          isIcon:false,//是否选中
        },
        {
          money:"￥10",
          limitMoney:"不限有效期",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          type:'购物满减券',
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan5.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan7.png',
          isIcon:false,//是否选中
        },
      ],
      yishiyonglist:[
        {
          money:"￥30",
          limitMoney:"满200元可用",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          type:'购物满减券',
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan8.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan4.png',
          imgType:this.url+'/upload/static/img/youke_home/img_youhuiquan9.png',
        },
        {
          money:"￥50",
          limitMoney:"满300元可用",
          restrict:"限江苏大展集团",
          time:"2019年2月10日",
          color:"#11BE59",
          type:'购物满减券',
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan8.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan4.png',
          imgType:this.url+'/upload/static/img/youke_home/img_youhuiquan9.png',
        },
        {
          money:"￥10",
          limitMoney:"不限有效期",
          restrict:"全场通用",
          time:"2018年12月31日",
          color:"#FF6F61",
          type:'购物满减券',
          img:this.url+'/upload/static/img/youke_home/img_youhuiquan8.png',
          imgbg:this.url+'/upload/static/img/youke_home/img_youhuiquan4.png',
          imgType:this.url+'/upload/static/img/youke_home/img_youhuiquan9.png',
        },
      ],
      list:[
        {
          img:this.url+'/upload/static/img/youke_home/img_list_item1.png',
          content:"竹镇福朝葡萄已经成熟啦啦！赶紧来采摘吧！",
          address:"福朝葡萄",
          time:"10月31日"
        },
        {
          img:this.url+'/upload/static/img/youke_home/img_list_item2.png',
          content:"竹镇福朝葡萄已经成熟啦啦！赶紧来采摘吧！",
          address:"福朝葡萄",
          time:"10月31日"
        },
        {
          img:this.url+'/upload/static/img/youke_home/img_list_item1.png',
          content:"竹镇福朝葡萄已经成熟啦啦！赶紧来采摘吧！",
          address:"福朝葡萄",
          time:"10月31日"
        },
        {
          img:this.url+'/upload/static/img/youke_home/img_list_item2.png',
          content:"竹镇福朝葡萄已经成熟啦啦！赶紧来采摘吧！",
          address:"福朝葡萄",
          time:"10月31日"
        },
        {
          img:this.url+'//upload/static/img/youke_home/img_list_item1.png',
          content:"竹镇福朝葡萄已经成熟啦啦！赶紧来采摘吧！",
          address:"福朝葡萄",
          time:"10月31日"
        },
        {
          img:this.url+'/upload/static/img/youke_home/img_list_item2.png',
          content:"竹镇福朝葡萄已经成熟啦啦！赶紧来采摘吧！",
          address:"福朝葡萄",
          time:"10月31日"
        },
      ],
      icon:{
        normal: this.url+'/upload/static/img/youke_home/img_tabbar_home1.png',
        active: this.url+'/upload/static/img/youke_home/img_tabbar_home.png',
      },
      icon1:{
        normal: this.url+'/upload/static/img/youke_home/img_tabbar_lvyou1.png',
        active: this.url+'/upload//static/img/youke_home/img_tabbar_lvyou.png',
      },
      icon2:{
        normal: this.url+'/upload/static/img/youke_home/img_tabbar_youhui1.png',
        active: this.url+'/upload//static/img/youke_home/img_tabbar_youhui.png',
      },
      icon3:{
        normal: this.url+'/upload/static/img/youke_home/img_tabbar_suyuan1.png',
        active: this.url+'/upload//static/img/youke_home/img_tabbar_suyuan.png',
      },
      icon4:{
        normal: this.url+'/upload/static/img/youke_home/img_tabbar_wode1.png',
        active: this.url+'/upload/static/img/youke_home/img_tabbar_wode.png',
      },

      imgUrls: [
        {
          url:this.url+'/upload/static/img/youke_home/banner.png',
        },
        {
          url:this.url+'/upload/static/img/youke_home/banner.png',
        },
        {
          url:this.url+'/upload/static/img/youke_home/banner.png',
        },
      ],
      imgs:[
        {
          url:this.url+"/upload/static/img/youke_home/img_chanpin_btn.png",
          width:336,
          height:250
        },
        {
          url:this.url+"/upload/static/img/youke_home/img_lvyou_btn.png",
          width:336,
          height:116
        },
        {
          url:this.url+"/upload/static/img/youke_home/img_youhui_btn.png",
          width:336,
          height:116
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
          this.isHome=true;//首页
          this.isTravel=false;//旅游
          this.isCoupon=false;//优惠券
          this.isTraceability=false;//溯源
          this.isMyInfo=false;//我的
      }
      else if(event.mp.detail==1){
        this.isHome=false;//首页
        this.isTravel=true;//旅游
        this.isCoupon=false;//优惠券
        this.isTraceability=false;//溯源
        this.isMyInfo=false;//我的
      }
      else if(event.mp.detail==2){
        this.isHome=false;//首页
        this.isTravel=false;//旅游
        this.isCoupon=true;//优惠券
        this.isTraceability=false;//溯源
        this.isMyInfo=false;//我的
      }
      else if(event.mp.detail==3){
        this.isHome=false;//首页
        this.isTravel=false;//旅游
        this.isCoupon=false;//优惠券
        this.isTraceability=true;//溯源
        this.isMyInfo=false;//我的
      }
      else{
        this.isHome=false;//首页
        this.isTravel=false;//旅游
        this.isCoupon=false;//优惠券
        this.isTraceability=false;//溯源
        this.isMyInfo=true;//我的
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
    },
    tabsChange(event){
      if(event.mp.detail.title=='未领取(12)'){
        this.tabactive=event.mp.detail.index;
        this.isWeilingqu=true;
        this.isWeishiyong=false;
        this.isYishiyong=false;
      }
      else if(event.mp.detail.title=='未使用(3)'){
        this.tabactive=event.mp.detail.index;
        this.isWeilingqu=false;
        this.isWeishiyong=true;
        this.isYishiyong=false;
      }
      else if(event.mp.detail.title=='已过期(4)'){
        this.tabactive=event.mp.detail.index;
        this.isWeilingqu=false;
        this.isWeishiyong=false;
        this.isYishiyong=true;
      }
      // console.log(event);
      // this.tabactive=event.mp.detail.index;
    },
    iconTaggle(item){
      if(item.isIcon==false){
        item.isIcon=true;
      }
      else{
        item.isIcon=false;
      }
      console.log(item.isIcon);
    },
    onGo(){
      const url="../binding/main";
      wx.navigateTo({url});
    },
    onGo1(){
      const url="../identity/main";
      wx.navigateTo({url});
    },
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
    border-bottom: none;
    padding-top: 30rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 70rpx;
  }
  .qiye-listContent-xuqiu{
    width: 100%;
    /*border-bottom: 1rpx solid #e6e6e6;*/
  }

  #xiaofeizhe-container .van-notice-bar{
    height: 0;
  }
  /*九宫格*/
  .qiye-jiugongge{
    box-sizing: border-box;
    padding-left: 22rpx;
    padding-top: 14rpx;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    flex-direction:column;
    border-bottom:1px solid #e6e6e6;
    width: 100%;
    height: 310rpx;
  }
  .qiye-jiugongge-item{
    margin-top: 10rpx;
    margin-right: 30rpx;
  }
  .qiye-jiugongge-item img{
    width: 98rpx;
    height: 98rpx;
    text-align: left;
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

  #xiaofeizhe-container .van-tabbar{
    height: 98rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 0rpx 40rpx 0rpx rgba(0, 0, 0, 0.31);
    border: solid 1rpx #ffffff;
  }
  #xiaofeizhe-container .van-tabbar-item{
    font-size: 22rpx;
    line-height: 38rpx;
    margin-bottom: 0rpx;
    color: #6a6a6a;
  }
  #xiaofeizhe-container .van-tabbar-item__icon image{
    width: 40 rpx;
    height: 44 rpx;
  }
  #xiaofeizhe-container .van-tabbar-item--active{
    color: #11be59;
  }
  #xiaofeizhe-container .van-tabbar-item__icon{
    margin-bottom: -4rpx;
  }

  /*消费者端优惠券*/
  .youke-listTitle{
    width: 100%;
    height: 68rpx;
    /*border: 1rpx solid #e6e6e6;*/
    text-align: center;
    line-height: 80rpx;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    z-index: 2;
  }

  /*溯源*/
  #qiye-chanpinsuyuan{
    padding-bottom: 0;
  }
  .suyuanbg{
    position: relative;
  }
  .img-bg{
    position: absolute;
    top: 1288rpx;
    left: 21rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
    padding: 30rpx;
    padding-bottom: 98rpx;
    box-sizing: border-box;
  }
  .img-list{
    background-color: #ffffff;
    border-radius: 10rpx;
    border: solid 2rpx #e5e5e5;
    margin-bottom: 20rpx;
  }
  .img-text{
    position: absolute;
    top:82rpx;
    left:30rpx;
    font-size: 48rpx;
    color: #333333;
    box-shadow: 0rpx 14rpx 49rpx 0rpx #ffffff;
  }
  .img-btn{
    position: absolute;
    top:156rpx;
    left:32rpx;
    width: 135rpx;
    height: 48rpx;
    /*border-radius: 6rpx;*/
    /*border: solid 1rpx #c9c9c9;*/
    font-size: 24rpx;
    color: #000000;
    background-color: #fff;
    padding: 0rpx;
    line-height: 48rpx;
  }
</style>

