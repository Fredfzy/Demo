<template>
  <div id="longtouqiyedetail10">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">农牧循环示范点——农科院</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">江苏省农业科学院六合动物科学基地循环农业已自成体系，作为竹镇产业园区和农业的科普基地，并在中央平台推介，形成农牧循环推介亮点。</span>
          <el-button type="primary" class="sucai-title-btn sucai-title-btn1" @click="openModel('dialogVisible1')">预警设置</el-button>
        </p>
      </div>
      <div class="longtou-detail-content">
        <el-row :gutter="12">
          <el-col :span="6"><div class="dz-left"></div></el-col>
          <el-col :span="14">
            <div class="dz-content">
              <el-row :gutter="8">
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气温度</p>
                    <p style="font-size: 20px;color: #ffffff;">24℃</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气湿度</p>
                    <p style="font-size: 20px;color: #fd0000;">47.7%</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-50%</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">光照强度</p>
                    <p style="font-size: 20px;color: #ffffff;">2500LUX</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：200-1500</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">CO2浓度</p>
                    <p style="font-size: 20px;color: #ffffff;">354PPM</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：0-500PPM</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤温度</p>
                    <p style="font-size: 20px;color: #ffffff;">15℃</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤湿度</p>
                    <p style="font-size: 20px;color: #ffffff;">72.7%</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-50%</p>
                  </div>
                </el-col>
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
              <table>
                <tr>
                  <th>编号</th>
                  <th>ID</th>
                  <th>传感器名称</th>
                  <th>实时数据</th>
                </tr>
                <tr>
                  <td>12</td>
                  <td>JS3310211</td>
                  <td>CO2浓度传感器</td>
                  <td>12:1116.96PPM</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>JS3310211</td>
                  <td>CO2浓度传感器</td>
                  <td>12:1116.96PPM</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>JS3310211</td>
                  <td>CO2浓度传感器</td>
                  <td>12:1116.96PPM</td>
                </tr>
              </table>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dz-content1">
              <el-row :gutter="8">
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts126></echarts126>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts125></echarts125>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-right1">
                    <echarts124></echarts124>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="定时设置"
        :visible.sync="dialogVisible1"
        width="550"
        class="my-model1">
        <div class="my-model-content">
          <span class="my-span">空气温度:</span>
          <el-input
            placeholder="请输入"
            v-model="input5"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input6"
            class="my-input1">
          </el-input>
          <span> ℃</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">空气湿度:</span>
          <el-input
            placeholder="请输入"
            v-model="input7"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input8"
            class="my-input1">
          </el-input>
          <span> %</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">CO2浓度:</span>
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
          <span class="my-span">光照强度:</span>
          <el-input
            placeholder="请输入"
            v-model="input11"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input12"
            class="my-input1">
          </el-input>
          <span> LUX</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">土壤温度:</span>
          <el-input
            placeholder="请输入"
            v-model="input13"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input14"
            class="my-input1">
          </el-input>
          <span> ℃</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">土壤湿度:</span>
          <el-input
            placeholder="请输入"
            v-model="input15"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input16"
            class="my-input1">
          </el-input>
          <span> %</span>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false" class="my-model-btn">提交</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import echarts124 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts124'
  import echarts125 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts125'
  import echarts126 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts126'
    export default {
      name: "longtouqiyedetail10",
      components:{
        echarts124,echarts125,echarts126
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
            '/static/img1/sucaidapeng2.png',
            '/static/img1/sucaidapeng1.png',
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

<style>
  #longtouqiyedetail10 .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
  #longtouqiyedetail10 .longtou-detail-title{
    margin-left: 14px;

  }
  #longtouqiyedetail10 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
  #longtouqiyedetail10 .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
  #longtouqiyedetail10 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  #longtouqiyedetail10 .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/sucaidapeng1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
    border: 1px solid #49a3ff;
  }

  /*.dz-left1-switch .el-switch .el-switch__core{*/
  /*width: 76px !important;*/
  /*height: 34px !important;*/
  /*}*/

  #longtouqiyedetail10 .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
  }
  #longtouqiyedetail10 .dz-info:hover{
    background-color: #091e35;
  }
  #longtouqiyedetail10 .dz-info p{
    text-align: center;
  }
  #longtouqiyedetail10 .dz-info p:first-child{
    line-height: 80px;
  }
  #longtouqiyedetail10 .dz-info p:last-child{
    line-height: 90px;
  }
  #longtouqiyedetail10 .dz-info1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }

  #longtouqiyedetail10 .dz-right{
    width: 100%;
    height: 190px;
  }
  #longtouqiyedetail10 .dz-right ul li{
    height:  190px
  }
  #longtouqiyedetail10 .img1{
    width: 100%;
    height: 100%;
  }
  #longtouqiyedetail10 .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  .el-row{
    margin: 0 !important;
  }

  #longtouqiyedetail10 .dz-left1{
    width: 100%;
    height: 200px;
    background-color: #041426;
    border: solid 1px #3d5268;
    border-bottom: none;
  }
  #longtouqiyedetail10 .dz-left1 table{
    width: 100%;
    text-align: center;
    border-collapse:collapse;
  }
  #longtouqiyedetail10 .dz-left1 table tr th{
    flex: 1;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #54789f;
    color: #78bae8;
    font-size: 18px;
  }
  #longtouqiyedetail10 .dz-left1 table tr th:nth-child(6){
    flex: 0 0 18%;
  }
  #longtouqiyedetail10 .dz-left1 table tr th:nth-child(7){
    flex: 0 0 18%;
  }
  #longtouqiyedetail10 .dz-left1 table tr{
    display: flex;
  }
  #longtouqiyedetail10 .dz-left1 table tr td{
    flex: 1;
    height: 48px;
    line-height: 48px;
    color: #6094b9;
    font-size: 14px;
    border-bottom: 1px solid #54789f;
  }
  #longtouqiyedetail10 .my-model .el-dialog{
    width: 482px;
    height: 279px;
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail10 .my-model .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail10 .my-model .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail10 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail10 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail10 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail10 .my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail10 .my-model .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail10 .my-model span:nth-child(3){
    color: #0096cf;
  }
  .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail10 .my-model .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail10 .my-model-btn{
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  #longtouqiyedetail10 .my-model1 .el-dialog{
    width: 550px;
    /*height: 279px;*/
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail10 .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail10 .my-model1 .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail10 .my-model1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail10 .my-model1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail10 .my-model1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail10 .my-model1.my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail10 .my-model1 .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail10 .my-model1 span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetail10 .my-model1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail10 .my-model1 .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail10 .my-model1 .my-model-btn {
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>
