<template>
  <div id="longtouqiyedetailf">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">经济林果示范点——大展黄玉梨</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">江苏大展农业开发有限公司以生态高效有机农业、循环农业开发为定位，以种植国内梨果高端产品——黄玉梨为主要产品，充分利用金磁村空气质量优良、光照、...</span>
        </p>
      </div>
      <div class="longtou-detail-content">
        <el-row :gutter="12">
          <el-col :span="7"><div class="dz-left"></div></el-col>
          <el-col :span="12">
            <div class="dz-content">
              <el-row :gutter="8">
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气温度</p>
                    <p style="font-size: 20px;color: #ffffff;">24℃</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气湿度</p>
                    <p style="font-size: 20px;color: #ffffff;">47.7%</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">光照强度</p>
                    <p style="font-size: 20px;color: #ffffff;">22500LUX</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">风速</p>
                    <p style="font-size: 20px;color: #ffffff;">4级</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">风向</p>
                    <p style="font-size: 20px;color: #ffffff;">东南</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">降雨量</p>
                    <p style="font-size: 20px;color: #ffffff;">0</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">大气压</p>
                    <p style="font-size: 20px;color: #ffffff;">0.4kpa</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤湿度</p>
                    <p style="font-size: 20px;color: #ffffff;">67.7%</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="dz-right">
              <p>
                <span>溯源关键节点信息</span>
                <span>全部</span>
              </p>
              <div class="dz-right-img"></div>
              <div class="dz-right-info">
                <ul>
                  <li>喷洒农药,100亩,xxx农药... </li>
                  <li>喷洒农药,100亩,xxx农药... </li>
                  <li>喷洒农药,100亩,xxx农药... </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="7"><div class="dz-left1">
            <table>
              <tr>
                <td>
                  <p>
                    <span>倒计时：</span>
                    <span>4天12小时56分钟</span>
                  </p>
                  <el-button type="primary dz-left1-btn" @click="openModel('dialogVisible1')">收获季推送</el-button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="swiper-container">
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-wrapper" >
                      <div class="swiper-slide"><img src="/static/img1/hyl/dazhanhuangyuli1.png" alt=""></div>
                      <div class="swiper-slide"><img src="/static/img1/hyl/dazhanhuangyuli2.png" alt=""></div>
                      <div class="swiper-slide"><img src="/static/img1/hyl/dazhanhuangyuli3.png" alt=""></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div></el-col>
          <el-col :span="17">
            <div class="dz-content1">
              <el-row :gutter="8">
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts123></echarts123>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts122></echarts122>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-right1">
                    <echarts121></echarts121>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="收获季推送"
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
  import echarts121 from '@/components/zuzengData/zuzengEcharts/hylEcharts/echarts121'
  import echarts122 from '@/components/zuzengData/zuzengEcharts/hylEcharts/echarts122'
  import echarts123 from '@/components/zuzengData/zuzengEcharts/hylEcharts/echarts123'
  import Swiper from 'swiper'
    export default {
      name: "longtouqiyedetail",
      components:{
        echarts121,echarts122,echarts123
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
            "/static/img1/xiantaoguoziwang-img.png",
            "/static/img1/xiantaoguoziwang-img2.png",
            "/static/img1/xiantaoguoziwang-img3.png"
          ],
          variety: [{
            value: '品种1',
            label: '果子王鲜桃'
          }, {
            value: '品种2',
            label: '竹镇冬桃'
          }, {
            value: '品种3',
            label: '枫树'
          }],
        }
      },
      methods:{
        // 打开model框
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
      },
      created:function () {
        this.$nextTick(function() {
          var swiper = new Swiper({
            el: '.swiper-container',
            initialSlide: 0,//参数，设置默认的active索引 设置为0即是slider1
            spaceBetween: 10,//slider之间的距离
            slidesPerView: 2.5,//设置容器同事能够显示slides的数量
            centeredSlides: false,//设定为true时，active slide会居中，而不是默认状态下的居左。
            slideToClickedSlide: true,//设置为true则点击slide会过渡到这个slide
            grabCursor: true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
            scrollbar: {
              el: '.swiper-scrollbar',//为Swiper增加滚动条  el是dom上的节点名
            },
            mousewheel: {
              enabled: true,//开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
            },
            keyboard: {
              enabled: true,//是否开启键盘控制Swiper切换。设置为true时，能使用键盘的方向键控制slide切换。
            },
            pagination: {
              el: '.swiper-pagination',//是否设置分页原点默认为true el里是相关节点
            },
            navigation: {//使用前进后退切换按钮
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        })
      }
    }
</script>

<style>
  #longtouqiyedetailf .longtou-detail{
   width: 100%;
   height: 100%;
   background-color:#020b15 ;
   background-size: 100% 100%;
 }
  #longtouqiyedetailf .longtou-detail-title{
    margin-left: 10px;
  }
  #longtouqiyedetailf .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  #longtouqiyedetailf .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/dazhanhuangyuli1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
  }
  #longtouqiyedetailf .dz-left1{
    width: 100%;
    height: 200px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
  }
  #longtouqiyedetailf .dz-left1 table{
   width: 100%;
 }
  #longtouqiyedetailf .dz-left1 table tr:first-child td{
   width: 100%;
   border-bottom: 1px solid #3d5268;
 }
  #longtouqiyedetailf .dz-left1 table p{
   display: inline-block;
   padding-left: 10px;
   color: #c5e7ff;
   font-size: 16px;
   line-height: 38px;
 }
  #longtouqiyedetailf .dz-left1 table p span:last-child{
   color: #e6ee00;
 }
  #longtouqiyedetailf .dz-left1-btn{
   float: right;
   height: 30px;
   background-color: #0096cf;
   border-radius: 4px;
   margin-top: 2px;
   margin-right: 4px;
   line-height: 0;
 }
  #longtouqiyedetailf .dz-left1-img1{
   width: 196px;
   height: 130px;
   background: url("/static/img1/dazhanhuangyuli3.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: 10px;
   margin-left: 10px;
   float: left;
 }
  #longtouqiyedetailf .dz-left1-img2{
   width: 196px;
   height: 130px;
   background: url("/static/img1/dazhanhuangyuli4.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: 10px;
   margin-left: 10px;
   float: left;
 }
  #longtouqiyedetailf .swiper-container {
   width: 500px;
   height: 130px;
   margin:10px;
   overflow: hidden;
 }
  #longtouqiyedetailf .swiper-slide {
   width: 139px;
   background: #f1f1f1;
   color:#000;
   text-align: center;
   line-height: 130px;
 }
  #longtouqiyedetailf .swiper-slide img{
   width: 100%;
   height: 100%;
 }
  .swiper-button-prev,.swiper-button-next{
    top:61%;
    height: 20px;
    width: 27px;
    right: 0;
  }
  .swiper-button-prev{
    left:0;
  }

  #longtouqiyedetailf .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
    cursor: pointer;
  }
  #longtouqiyedetailf .dz-info:hover{
    background-color: #091e35;
  }
  #longtouqiyedetailf .dz-info p{
   text-align: center;
 }
  #longtouqiyedetailf .dz-info p:first-child{
   line-height: 108px;
 }
  #longtouqiyedetailf .dz-info1{
   width: 100%;
   height: 280px;
   background: url("/static/img1/home-data.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: -80px;
 }

  #longtouqiyedetailf .dz-right{
    width: 100%;
    height: 190px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
  }
  #longtouqiyedetailf .dz-right p{
    font-size: 14px;
    color: #6094b9;
    line-height: 40px;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
  }
  #longtouqiyedetailf .dz-right p span:first-child{
   font-size: 16px;
   color:#c5e7ff;
   line-height: 40px;
 }
  #longtouqiyedetailf .dz-right p span:last-child{
   float: right;
 }
  #longtouqiyedetailf .dz-right-img{
    width: 158px;
    height: 110px;
    background: url("/static/img1/dazhanhuangyuli2.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-left: 20px;
  }
  #longtouqiyedetailf .dz-right-info{
    font-size: 14px;
    color: #6094b9;
    line-height: 30px;
    float: left;
    margin-left: 30px;
  }
  #longtouqiyedetailf .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  #longtouqiyedetailf .el-row{
    margin: 0 !important;
 }
  #longtouqiyedetailf .my-model .el-dialog{
    width: 482px;
    height: 279px;
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetailf .my-model .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetailf .my-model .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetailf .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetailf .my-input {
    width: 383px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetailf .my-input .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetailf .el-textarea__inner {
    background-color: #041624 !important;
    border: solid 1px #4982aa;
  }
  #longtouqiyedetailf .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetailf .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetailf .my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetailf .my-model .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetailf .my-model span:nth-child(3){
    color: #0096cf;
  }
  .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetailf .my-model .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetailf .my-model-btn{
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  #longtouqiyedetailf .my-model1 .el-dialog{
    width: 550px;
    /*height: 279px;*/
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetailf .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetailf .my-model1 .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetailf .my-model1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetailf .my-model1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetailf .my-model1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetailf .my-model1.my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetailf .my-model1 .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetailf .my-model1 span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetailf .my-model1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetailf .my-model1 .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetailf .my-model1 .my-model-btn {
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>
