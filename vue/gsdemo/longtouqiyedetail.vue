<template>
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
              <el-button type="primary dz-left1-btn">收获季推送</el-button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="dz-left1-img">
                <div class="dz-left1-img1"></div>
                <div class="dz-left1-img2"></div>
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
</div>
</template>

<script>
  import echarts121 from '@/components/zuzengData/zuzengEcharts/hylEcharts/echarts121'
  import echarts122 from '@/components/zuzengData/zuzengEcharts/hylEcharts/echarts122'
  import echarts123 from '@/components/zuzengData/zuzengEcharts/hylEcharts/echarts123'
    export default {
        name: "longtouqiyedetail",
      components:{
        echarts121,echarts122,echarts123
      }
    }
</script>

<style scoped>
 .longtou-detail{
   width: 100%;
   height: 100%;
   background-color:#020b15 ;
   background-size: 100% 100%;
 }
  .longtou-detail-title{

  }
  .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/dazhanhuangyuli1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
  }
  .dz-left1{
    width: 100%;
    height: 200px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
  }
 .dz-left1 table{
   width: 100%;
 }
 .dz-left1 table tr:first-child td{
   width: 100%;
   border-bottom: 1px solid #3d5268;
 }
 .dz-left1 table p{
   display: inline-block;
   padding-left: 10px;
   color: #c5e7ff;
   font-size: 16px;
   line-height: 38px;
 }
 .dz-left1 table p span:last-child{
   color: #e6ee00;
 }
 .dz-left1-btn{
   float: right;
   height: 30px;
   background-color: #0096cf;
   border-radius: 4px;
   margin-top: 2px;
   margin-right: 4px;
   line-height: 0;
 }
 .dz-left1-img1{
   width: 196px;
   height: 130px;
   background: url("/static/img1/dazhanhuangyuli3.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: 10px;
   margin-left: 10px;
   float: left;
 }
 .dz-left1-img2{
   width: 196px;
   height: 130px;
   background: url("/static/img1/dazhanhuangyuli4.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: 10px;
   margin-left: 10px;
   float: left;
 }


  .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
  }
 .dz-info p{
   text-align: center;
 }
 .dz-info p:first-child{
   line-height: 108px;
 }
 .dz-info1{
   width: 100%;
   height: 280px;
   background: url("/static/img1/home-data.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: -80px;
 }


  .dz-right{
    width: 100%;
    height: 190px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .dz-right p{
    font-size: 14px;
    color: #6094b9;
    line-height: 40px;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
  }
 .dz-right p span:first-child{
   font-size: 16px;
   color:#c5e7ff;
   line-height: 40px;
 }
 .dz-right p span:last-child{
   float: right;
 }
  .dz-right-img{
    width: 158px;
    height: 110px;
    background: url("/static/img1/dazhanhuangyuli2.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-left: 20px;
  }
  .dz-right-info{
    font-size: 14px;
    color: #6094b9;
    line-height: 30px;
    float: left;
    margin-left: 30px;
  }
  .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  .el-row{
    margin: 0 !important;
 }
</style>
