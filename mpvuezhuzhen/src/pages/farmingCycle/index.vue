<template>
  <!--农牧循环-->
  <div  id="qiye-nongmuxunhuan" class="container">
    <div class="qiye-nongmu-list">
      <div style="margin-top: 80rpx">
        <div class="qiye-nongmu-listTitle">
          <van-tabs :active="active" color="#11be59">
            <van-tab title="全部"></van-tab>
            <van-tab title="产出方"></van-tab>
            <van-tab title="需求方"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="qiye-listContent" v-for="(item,index) in list" :index="index" :key="key" @click="onDetail">
        <div class="qiye-listContent-img">
          <img :src="item.img" alt="" :style="{width:160+'rpx',height:160+'rpx'}">
        </div>
        <view class="qiye-listContent-xuqiu" style="width: 500rpx;height:180rpx" >
          <text class="qiye-listContent-text1">{{item.content}}</text>
          <text class="qiye-listContent-text2">作业时间: {{item.jobTime}}</text>
          <text class="qiye-listContent-text3">{{item.price}}</text>
          <text class="qiye-listContent-text4">{{item.time}}</text>
        </view>
        <view class="qiye-listContent-pinjia" style="width: 500rpx;height: 86rpx">
          <img :src="item.headimg" alt="" style="width:48rpx;height:48rpx;margin-top: 24rpx">
          <text class="qiye-pinjia-text">{{item.name}}</text>
          <view class="qiye-pinjia-xing" style="width: 192rpx">
            <text class="qiye-pinjia-text1">评分:</text>
            <view v-for="(item,index1) in xingxing" :index="index1" :key="key">
              <img :src="item.url" alt="" style="width: 26rpx;height:26rpx;float: left;margin-top: 7rpx">
            </view>
          </view>
        </view>
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
      list:[
        {
          img:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_tubiao1.png',
          headimg:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_toubiao1.png',
          content:'大泉村兴泉红薯合作社1#基地1#地块 需要插秧机4台，共20亩地',
          jobTime:'11月2日-11月6日',
          price:'￥100元/亩',
          time:'刚刚',
          name:'兴泉红薯合作社',
        },
        {
          img:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_tubiao2.png',
          headimg:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_toubiao2.png',
          content:'立友合作社1#基地1#地块产出秸秆100吨',
          jobTime:'11月2日-11月6日',
          price:'￥100元/亩',
          time:'五分钟',
          name:'立友合作社',
        },
        {
          img:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_tubiao1.png',
          headimg:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_toubiao3.png',
          content:'润麒猪场产出粪污500吨',
          jobTime:'11月2日-11月6日',
          price:'￥100元/亩',
          time:'一个小时前',
          name:'润麒猪场',
        },
        {
          img:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_tubiao2.png',
          headimg:this.url+'/upload/static/img/qiye_nongmuxunhuan/img_toubiao4.png',
          content:'果子王鲜桃需要秸秆100吨',
          jobTime:'11月2日-11月6日',
          price:'￥100元/亩',
          time:'一天前',
          name:'果子王鲜桃',
        },
      ]
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
    onDetail(){
      const url = '../qiye_detail/main'
      wx.navigateTo({ url })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style >
  .qiye-nongmu-listTitle{
    width: 100%;
    height: 68rpx;
    text-align: center;
    line-height: 80rpx;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    z-index: 2;
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
</style>
