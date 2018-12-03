<template>
  <!--农户端农产品溯源-->
  <div  id="qiye-chanpinsuyuan" class="container">
    <view style="width: 100%;height: 3772rpx;" class="suyuanbg">
      <img src="http://47.98.32.171:9090/upload/static/img/qiye_suyuan/banner_bg.png" alt="" style="width: 100%;height: 3900rpx;">
      <img src="http://47.98.32.171:9090/upload/static/img/qiye_suyuan/icon_arrow.png" alt="" style="width:84rpx;height: 24rpx;position: absolute;top: 1240rpx; left: 333rpx">
      <view style="width: 710rpx;height: 2599rpx;" class="img-bg">
        <view class="img-list" style="width: 650rpx;height: 300rpx;position: relative" v-for="(item,index) in list" :index="index" :key="key">
          <img :src="item.imgurl" alt="" style="width: 650rpx;height: 300rpx;">
          <text class="img-text">{{item.name}}</text>
          <button class="img-btn" type="default">查看溯源</button>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      userInfo: {},
      value:'',
      list:[
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
      // console.log(this.globalData);
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
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>
<style >
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
