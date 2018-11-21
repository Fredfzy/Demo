<template>
  <div id="longtouqiyedetail6">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">经济花卉示范点—枫彩集团</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">"枫彩花海是竹镇特色旅游景点，这里风景秀丽，环境优美。枫彩林里更是有万紫千红的海棠花海，不惜胭脂色的海棠花，静静的绽放在蓝天下。"</span>
        </p>
      </div>
      <div class="longtou-detail-content">
        <el-row :gutter="12">
          <el-col :span="6">
            <div class="dz-left">
              <iframe src="../../../static/html/myvideo4.html" style="width: 100%;height: 280px;border: none"></iframe>
            </div>
          </el-col>
          <el-col :span="12">
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
          <el-col :span="6">
            <div class="dz-right">
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
        </el-row>
        <el-row :gutter="12">
          <el-col :span="6">
            <div class="dz-left1">
              <table>
                <tr>
                  <td>
                    <p>
                      <span>花期分析及预测</span>
                    </p>
                    <el-button type="primary dz-left1-btn" @click="openModel('dialogVisible1')">花期推送</el-button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="swiper-container">
                      <div class="swiper-button-prev"></div>
                      <div class="swiper-button-next"></div>
                      <div class="swiper-wrapper" >
                        <div class="swiper-slide"><img src="/static/img1/fcjt/fcjt1.png" alt=""></div>
                        <div class="swiper-slide"><img src="/static/img1/fcjt/fcjt2.png" alt=""></div>
                        <div class="swiper-slide"><img src="/static/img1/fcjt/fcjt3.png" alt=""></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dz-content1">
              <el-row :gutter="8">
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts129></echarts129>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts128></echarts128>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-right1">
                    <echarts127></echarts127>
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
  import echarts127 from '@/components/zuzengData/zuzengEcharts/fcjtEcharts/echarts127'
  import echarts128 from '@/components/zuzengData/zuzengEcharts/fcjtEcharts/echarts128'
  import echarts129 from '@/components/zuzengData/zuzengEcharts/fcjtEcharts/echarts129'
  import Swiper from 'swiper'
  export default {
    name: "longtouqiyedetail6",
    components:{
      echarts127,echarts128,echarts129
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
        imglist:[
          "/static/img1/xiantaoguoziwang-img.png",
          "/static/img1/xiantaoguoziwang-img2.png",
          "/static/img1/xiantaoguoziwang-img3.png"
        ],
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

<style >
  #longtouqiyedetail6 .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
  #longtouqiyedetail6 .longtou-detail-title{
    margin-left: 14px;

  }
  #longtouqiyedetail6 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
  #longtouqiyedetail6 .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
  #longtouqiyedetail6 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  #longtouqiyedetail6 .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    /*background: url("/static/img1/fcjt/fcjt.png") no-repeat center center;*/
    /*background-size: 100% 100%;*/
    margin-bottom: 15px;
    /*border: 1px solid #49a3ff;*/
  }

  /*.dz-left1-switch .el-switch .el-switch__core{*/
  /*width: 76px !important;*/
  /*height: 34px !important;*/
  /*}*/

  #longtouqiyedetail6 .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
  }
  #longtouqiyedetail6 .dz-info:hover{
    background-color: #091e35;
  }
  #longtouqiyedetail6 .dz-info p{
    text-align: center;
  }
  #longtouqiyedetail6 .dz-info p:first-child{
    line-height: 80px;
  }
  #longtouqiyedetail6 .dz-info p:last-child{
    line-height: 90px;
  }
  #longtouqiyedetail6 .dz-info1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  #longtouqiyedetail6 .dz-right{
    width: 100%;
    height: 190px;
    background-size: 100% 100%;
  }
  #longtouqiyedetail6 .dz-right table{
    width: 100%;
    text-align: center;
    border-collapse:collapse;
  }
  #longtouqiyedetail6 .dz-right table tr th{
    flex: 1;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #54789f;
    color: #78bae8;
    font-size: 16px;
  }
  #longtouqiyedetail6 .dz-right table tr th:nth-child(6){
    flex: 0 0 18%;
  }
  #longtouqiyedetail6 .dz-right table tr th:nth-child(7){
    flex: 0 0 18%;
  }
  #longtouqiyedetail6 .dz-right table tr{
    display: flex;
    cursor: pointer;
  }
  #longtouqiyedetail6 .dz-right table tr:hover{
    background-color: #336799;
  }
  #longtouqiyedetail6 .dz-right table tr td{
    flex: 1;
    height: 36px;
    line-height: 36px;
    color: #6094b9;
    font-size: 12px;
    border-bottom: 1px solid #54789f;
  }
  #longtouqiyedetail6 .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }

  .el-row{
    margin: 0 !important;
  }

  #longtouqiyedetail6 .dz-left1{
    width: 100%;
    height: 200px;
    background-color: #030e1a;
    background: url("/static/img1/fcjt/花期分析K.png") no-repeat;
    background-size: 100% 100%;
  }
  #longtouqiyedetail6 .dz-left1 table{
    width: 100%;
  }
  #longtouqiyedetail6 .dz-left1-btn{
    float: right;
    height: 30px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-top: 3px;
    margin-right: 6px;
    line-height: 0;
  }
  #longtouqiyedetail6 .dz-left1 table tr:first-child td{
    width: 100%;
    border-bottom: 1px solid #3d5268;
  }
  #longtouqiyedetail6 .dz-left1 table p{
    display: inline-block;
    padding-left: 10px;
    color: #c5e7ff;
    font-size: 16px;
    line-height: 38px;
  }
  #longtouqiyedetail6 .dz-left1 table p span:last-child{
    color: #c5e7ff;
  }
  #longtouqiyedetail6 .dz-left1-img{
    padding: 6px;
  }
  #longtouqiyedetail6 .dz-left1-img1{
    width: 216px;
    height: 130px;
    background: url("/static/img1/fcjt/pic-tw.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 10px;
    float: left;
  }
  #longtouqiyedetail6 .dz-left1-img2{
    width: 216px;
    height: 130px;
    background: url("/static/img1/fcjt/pic-thre.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 10px;
    float: left;
    margin-left: 10px;
  }
  #longtouqiyedetail6 .swiper-container {
    width: 438px;
    height: 130px;
    margin:10px;
    overflow: hidden;
  }
  #longtouqiyedetail6 .swiper-slide {
    width: 139px;
    background: #f1f1f1;
    color:#000;
    text-align: center;
    line-height: 130px;
  }
  #longtouqiyedetail6 .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  #longtouqiyedetail6 .swiper-button-prev,.swiper-button-next{
    top:61%;
    height: 20px;
    width: 27px;
    right: 0;
  }
  #longtouqiyedetail6 .swiper-button-prev{
    left:0;
  }

  #longtouqiyedetail6 .my-model .el-dialog{
    width: 482px;
    height: 279px;
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail6 .my-model .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail6 .my-model .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail6 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail6 .my-input {
    width: 383px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail6 .el-textarea__inner {
    background-color: #041624 !important;
    border: solid 1px #4982aa;
  }
  #longtouqiyedetail6 .my-input .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail6 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail6 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail6 .my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail6 .my-model .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail6 .my-model span:nth-child(3){
    color: #0096cf;
  }
   .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail6 .my-model .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail6 .my-model-btn{
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  #longtouqiyedetail6 .my-model1 .el-dialog{
    width: 550px;
    /*height: 279px;*/
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail6 .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail6 .my-model1 .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail6 .my-model1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail6 .my-model1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail6 .my-model1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail6 .my-model1.my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail6 .my-model1 .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail6 .my-model1 span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetail6 .my-model1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail6 .my-model1 .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail6 .my-model1 .my-model-btn {
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>
