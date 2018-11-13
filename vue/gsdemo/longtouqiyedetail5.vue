<template>
  <div id="longtouqiyedetail5">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">兴泉红薯</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">兴泉农产品专业合作社成立于2007年3月，是大泉村依托南京绿色大泉农业发展有限公司成立起来的农民合作社，首批吸纳社员28户。</span>
          <span style="color: #e6ee00;font-size: 16px; line-height: 30px">倒计时：15天0小时</span>
          <el-button type="primary" class="sucai-title-btn sucai-title-btn1" @click="openModel('dialogVisible1')">收获季推送</el-button>
        </p>
      </div>
      <div class="longtou-detail-content">
        <el-row :gutter="12">
          <el-col :span="6"><div class="dz-left"></div></el-col>
          <el-col :span="14">
            <div class="dz-content">
              <el-row :gutter="12" >
                <div class="content1">
                  <p>生产管理推送 <span>全部</span></p>
                </div>
              </el-row>
              <el-row :gutter="12">
                <div class="content2">
                  <div style="float: left;padding:4px ">
                    <div class=" content3">
                      <img src="/static/img1/xqhs/pic-tw.png" alt="">
                    </div>
                    <div class=" content3">
                      <img src="/static/img1/xqhs/pic-thr.png" alt="">
                    </div>
                    <div class=" content3">
                      <img src="/static/img1/xqhs/pic-four.png" alt="">
                    </div>
                  </div>
                  <ul class="content4" style="width:400px;height: 200px;float: right;margin-top: 20px">
                    <li>2月中旬开始建火炕或电热温床，当床温升至35℃时，开始排种。</li>
                    <li>选择背风向阳，土壤肥沃，水浇条件好，无病虫害的地块建立太阳
                      能温棚。
                    </li>
                    <li>
                      3月份可将加温苗床上剪下的叶节苗在双膜塑料大棚内扦插快繁。
                    </li>
                  </ul>
                </div>
              </el-row>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="dz-right" style="position: relative">
              <ul style="float:left">
                <li v-for="(img,index) in imglist" v-show="index===mark" :key="index">
                  <a href="#"><img  class="img1" :src="img" alt=""></a>
                </li>
              </ul>
              <img style="position: absolute;right: 0" src="/static/img1/xqhs/jiantou.png" @click="autoPlay" alt="">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="6">
            <div class="dz-left1">
              <div class="dz-info">
                <p style="font-size: 24px;color: #afdeff;">土壤温度</p>
                <p style="font-size: 30px;color: #fff">14℃</p>
              </div>
              <div class="dz-info" style="margin-left:5px ">
                <p style="font-size: 24px;color: #afdeff;">土壤湿度</p>
                <p style="font-size: 30px;color: #fff;">28%</p>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dz-content1">
              <el-row :gutter="8">
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts132></echarts132>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts131></echarts131>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-right1">
                    <echarts130></echarts130>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="花期推送"
        :visible.sync="dialogVisible1"
        width="550"
        class="my-model1">
        <div class="my-model-content">
          <span class="my-span">推送标题:</span>
          <el-input
            placeholder="请输入"
            v-model="input5"
            class="my-input">
          </el-input>
        </div>
        <div class="my-model-content">
          <span class="my-span">品种选择:</span>
          <el-select
            placeholder="请选择"
            v-model="input7"
            class="my-input">
            <el-option
              v-for="item in variety"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="my-model-content">
          <span class="my-span">预计时间:</span>
          <el-input
            placeholder="请输入"
            v-model="input9"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input10"
            class="my-input1">
          </el-input>
          <span> PPM</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">推送内容:</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            v-model="input11"
            class="my-input">
          </el-input>
        </div>
        <div class="my-model-content">
          <span class="my-span" style="margin-right:15px ">准确率:</span>
          <el-input
            placeholder="请输入"
            v-model="input13"
            style="margin-left:10px "
            class="my-input">
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false" class="my-model-btn">提交</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import echarts130 from '@/components/zuzengData/zuzengEcharts/xqhsEcharts/echarts130'
  import echarts131 from '@/components/zuzengData/zuzengEcharts/xqhsEcharts/echarts131'
  import echarts132 from '@/components/zuzengData/zuzengEcharts/xqhsEcharts/echarts132'
  export default {
    name: "longtouqiyedetail5",
    components:{
      echarts130,echarts131,echarts132
    },
    data(){
      return{
        dialogVisible1: false,
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        input11: '',
        input12: '',
        input13: '',
        input14: '',
        input15: '',
        input16: '',
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        imglist:[
          '/static/img1/xqhs/pic-one.png',
          '/static/img1/lyhzs/pic-one.png',
          '/static/img1/sanchanronghe/pic-one.png',
          '/static/img1/fcjt/pic-one.png'],
        mark:0
      }
    },
    methods: {
      openModel(key){
        if(key=='dialogVisible1'){
          this.dialogVisible1=true;
        }
      },
      // 关闭model框
      closeModel(key){
        if(key =='dialogVisible1'){
          this.dialogVisible1=false;
        }
      },
      handleClose(key){
        if(key =='dialogVisible1'){
          this.dialogVisible1=false;
        }
      },
      autoPlay () {
        this.mark++;
        if (this.mark === 4) { //当遍历到最后一张图片置零
          this.mark = 0
        }
      },
      change (i) {
        this.mark = i
      }
    }
  }
