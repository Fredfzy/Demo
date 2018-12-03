<template>
  <!--农牧循环-->
  <div  id="qiye-detail" class="container">
    <div class="qiye-nongmu-list">
      <div class="qiye-listContent">
        <div class="qiye-listContent-img">
          <img :src="objdetail.img" alt="" :style="{width:160+'rpx',height:160+'rpx'}">
        </div>
        <view class="qiye-listContent-xuqiu" style="width: 528rpx;height:76rpx;margin-bottom: 20rpx" >
          <text class="qiye-listContent-text1">{{objdetail.content}}</text>
          <text class="qiye-listContent-text2">发布时间: {{objdetail.jobTime}}</text>
        </view>
        <view style="width: 100%;background-color: #F0F0F0;padding-left: 30rpx;padding-right: 30rpx;padding-top:25rpx;padding-bottom:25rpx;box-sizing: border-box;margin-bottom: 20rpx;margin-top: 20rpx;">
          <view :style="item.border" v-for="(item,index) in objdetail.list" :index="index" :key="key">
            <text style="font-size:28rpx;line-height:90rpx;color: #333333">{{item.key}}</text>
            <text style="font-size:24rpx;line-height:90rpx;color:#C9C9C9;margin-left: 30rpx;">|</text>
            <text style="font-size:28rpx;line-height:90rpx;margin-left: 30rpx;" :style="item.color">{{item.value}}</text>
          </view>
        </view>
        <view style="width: 100%;background-color: #F0F0F0;padding-left: 30rpx;padding-right: 30rpx;padding-top:25rpx;padding-bottom:25rpx;box-sizing: border-box;margin-bottom: 30rpx;">
          <view :style="item.border" v-for="(item,index) in objdetail.list1" :index="index" :key="key">
            <text style="font-size:28rpx;line-height:90rpx;color: #333333">{{item.key}}</text>
            <text style="font-size:24rpx;line-height:90rpx;color:#C9C9C9;margin-left: 30rpx;">|</text>
            <text style="font-size:28rpx;line-height:90rpx;margin-left: 30rpx;" :style="item.color">{{item.value}}</text>
          </view>
        </view>
        <view style="width: 100%;height:215rpx;border-radius:8rpx;background-color: #11BE59;padding-left: 20rpx;padding-right: 20rpx;box-sizing: border-box;margin-bottom: 20rpx;position: relative">
          <img :src="objdetail.headimg" alt="" style="width:140rpx;height:140rpx;margin-top: 36rpx">
          <text class="qiye-pinjia-text">{{objdetail.name}}</text>
          <text class="qiye-pinjia-text2">联系方式：{{objdetail.contactWay}}</text>
          <view class="qiye-pinjia-xing" style="width: 208rpx">
            <text class="qiye-pinjia-text1">评分:</text>
            <view v-for="(item,index1) in xingxing" :index="index1" :key="key">
              <img :src="item.url" alt="" style="width: 26rpx;height:26rpx;float: left;margin-top: 7rpx">
            </view>
          </view>
        </view>
        <van-row gutter="10">
          <van-col span="12">
            <button  type="default" style="width:345rpx;height:80rpx;border-radius:40rpx;font-size:28rpx;line-height: 80rpx;box-shadow:0rpx 10rpx 27rpx 0rpx rgba(0, 0, 0, 0.08);">关闭订单</button>
          </van-col>
          <van-col span="12">
            <button hover-class="btn-hover" style="width:345rpx;height:80rpx;border-radius:40rpx;font-size:28rpx;color: #fff;line-height: 80rpx;background:linear-gradient(90deg,rgba(254,135,84,0.78),rgba(246,182,43,0.78));box-shadow:0rpx 10rpx 27rpx 0rpx rgba(246,182,43,0.45);">刷新订单</button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      userInfo: {},
      value:'',
      active: 0,
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
      ],
      objdetail:{
          name:'兴泉红薯合作社',
          img:this.url+'/upload/static/img/qiye_nongmuxunhuan/qiye_detail/img_tubiao1.png',
          headimg:this.url+'/upload/static/img/qiye_nongmuxunhuan/qiye_detail/img_toubiao1.png',
          content:'大泉村兴泉红薯合作社1#基地1#地块 需要插秧机4台，共20亩地',
          jobTime:'2018年11月2日 12:29',
          contactWay:'13776562416',
          list:[
            {
              key:"订单状态",
              value:"未接单",
              color:"color:#F6682B",
              border:'border-bottom: 1px solid #dcdcdc'
            },
            {
              key:"订单编号",
              value:"98990009887766364656",
              color:"color:#333",
              border:'border-bottom: none'
            },
          ],
        list1:[
          {
            key:"需求类型",
            value:"农事机械-插秧机",
            color:"color:#000",
            border:'border-bottom: 1px solid #dcdcdc'
          },
          {
            key:"需求时间",
            value:"2018年11月2日-2018年11月5日",
            color:"color:#000",
            border:'border-bottom: 1px solid #dcdcdc'
          },
          {
            key:"需求数量",
            value:"10吨",
            color:"color:#000",
            border:'border-bottom: 1px solid #dcdcdc'
          },
          {
            key:"需求价格",
            value:"￥100元/亩",
            color:"color:#F6682B",
            border:'border-bottom: 1px solid #dcdcdc'
          },
          {
            key:"需求地址",
            value:"大泉村兴泉红薯合作社1#基地1#地块",
            color:"color:#000",
            border:'border-bottom: none'
          },
        ],
        }
    }
  },


  methods: {
    bindViewTap () {
      // const url = '../logs/main'
      // wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    onChange(event) {
      console.log(event.detail);
    },
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style >
  #qiye-detail{
    padding-bottom: 0rpx;
  }
  .qiye-listContent{
    width: 750rpx;
    border-top: 1rpx solid #e6e6e6;
    padding: 30rpx 20rpx 30rpx 20rpx;
    box-sizing: border-box;
    position: relative;
  }
  .qiye-listContent-xuqiu{
    position: absolute;
    top: 30rpx;
    right:20rpx;
  }
  .qiye-listContent-text1{
    display: block;
    font-size: 32rpx;
    line-height: 38rpx;
    font-weight:400;
    color: #000;
  }
  .qiye-listContent-text2{
    display: block;
    font-size: 28rpx;
    line-height: 100rpx;
    color: #999;
    font-weight:400;
  }
  .qiye-pinjia-text{
    font-size: 36rpx;
    color: #fff;
    position: absolute;
    top: 32rpx;
    left:208rpx
  }
  .qiye-pinjia-xing{
    position: absolute;
    top: 92rpx;
    left: 208rpx;
  }
  .qiye-pinjia-text1{
    font-size: 30rpx;
    color: #fff;
    float: left;
    margin-right: 6rpx;
  }
  .qiye-pinjia-text2{
    font-size: 30rpx;
    color: #fff;
    position: absolute;
    top: 142rpx;
    left:208rpx;
  }
  .btn-hover{
    background-color:rgba(0,0,0,0.1)  !important;
  }
  button::after {
    border: none
  }
</style>
