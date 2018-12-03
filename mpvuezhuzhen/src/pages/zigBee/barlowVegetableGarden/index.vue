<template>
  <!--物联网-巴布洛蔬菜大棚-->
  <view  id="qiye-wulianwang" class="container">
    <div class="wulian-tab">
      <van-tabs :active="active" color="#11be59" @change="onTabChange">
        <van-tab title="智能设备控制">
          <div class="wulian-control" >
            <!--智能设备控制-->
            <div class="wulian-swiper">
              <swiper :indicator-dots="false" :autoplay="false" interval="5000" duration="1000">
                <block v-for="(item, index) in imgUrls" :index="index" :key="key">
                  <swiper-item>
                    <image :src="item.url" class="wulian-slide-image" mode="aspectFill" style="width: 100%;height: 400rpx;"/>
                  </swiper-item>
                </block>
              </swiper>
              <view style="width: 60rpx;height: 60rpx;" class="wulian-icon" :class="{wulianIconActive:iconStyle==index}" :style="{bottom:item.bottom+'rpx',left:item.left+'rpx'}" v-for="(item,index) in iconList" :key="key" :index="index" @click="iconChane(index)">{{item.name}}</view>
            </div>
            <div class="wulian-tianqi">
              <text style="color: #666666;font-size: 24rpx;line-height: 80rpx;padding-left: 30rpx">南京 多云 5-13℃ 东北风4-5级</text>
            </div>
            <div class="wulian-btnlist">
              <view style="width: 345rpx;background-color: #ffffff;border-radius: 4rpx;display: inline-block;margin-right: 20rpx;margin-bottom: 10rpx" v-for="(item,index) in list" :key="key" :index="index">
                <text style="line-height: 120rpx;color: #333333;font-size: 28rpx;">{{item.key}}</text>
                <text style="line-height: 120rpx;#000000;font-size: 28rpx;font-weight:bold">{{item.value}}</text>
              </view>
              <button type="default" size="mini" style="width: 345rpx; height: 100rpx;border-radius: 4rpx;line-height: 100rpx;font-size: 30rpx;color: #ffffff;background-image: linear-gradient(90deg, #4c4c4c 0%,#3f3f3f 100%), linear-gradient(#b7b7b7,#b7b7b7);margin-right: 20rpx;margin-top: 10rpx;margin-bottom: 20rpx">定时设置</button>
              <button type="default" size="mini" style="width: 345rpx; height: 100rpx;border-radius: 4rpx;line-height: 100rpx;font-size: 30rpx;color: #ffffff;background-image: linear-gradient(90deg, #4c4c4c 0%,#3f3f3f 100%), linear-gradient(#b7b7b7,#b7b7b7);margin-right: 20rpx;margin-top: 10rpx;margin-bottom: 20rpx">预警设置</button>
              <view style="width: 750rpx;background-color: #fff;margin-left: -20rpx; padding: 20rpx;box-sizing: border-box;margin-bottom: 20rpx">
                <view style="border-bottom: 2rpx solid #e6e6e6;margin-top: 40rpx;margin-bottom:30rpx;position: relative">
                  <text style="display: inline-block;background-color: #fff;font-size: 24rpx;color: #000; position: absolute;top: -16rpx;left: 40%;padding-left: 25rpx;padding-right: 25rpx;box-sizing: border-box">智能控制</text>
                </view>
                <view style="margin-left: -20rpx">
                  <view style="width: 330rpx;height: 90rpx;background-color: #ffffff;border-radius: 45rpx;border: solid 2rpx #e5e5e5;display: inline-block;margin-bottom: 20rpx;margin-left: 20rpx;text-align: left" v-for="(item,index1) in switchList" :key="key" :index="index1">
                    <text style="font-size: 30rpx;color: #333333;line-height: 90rpx;margin-left: 30rpx">{{item.name}}</text>
                    <view style="display: inline-block;float: right;margin-top: 20rpx;margin-right: 25rpx">
                      <van-switch
                        size="50rpx"
                        :checked="item.checked"
                        active-color="#ff4949"
                        inactive-color="#bfbfbf"
                        @change="onChange"
                      />
                    </view>
                  </view>
                </view>
              </view>

              <view style="width: 750rpx;background-color: #fff;margin-left: -20rpx; padding: 20rpx;box-sizing: border-box">
                <view style="border-bottom: 2rpx solid #e6e6e6;margin-top: 40rpx;margin-bottom:30rpx;position: relative">
                  <text style="display: inline-block;background-color: #fff;font-size: 24rpx;color: #000; position: absolute;top: -16rpx;left: 40%;padding-left: 25rpx;padding-right: 25rpx;box-sizing: border-box">数据分析</text>
                </view>
                <button type="default" size="mini" style="width: 100%; height: 120rpx;border-radius: 4rpx;line-height: 120rpx;font-size: 30rpx;color: #ffffff;background-image: linear-gradient(90deg, #4e94e3 0%,#2578d5 100%), linear-gradient(#ffffff,#ffffff);margin-bottom: 10rpx;padding: 0rpx">环境参数实时曲线表</button>
                <button type="default" size="mini" style="width: 100%; height: 120rpx;border-radius: 4rpx;line-height: 120rpx;font-size: 30rpx;color: #ffffff;background-image: linear-gradient(90deg, #4e94e3 0%,#2578d5 100%), linear-gradient(#ffffff,#ffffff);margin-bottom: 10rpx;padding: 0rpx">种植品种及产量统计</button>
                <button type="default" size="mini" style="width: 100%; height: 120rpx;border-radius: 4rpx;line-height: 120rpx;font-size: 30rpx;color: #ffffff;background-image: linear-gradient(90deg, #4e94e3 0%,#2578d5 100%), linear-gradient(#ffffff,#ffffff);margin-bottom: 10rpx;padding: 0rpx">投入品统计</button>
              </view>
            </div>
          </div>
        </van-tab>
        <van-tab title="蔬菜种植管理">
          <div class="wulian-management" >
            <!--蔬菜种植管理-->
            <view style="width:100%;background-color: #e6e6e6;">
              <image src="http://47.98.32.171:9090//upload/static/img/qiye_wulian/babuluosucai/img_control.png" alt="" style="width: 100%;height: 200rpx;"></image>
              <view style="width: 100%;height: 140rpx;padding: 20rpx;box-sizing: border-box">
                <van-row gutter="10">
                  <van-col span="12">
                    <button  type="default" style="width:345rpx;height:100rpx;border-radius:4rpx;font-size:28rpx;color: #333;line-height: 100rpx" @click="onOpen">请选择蔬菜品种</button>
                  </van-col>
                  <van-col span="12">
                    <button  type="default" style="width:345rpx;height:100rpx;border-radius:4rpx;font-size:28rpx;color: #333;line-height: 100rpx">请选择成长期</button>
                  </van-col>
                </van-row>
              </view>

              <view style="width: 100%;background-color: #fff;padding: 20rpx;box-sizing: border-box;margin-bottom: 20rpx;">
                <view style="border-bottom: 2rpx solid #e6e6e6;margin-top: 40rpx;margin-bottom:30rpx;position: relative">
                  <text style="display: inline-block;background-color: #fff;font-size: 30rpx;color: #000; position: absolute;top: -20rpx;left: 38%;padding-left: 25rpx;padding-right: 25rpx;box-sizing: border-box;color: #11BE59">智能控制</text>
                </view>
                <view style="width: 100%">
                  <text style="font-size:28rpx;color: #333;font-weight: bold;line-height: 66rpx;">空气温度：</text>
                  <view style="width:100%;height:80rpx;border-radius:4rpx;border:2rpx solid rgba(210,210,210,1);position: relative">
                      <text style="position: absolute;top:18rpx;left:282rpx;font-size: 30rpx;color: #808080">℃</text>
                      <text style="position: absolute;top:18rpx;left:350rpx;font-size: 30rpx;color: #808080">-</text>
                      <text style="position: absolute;top:18rpx;left:642rpx;font-size: 30rpx;color: #808080">℃</text>
                      <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                      <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;right: 70rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                  </view>
                </view>
                <view style="width: 100%">
                  <text style="font-size:28rpx;color: #333;font-weight: bold;line-height: 66rpx;">空气湿度：</text>
                  <view style="width:100%;height:80rpx;border-radius:4rpx;border:2rpx solid rgba(210,210,210,1);position: relative">
                    <text style="position: absolute;top:18rpx;left:282rpx;font-size: 30rpx;color: #808080">%</text>
                    <text style="position: absolute;top:18rpx;left:350rpx;font-size: 30rpx;color: #808080">-</text>
                    <text style="position: absolute;top:18rpx;left:642rpx;font-size: 30rpx;color: #808080">%</text>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;right: 70rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                  </view>
                </view>
                <view style="width: 100%">
                  <text style="font-size:28rpx;color: #333;font-weight: bold;line-height: 66rpx;">CO2浓度：</text>
                  <view style="width:100%;height:80rpx;border-radius:4rpx;border:2rpx solid rgba(210,210,210,1);position: relative">
                    <text style="position: absolute;top:18rpx;left:266rpx;font-size: 30rpx;color: #808080">PPM</text>
                    <text style="position: absolute;top:18rpx;left:350rpx;font-size: 30rpx;color: #808080">-</text>
                    <text style="position: absolute;top:18rpx;left:630rpx;font-size: 30rpx;color: #808080">PPM</text>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;right: 70rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                  </view>
                </view>
                <view style="width: 100%">
                  <text style="font-size:28rpx;color: #333;font-weight: bold;line-height: 66rpx;">光照强度：</text>
                  <view style="width:100%;height:80rpx;border-radius:4rpx;border:2rpx solid rgba(210,210,210,1);position: relative">
                    <text style="position: absolute;top:18rpx;left:266rpx;font-size: 30rpx;color: #808080">LUX</text>
                    <text style="position: absolute;top:18rpx;left:350rpx;font-size: 30rpx;color: #808080">-</text>
                    <text style="position: absolute;top:18rpx;left:630rpx;font-size: 30rpx;color: #808080">LUX</text>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;right: 70rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                  </view>
                </view>
                <view style="width: 100%">
                  <text style="font-size:28rpx;color: #333;font-weight: bold;line-height: 66rpx;">土壤温度：</text>
                  <view style="width:100%;height:80rpx;border-radius:4rpx;border:2rpx solid rgba(210,210,210,1);position: relative">
                    <text style="position: absolute;top:18rpx;left:282rpx;font-size: 30rpx;color: #808080">℃</text>
                    <text style="position: absolute;top:18rpx;left:350rpx;font-size: 30rpx;color: #808080">-</text>
                    <text style="position: absolute;top:18rpx;left:642rpx;font-size: 30rpx;color: #808080">℃</text>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;right: 70rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                  </view>
                </view>
                <view style="width: 100%">
                  <text style="font-size:28rpx;color: #333;font-weight: bold;line-height: 66rpx;">土壤湿度：</text>
                  <view style="width:100%;height:80rpx;border-radius:4rpx;border:2rpx solid rgba(210,210,210,1);position: relative">
                    <text style="position: absolute;top:18rpx;left:282rpx;font-size: 30rpx;color: #808080">%</text>
                    <text style="position: absolute;top:18rpx;left:350rpx;font-size: 30rpx;color: #808080">-</text>
                    <text style="position: absolute;top:18rpx;left:642rpx;font-size: 30rpx;color: #808080">%</text>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                    <input type="number" placeholder="请输入" style="width: 268rpx;height: 80rpx;position: absolute;top: 0rpx;right: 70rpx;font-size: 26rpx;padding-left: 100rpx;box-sizing: border-box;"/>
                  </view>
                </view>
                <view style="margin-top: 30rpx;">
                  <van-row gutter="10">
                    <van-col span="12">
                      <button  type="default" style="width:345rpx;height:100rpx;border-radius:4rpx;font-size:30rpx;color: #fff;line-height: 100rpx;background:linear-gradient(90deg,rgba(76,76,76,1),rgba(63,63,63,1));">设定</button>
                    </van-col>
                    <van-col span="12">
                      <button  type="default" style="width:345rpx;height:100rpx;border-radius:4rpx;font-size:30rpx;color: #fff;line-height: 100rpx;background:linear-gradient(90deg,rgba(76,76,76,1),rgba(63,63,63,1));">启用</button>
                    </van-col>
                  </van-row>
                </view>
              </view>

              <view style="width: 100%;height: 20rpx;background-color: #e6e6e6"></view>

              <view style="width: 100%;background-color: #fff;padding: 20rpx;box-sizing: border-box;margin-bottom: 20rpx;">
                <view style="border-bottom: 2rpx solid #e6e6e6;margin-top: 40rpx;margin-bottom:30rpx;position: relative">
                  <text style="display: inline-block;background-color: #fff;font-size: 30rpx;color: #000; position: absolute;top: -20rpx;left: 35%;padding-left: 25rpx;padding-right: 25rpx;box-sizing: border-box;color: #11BE59">蔬菜营养管理</text>
                </view>
                <image style="width: 190rpx;height: 260rpx;background-color: #fff;border: 10rpx solid #E5E5E5;margin-left:252rpx;margin-top: 40rpx;margin-bottom: 30rpx;display: block;"></image>
                <text style="font-size: 36rpx;font-weight:500;color: #000;text-align: center;display: block;">播种前使用光碳核肥泡种</text>
                <text space="emsp" style="font-size: 30rpx;line-height: 48rpx;color: #000;text-align: center">&nbsp;&nbsp;&nbsp;&nbsp;新型肥料二氧化碳捕集剂光碳核肥，富含微藻、酵母菌及大量氨基酸，其原理是：在不使用化学肥料、化学农药的前提下，能将空气中的碳、氢、氧富集到植物叶茎周围上进行高强度光合作用。一是二氧化碳富集到作物上达到550PPM以上时，植物就会以光碳核肥为媒介，以太阳能为动力，进行光合作用，并提高光合速率；二是能增加土壤中微生物的活性，促进植物根系发达，充分吸收、转化土壤中的氮、磷、钾等有机成分；三是能够抑制光呼吸，合成叶绿素，积累作物生长必需的碳、氢、氧“三要素”，最终达到增产增收的效果。</text>
              </view>
            </view>
          </div>
        </van-tab>
      </van-tabs>
      <van-popup :show="show" @close="onClose"position="bottom">
        <view style="width: 100%;background-color: #fff;">
          <text style="font-size: 30rpx;color: #333;float: left;margin-top: 30rpx;margin-left: 30rpx;">取消</text>
          <text style="font-size: 30rpx;color: #11BE59;float: right;margin-top: 30rpx;margin-right: 30rpx;">确定</text>
          <picker-view indicator-style="height: 100rpx;" style="width: 100%; height: 400rpx;" :value="index" @change="pickerChange">
            <picker-view-column>
              <view v-for="(item,index) in array" :index="index" :key="key" style="text-align: center;font-size: 40rpx">{{item}}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </van-popup>
    </div>
  </view>