</script>

<style >
 #longtouqiyedetail5 .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
 #longtouqiyedetail5 .longtou-detail-title{
   margin-left: 14px;

  }
 #longtouqiyedetail5 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
 #longtouqiyedetail5 .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
 #longtouqiyedetail5 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
 #longtouqiyedetail5 .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/xqhs/pic-one.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
    /*border: 1px solid #49a3ff;*/
  }

  /*.dz-left1-switch .el-switch .el-switch__core{*/
  /*width: 76px !important;*/
  /*height: 34px !important;*/
  /*}*/
 #longtouqiyedetail5 .dz-content{
    width: 100%;
    height: 199px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
  }
 #longtouqiyedetail5 .content1{
    width: 100%;
    border-bottom: 1px solid  #222d39;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
 #longtouqiyedetail5 .content1>p{
    font-family: FZLTZHUNHK--GBK1-0;
    font-size: 18px;
    color: #6094b9;

  }
 #longtouqiyedetail5 .content1>p>span{
    font-size: 16px;
    color: #497da1;
    margin-left: 900px;
  }

 #longtouqiyedetail5 .content3{
    margin-top: 20px;
    margin-left:3px ;
    width: 168px;
    height: 110px;
    float: left;
  }
 #longtouqiyedetail5 .content3>img{
    width: 100%;
    line-height: 100%;
  }
 #longtouqiyedetail5 .content4{
    font-family: FZLTZHK--GBK1-0;
    font-size: 14px;
    color: #6094b9;
    margin-left: px;

  }
 #longtouqiyedetail5 .content4>ul{

  }
 #longtouqiyedetail5 .dz-info:hover{
   background-color: #091e35;
 }
 #longtouqiyedetail5 .dz-info{
    /*width: 124px;*/
    width: 49%;
    height: 200px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
    float: left;
  }
 #longtouqiyedetail5 .dz-info p{
    text-align: center;
  }
 #longtouqiyedetail5 .dz-info p:first-child{
    line-height: 80px;
  }
 #longtouqiyedetail5 .dz-info p:last-child{
    line-height: 90px;
  }
 #longtouqiyedetail5 .dz-info1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }

 #longtouqiyedetail5 .dz-right{
    width: 100%;
    height: 200px;
  }
 #longtouqiyedetail5 .dz-right ul li{
   height:  200px
  }
 #longtouqiyedetail5 .img1{
    width: 100%;
    height: 100%;
  }
 #longtouqiyedetail5 .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  .el-row{
    margin: 0 !important;
  }

 #longtouqiyedetail5 .dz-left1{
    width: 100%;
    height: 200px;
    background-color: #041426;
    /*border: solid 1px #3d5268;*/
    border-bottom: none;
  }
 #longtouqiyedetail5 .dz-left1 table{
    width: 100%;
    text-align: center;
    border-collapse:collapse;
  }
 #longtouqiyedetail5 .dz-left1 table tr th{
    flex: 1;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #54789f;
    color: #78bae8;
    font-size: 18px;
  }
 #longtouqiyedetail5 .dz-left1 table tr th:nth-child(6){
    flex: 0 0 18%;
  }
 #longtouqiyedetail5 .dz-left1 table tr th:nth-child(7){
    flex: 0 0 18%;
  }
 #longtouqiyedetail5 .dz-left1 table tr{
    display: flex;
  }
 #longtouqiyedetail5 .dz-left1 table tr td{
    flex: 1;
    height: 48px;
    line-height: 48px;
    color: #6094b9;
    font-size: 14px;
    border-bottom: 1px solid #54789f;
  }
 #longtouqiyedetail5 .my-model .el-dialog{
   width: 482px;
   height: 279px;
   background-color: #041624;
   border-radius: 5px;
   border: solid 2px rgba(69, 150, 236, 0.76);
 }
 #longtouqiyedetail5 .my-model .el-dialog .el-dialog__header,.el-dialog__title{
   background: #041624;
   color: #aee2ff;
 }
 #longtouqiyedetail5 .my-model .el-dialog .el-dialog__title{
   font-size: 18px;
   margin-left: 20px;
 }
 #longtouqiyedetail5 .my-model-content{
   margin-bottom: 20px;
 }
 #longtouqiyedetail5 .my-input {
   width: 383px;
   height: 42px;
   opacity: 0.51;
 }
 #longtouqiyedetail5 .el-textarea__inner {
   background-color: #041624 !important;
   border: solid 1px #4982aa;
 }
 #longtouqiyedetail5 .my-input .el-input__inner{
   height: 42px;
   background-color: #041624 !important;
   border-radius: 3px;
   border: solid 1px #4982aa;
   font-size: 14px;
 }
 #longtouqiyedetail5 .my-input1 {
   width: 181px;
   height: 42px;
   opacity: 0.51;
 }
 #longtouqiyedetail5 .my-input1 .el-input__inner{
   height: 42px;
   background-color: #041624 !important;
   border-radius: 3px;
   border: solid 1px #4982aa;
   font-size: 14px;
 }
 #longtouqiyedetail5 .my-input1 .el-input__suffix{
   color: #aee2ff;
 }
 #longtouqiyedetail5 .my-model .my-span{
   font-size: 16px;
   line-height: 34px;
   color: #74c6ff;
   margin-right:10px;
 }
 #longtouqiyedetail5 .my-model span:nth-child(3){
   color: #0096cf;
 }
 .el-dialog__body{
   padding-bottom: 10px;
 }
 #longtouqiyedetail5 .my-model .el-dialog__footer{
   text-align: center;
 }
 #longtouqiyedetail5 .my-model-btn{
   width: 134px;
   height: 36px;
   background-color: #0096cf;
   border-radius: 4px;
   margin-bottom: 10px;
 }

 #longtouqiyedetail5 .my-model1 .el-dialog{
   width: 550px;
   /*height: 279px;*/
   background-color: #041624;
   border-radius: 5px;
   border: solid 2px rgba(69, 150, 236, 0.76);
 }
 #longtouqiyedetail5 .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
   background: #041624;
   color: #aee2ff;
 }
 #longtouqiyedetail5 .my-model1 .el-dialog .el-dialog__title{
   font-size: 18px;
   margin-left: 20px;
 }
 #longtouqiyedetail5 .my-model1 .my-model-content{
   margin-bottom: 20px;
 }
 #longtouqiyedetail5 .my-model1 .my-input1 {
   width: 181px;
   height: 42px;
   opacity: 0.51;
 }
 #longtouqiyedetail5 .my-model1 .my-input1 .el-input__inner{
   height: 42px;
   background-color: #041624 !important;
   border-radius: 3px;
   border: solid 1px #4982aa;
   font-size: 14px;
 }
 #longtouqiyedetail5 .my-model1.my-input1 .el-input__suffix{
   color: #aee2ff;
 }
 #longtouqiyedetail5 .my-model1 .my-span{
   font-size: 16px;
   line-height: 34px;
   color: #74c6ff;
   margin-right:10px;
 }
 #longtouqiyedetail5 .my-model1 span:nth-child(3){
   color: #0096cf;
 }
 #longtouqiyedetail5 .my-model1 .el-dialog__body{
   padding-bottom: 10px;
 }
 #longtouqiyedetail5 .my-model1 .el-dialog__footer{
   text-align: center;
 }
 #longtouqiyedetail5 .my-model1 .my-model-btn {
   width: 134px;
   height: 36px;
   background-color: #0096cf;
   border-radius: 4px;
   margin-bottom: 10px;
 }
</style>
