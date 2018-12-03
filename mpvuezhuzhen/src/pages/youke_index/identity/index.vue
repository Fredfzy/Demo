<template>
  <!--实名制验证-->
  <div  id="xiaofeizhe-container" class="container">
     <view style="width: 100%;border-top:1rpx solid #dcdcdc;">
       <view  style="width: 100%;padding-left: 36rpx;padding-right: 36rpx;box-sizing: border-box;">
         <view style="width: 100%;position: relative">
           <view style="width: 100%;height: 134rpx;">
             <van-cell-group>
               <van-field
                 :value="value"
                 center
                 clearable
                 label="用 户"
                 placeholder="请输入用户名"
                 :border="border"
                 input-class="input-class1">
               </van-field>
             </van-cell-group>
           </view>
         </view>
         <view style="width: 100%;position: relative;margin-top: -10rpx;">
           <view style="width: 100%;height: 134rpx;">
             <van-cell-group>
               <van-field
               :value="value1"
               center
               clearable
               label="身份证"
               :border="border"
               placeholder="请输入身份证号码"
               input-class="input-class1">
             </van-field>
             </van-cell-group>
           </view>
         </view>
         <view style="width: 100%;text-align: center;margin-top: 40rpx;">
           <van-button type="primary" custom-class="custom-class-button">确定绑定</van-button>
         </view>
       </view>
     </view>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      value:"",
      value1:"",
      border:false,
    }
  },
  methods: {

  },
}
</script>

<style >
  .input-class1{
    height:84rpx !important;
    line-height:134rpx !important;
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