</template>
<script>
  export default {
  data () {
    return {
      userInfo: {},
      show:false,
      array:['蔬菜1','蔬菜2','蔬菜3','蔬菜4'],
      index:0,
      active:0,
      value:'',
      iconStyle:0,
      iconList:[
        {
          bottom:'120',
          left:'280',
          name:'1#',
          list:[
            {
              key:"空气温度：",
              value:"25.65°"
            },
            {
              key:"空气湿度：",
              value:"47.7%"
            },
            {
              key:"光照强度：",
              value:"2500LUX"
            },
            {
              key:"CO2浓度：",
              value:"816.96PPM"
            },
            {
              key:"土壤温度：",
              value:"25.65°"
            },
            {
              key:"土壤湿度：",
              value:"47.7%"
            },
          ],
        },
        {
          bottom:'214',
          left:'404',
          name:'2#',
          list:[
            {
              key:"空气温度：",
              value:"29.95°"
            },
            {
              key:"空气湿度：",
              value:"42.7%"
            },
            {
              key:"光照强度：",
              value:"1500LUX"
            },
            {
              key:"CO2浓度：",
              value:"900.96PPM"
            },
            {
              key:"土壤温度：",
              value:"28.65°"
            },
            {
              key:"土壤湿度：",
              value:"47.7%"
            },
          ],
        },
        {
          bottom:'250',
          left:'537',
          name:'3#',
          list:[
            {
              key:"空气温度：",
              value:"25.65°"
            },
            {
              key:"空气湿度：",
              value:"47.7%"
            },
            {
              key:"光照强度：",
              value:"2500LUX"
            },
            {
              key:"CO2浓度：",
              value:"816.96PPM"
            },
            {
              key:"土壤温度：",
              value:"25.65°"
            },
            {
              key:"土壤湿度：",
              value:"47.7%"
            },
          ],
        },
        {
          bottom:'278',
          left:'650',
          name:'4#',
          list:[
            {
              key:"空气温度：",
              value:"25.65°"
            },
            {
              key:"空气湿度：",
              value:"47.7%"
            },
            {
              key:"光照强度：",
              value:"2500LUX"
            },
            {
              key:"CO2浓度：",
              value:"816.96PPM"
            },
            {
              key:"土壤温度：",
              value:"25.65°"
            },
            {
              key:"土壤湿度：",
              value:"47.7%"
            },
          ],
        },
      ],
      list:[],
      imgUrls: [
        {
          url:this.url+'/upload/static/img/qiye_wulian/babuluosucai/img_bg.png',
        },
        {
          url:this.url+'/upload/static/img/qiye_wulian/babuluosucai/img_bg1.png',
        },
      ],
      switchList:[
        {
          name:'喷灌：',
          checked:false,
        },
        {
          name:'滴灌：',
          checked:false,
        },
        {
          name:'风机：',
          checked:false,
        },
        {
          name:'湿帘：',
          checked:false,
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
      // console.log(event);
      // console.log(event.mp.target.dataset.eventid);
      if(event.mp.target.dataset.eventid=="1-0"){
        this.switchList[0].checked=event.mp.detail;
      }
      else if(event.mp.target.dataset.eventid=="1-1"){
        this.switchList[1].checked=event.mp.detail;
      }
      else if(event.mp.target.dataset.eventid=="1-2"){
        this.switchList[2].checked=event.mp.detail;
      }
      else if(event.mp.target.dataset.eventid=="1-3"){
        this.switchList[3].checked=event.mp.detail;
      }
      else if(event.mp.target.dataset.eventid=="1-4"){
        this.switchList[4].checked=event.mp.detail;
      }
    },
    iconChane(index){
      this.iconStyle=index;
      this.list=this.iconList[index].list;
    },
    onTabChange(event){
      console.log(event);
      this.active=event.mp.detail.index;
    },
    pickerChange(event){
      console.log(event);
      this.index=event.mp.detail.value;
    },
    onClose() {
      this.show=false;
    },
    onOpen(){
      this.show=true;
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    this.iconChane(0);
  }
}
</script>

<style >
  #qiye-wulianwang{
    padding-bottom: 0rpx;
  }
  .wulian-tab{
    width: 100%;
    height: 68rpx;
  }
  .wulian-swiper{
    width: 100%;
    position: relative;
  }
  .wulian-swiper swiper{
    height: 400rpx;
  }
  .wulian-tianqi{
    width: 100%;
    height: 80rpx;
    background-color: #ffffff;
  }
  .wulian-btnlist{
    width: 100%;
    /*height: 540rpx;*/
    background-color: #e6e6e6;
    padding: 20rpx 0rpx 20rpx 20rpx;
    box-sizing: border-box;
    text-align: center;
  }
  .wulian-icon{
    background-color: #0067d0;
    border-radius: 60rpx;
    font-size: 18rpx;
    line-height: 60rpx;
    color: #fff;
    text-align: center;
    position: absolute;
  }
  .wulianIconActive{
    background-color: #ff1f20;
  }
</style>
