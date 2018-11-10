<template>
  <div id="longtouqiyedetail2">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">养殖业设施示范点——润麒猪场</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">南京润麒农业科技有限公司位于南京市六合区竹镇镇乌山村瓦谢组，公司主要业务范围涉及：生猪养殖，农业项目开发、旅游项目开发，...</span>
          <el-button type="primary" class="sucai-title-btn" @click="openModel('dialogVisible1')">预警设置</el-button>
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
              <el-row :gutter="12">
                <el-col :span="8">
                  <div class="dz-left1-switch">
                    <p>
                      风机
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value1"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-left1-switch">
                    <p>
                      天窗
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value2"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-left1-switch">
                    <p>
                      湿帘
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value3"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dz-content1">
              <el-row :gutter="8">
                <el-col :span="6">
                  <div class="dz-info1">
                    <echarts126></echarts126>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="dz-info1">
                    <echarts125></echarts125>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="dz-right1">
                    <echarts124></echarts124>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="dz-right1">
                    <p>
                      <span>猪场关键节点信息</span>
                      <span>全部</span>
                    </p>
                    <div class="dz-right-img"></div>
                    <div class="dz-right-info">
                      <ul>
                        <li>打疫苗，xxx疫苗...  9月15日 </li>
                        <li>喂饲料，xxx饲料...  9月18日 </li>
                        <li>处理有机肥...           9月20日 </li>
                      </ul>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="预警设置"
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
      name: "longtouqiyedetail2",
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
            '/static/img1/zhuchang-img.png',
            '/static/img1/img1.png',
            '/static/img1/img2.png',
            '/static/img1/img3.png',
          ],
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
 #longtouqiyedetail2  .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
 #longtouqiyedetail2 .longtou-detail-title{
    margin-left: 10px;
  }
 #longtouqiyedetail2 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
 #longtouqiyedetail2 .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
 #longtouqiyedetail2 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
 #longtouqiyedetail2 .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/zhuchang-img.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
    border: 1px solid #49a3ff;
  }
 #longtouqiyedetail2 .dz-left1{
    width: 100%;
    height: 200px;
  }
 #longtouqiyedetail2 .dz-left1-switch{
    width: 100%;
    height:188px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
  }
 #longtouqiyedetail2 .dz-left1-switch p{
    font-size: 24px;
    line-height: 52px;
    color: #afdeff;
    padding-top: 30px;
    padding-left: 45px;
  }
 #longtouqiyedetail2 .dz-left1-switch .dz-left1-myswitch{
    float: right;
    margin-right: 55px;
    margin-top: 10px;
    display: inline-block;
    line-height: 52px;
  }
 #longtouqiyedetail2 .dz-left1 .dz-left1-btn{
    width: 100%;
    height: 52px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    color: #afdeff;
    font-size: 24px;
  }
  /*.dz-left1-switch .el-switch .el-switch__core{*/
  /*width: 76px !important;*/
  /*height: 34px !important;*/
  /*}*/

 #longtouqiyedetail2 .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
   cursor: pointer;
  }
 #longtouqiyedetail2 .dz-info:hover{
   background-color: #091e35;
 }
 #longtouqiyedetail2 .dz-info p{
    text-align: center;
  }
 #longtouqiyedetail2 .dz-info p:first-child{
    line-height: 80px;
  }
 #longtouqiyedetail2 .dz-info p:last-child{
    line-height: 90px;
  }
 #longtouqiyedetail2 .dz-info1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }


 #longtouqiyedetail2 .dz-right{
    width: 100%;
    height: 190px;
  }
 #longtouqiyedetail2 .dz-right ul li{
    height:  190px
  }
 #longtouqiyedetail2 .img1{
    width: 100%;
    height: 100%;
  }
 #longtouqiyedetail2 .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
 #longtouqiyedetail2 .dz-right1 p{
    font-size: 14px;
    color: #6094b9;
    line-height: 40px;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
  }
 #longtouqiyedetail2 .dz-right1 p span:first-child{
    font-size: 16px;
    color:#c5e7ff;
    line-height: 40px;
  }
 #longtouqiyedetail2 .dz-right1 p span:last-child{
    float: right;
  }
 #longtouqiyedetail2 .dz-right-img{
    width: 158px;
    height: 110px;
    background: url("/static/img1/dazhanhuangyuli2.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-left: 20px;
    margin-bottom: 10px;
  }
 #longtouqiyedetail2 .dz-right-info{
    font-size: 14px;
    color: #6094b9;
    line-height: 30px;
    float: left;
    margin-left: 20px;
  }
 #longtouqiyedetail2 .el-row{
    margin: 0 !important;
  }

  #longtouqiyedetail2 .my-model1 .el-dialog{
    width: 550px;
    /*height: 279px;*/
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail2 .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail2 .my-model1 .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail2 .my-model1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail2 .my-model1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail2 .my-model1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail2 .my-model1.my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail2 .my-model1 .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail2 .my-model1 span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetail2 .my-model1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail2 .my-model1 .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail2 .my-model1 .my-model-btn {
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>
