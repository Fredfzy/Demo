<template>
  <div id="longtouqiyedetail3">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">智能大棚</span>
          <el-button type="primary" class="sucai-title-btn sucai-title-btn1" @click="openModel('dialogVisible1')">预警设置</el-button>
        </p>
        <div class="zhihuidapeng-tab">
          <ul>
            <li :class="{zhihuidapengTabBtn:index==zhihuidapengTabBtnStyle}" v-for="(item,index) in zhinengdapengList" @click="zhchange(index)">
             {{item.name}}
            </li>
          </ul>
        </div>
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
                    <p style="font-size: 20px;color: #ffffff;">{{zhinengdapengModel.airtem}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气湿度</p>
                    <p style="font-size: 20px;color: #fd0000;">{{zhinengdapengModel.airdam}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-50%</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">光照强度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{zhinengdapengModel.illumint}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：200-1500</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">CO2浓度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{zhinengdapengModel.co2con}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：0-500PPM</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤温度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{zhinengdapengModel.soiltem}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤湿度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{zhinengdapengModel.airdam}}</p>
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
      name: "longtouqiyedetail",
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
            '/static/img1/zhdp/zndp.png',
            '/static/img1/zhdp/zndp1.png',
            '/static/img1/zhdp/zndp2.png',
            '/static/img1/zhdp/zndp3.png',
          ],
          mark:0,
          zhinengdapengModel:{airtem:'24℃',airdam:'47.7%',illumint:'2510LUX',co2con:'350PPM',soiltem:'16℃',soildam:'71.7%'},
          zhinengdapengList:[
            {name:"一号大棚",airtem:'24℃',airdam:'47.7%',illumint:'2510LUX',co2con:'350PPM',soiltem:'16℃',soildam:'71.7%'},
            {name:"二号大棚",airtem:'25℃',airdam:'42.7%',illumint:'2500LUX',co2con:'356PPM',soiltem:'15℃',soildam:'70.7%'},
            {name:"三号大棚",airtem:'23℃',airdam:'48.7%',illumint:'2505LUX',co2con:'354PPM',soiltem:'17℃',soildam:'72.7%'},
            {name:"四号大棚",airtem:'26℃',airdam:'45.7%',illumint:'2509LUX',co2con:'355PPM',soiltem:'18℃',soildam:'71.7%'},
            {name:"五号大棚",airtem:'22℃',airdam:'44.7%',illumint:'2501LUX',co2con:'352PPM',soiltem:'15℃',soildam:'72.7%'},
            {name:"六号大棚",airtem:'24℃',airdam:'43.7%',illumint:'2502LUX',co2con:'353PPM',soiltem:'16℃',soildam:'73.7%'},
            {name:"七号大棚",airtem:'21℃',airdam:'46.7%',illumint:'2503LUX',co2con:'351PPM',soiltem:'14℃',soildam:'74.7%'},
          ],
          zhihuidapengTabairtem:'24℃',airdam:'47.7%',illumint:'2500LUX',co2con:'354PPM',soiltem:'15℃',soildam:'72.7%'
        }
      },
      methods: {
        openModel(key){
          if(key=='dialogVisible1'){
            this.dialogVisible1=true;
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
        },
        //切换不同大棚的样式和数据
        zhchange(index){
          this.zhihuidapengTabBtnStyle=index;
          this.zhinengdapengModel=this.zhinengdapengList[index];
        }
      }
    }
</script>

<style>
  #longtouqiyedetail3 .longtou-detail{
   width: 100%;
   height: 100%;
   background-color:#020b15 ;
   background-size: 100% 100%;
 }
  #longtouqiyedetail3 .longtou-detail-title{
   margin-top: 5px;
  }
  #longtouqiyedetail3 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
  #longtouqiyedetail3 .sucai-title-btn1{
   background-color: #041526;
   color: #91b9d6;
   /*border: solid 1px #3d5268;*/
 }
  #longtouqiyedetail3 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  #longtouqiyedetail3 .dz-left{
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

  #longtouqiyedetail3 .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
    cursor: pointer;
  }
  #longtouqiyedetail3 .dz-info:hover{
    background-color: #091e35;
  }
  #longtouqiyedetail3 .dz-info p{
   text-align: center;
 }
  #longtouqiyedetail3 .dz-info p:first-child{
   line-height: 80px;
 }
  #longtouqiyedetail3 .dz-info p:last-child{
   line-height: 90px;
 }
  #longtouqiyedetail3 .dz-info1{
   width: 100%;
   height: 280px;
   background: url("/static/img1/home-data.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: -80px;
 }
  #longtouqiyedetail3 .dz-right{
   width: 100%;
   height: 190px;
 }
  #longtouqiyedetail3 .dz-right ul li{
   height:  190px
 }
  #longtouqiyedetail3 .img1{
   width: 100%;
   height: 100%;
 }
  #longtouqiyedetail3 .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  .el-row{
    margin: 0 !important;
 }

  #longtouqiyedetail3 .dz-left1{
   width: 100%;
   height: 200px;
   background-color: #041426;
   border: solid 1px #3d5268;
   border-bottom: none;
 }
  #longtouqiyedetail3 .dz-left1 table{
   width: 100%;
   text-align: center;
   border-collapse:collapse;
 }
  #longtouqiyedetail3 .dz-left1 table tr th{
   flex: 1;
   height: 55px;
   line-height: 55px;
   border-bottom: 1px solid #54789f;
   color: #78bae8;
   font-size: 18px;
 }
  #longtouqiyedetail3 .dz-left1 table tr th:nth-child(6){
   flex: 0 0 18%;
 }
  #longtouqiyedetail3 .dz-left1 table tr th:nth-child(7){
   flex: 0 0 18%;
 }
  #longtouqiyedetail3 .dz-left1 table tr{
   display: flex;
 }
  #longtouqiyedetail3 .dz-left1 table tr td{
   flex: 1;
   height: 48px;
   line-height: 48px;
   color: #6094b9;
   font-size: 14px;
   border-bottom: 1px solid #54789f;
 }
  #longtouqiyedetail3 #longtouqiyedetail3 .my-model .el-dialog{
    width: 482px;
    height: 279px;
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail3 #longtouqiyedetail3 .my-model .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail3 .my-model1 .el-dialog{
    width: 550px;
    /*height: 279px;*/
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail3 .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail3 .my-model1 .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail3 .my-model1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail3 .my-model1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail3 .my-model1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail3 .my-model1.my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail3 .my-model1 .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail3 .my-model1 span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetail3 .my-model1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail3 .my-model1 .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail3 .my-model1 .my-model-btn {
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .zhihuidapeng-tab {
    position: absolute;
    top:96px;
    left: 152px;
    font-size: 18px;
    color: #f9f9f9;
    line-height: 36px;
    text-align: center;
  }
  .zhihuidapeng-tab ul li{
    width: 110px;
    height: 36px;
    background: url("/static/img1/K-one.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: 10px;
    float: left;
    cursor: pointer;
  }
  .zhihuidapeng-tab .zhihuidapengTabBtn{
    width: 110px;
    height: 36px;
    background: url("/static/img1/K-two.png") no-repeat center center;
    background-size: 100% 100%;
  }
</style>
