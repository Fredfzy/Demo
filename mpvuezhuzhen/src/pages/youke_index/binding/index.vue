<template>
  <!--消费者端绑定验证-->
  <div  id="xiaofeizhe-container" class="container">
     <view style="width: 100%;border-top:1rpx solid #dcdcdc;">
       <view style="width: 100%;height:100rpx;padding-left: 24rpx;box-sizing: border-box;border-bottom:1rpx solid #dcdcdc;line-height:100rpx;position: relative;" v-if="isShow" @click="onchange">
         <text style="font-size: 32rpx;color: #333;margin-left: 33rpx;">绑定手机号</text>
         <van-icon name="arrow" color="#999" size="26rpx" custom-style="position:absolute;top:36rpx;right:33rpx;"/>
       </view>
       <view v-if="isShow1" style="width: 100%;padding-left: 36rpx;padding-right: 36rpx;box-sizing: border-box;">
         <view style="width: 100%;position: relative">
           <image :src="img1" style="width: 37rpx;height: 57rpx;position: absolute;top: 35rpx;left: 34rpx;z-index: 2;"></image>
           <view style="width: 100%;height: 134rpx;">
             <van-cell-group>
               <van-field
                 :value="value"
                 center
                 clearable
                 placeholder="请输入手机号"
                 :border="border"
                 use-button-slot
                 input-class="input-class1">
                 <van-button slot="button" size="small" type="primary" custom-class="custom-class-btn">发送验证码</van-button>
               </van-field>
             </van-cell-group>
           </view>
         </view>
         <view style="width: 100%;position: relative;margin-top: -10rpx;">
           <image :src="img2" style="width: 49rpx;height: 36rpx;position: absolute;top: 46rpx;left: 30rpx;z-index: 2;"></image>
           <view style="width: 100%;height: 134rpx;">
             <van-cell-group>
               <van-field
               :value="value1"
               center
               clearable
               :border="border"
               placeholder="请输入短信验证码"
               input-class="input-class1">
             </van-field>
             </van-cell-group>
           </view>
         </view>
         <view style="width: 100%;text-align: center;margin-top: 40rpx;">
           <van-button type="primary" custom-class="custom-class-button">绑定</van-button>
         </view>
       </view>
     </view>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      isShow:true,
      isShow1:false,
      value:"",
      value1:"",
      border:false,
      img1:this.url+'/upload/static/img/youke_home/img_binding1.png',
      img2:this.url+'/upload/static/img/youke_home/img_binding2.png',
    }
  },
  methods: {
    onchange(){
      this.isShow=false;
      this.isShow1=true;
    }
  },
}
</script>

<style >
  .input-class1{
    height:84rpx !important;
    line-height:134rpx !important;
    margin-left: 68rpx !important;
  }
  .custom-class-btn{
    background-color: #27cd6d !important;
    border-radius: 10rpx !important;
  }
  .custom-class-button{
    width: 600rpx !important;
    height: 70rpx !important;
    line-height: 68rpx !important;
    background-image: linear-gradient(90deg, #4e94e3 0%, #2578d5 100%), linear-gradient(#ffffff, #ffffff) !important;
    border-radius: 35rpx !important;
    border: none !important;
    /*font-size: 36rpx !important;*/
  }
</style>
