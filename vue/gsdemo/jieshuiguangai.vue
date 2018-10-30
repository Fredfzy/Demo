<template>
  <div class="longtou-detail">
    <div class="longtou-detail-title">
      <p>
        <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
        <span style="color: #afdeff; font-size: 30px;line-height: 32px">节水灌溉</span>
        <span style="color: #497da1;font-size: 18px; line-height: 30px">巴布洛蔬菜大棚重点致力于农业信息化、数字化、可视化、远程操控...</span>
      </p>
    </div>
    <div class="longtou-detail-content">
      <el-row :gutter="24">
        <el-col :span="10">
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="dz-left1 ">
                <img src="/static/img1/jieshuiguangai/shebei/pic-one.png" alt="">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="dz-left1 ">
                <img src="/static/img1/jieshuiguangai/shebei/pic-tw.png" alt="">
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="dz-left1 ">
                <img src="/static/img1/jieshuiguangai/shebei/pic-thre.png" alt="">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="dz-left1">
                <img src="/static/img1/jieshuiguangai/shebei/pic-for.png" alt="">
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <div class="dz-left">
            <img src="/static/img1/jieshuiguangai/shebei/组件水泵.png" alt="">
          </div>
        </el-col>
        <el-col :span="7">
          <el-row :gutter="12">
            <el-col :span="24">
              <div class="dz-right1">
                <ul>
                  <li v-for="val in turanglist" >{{val.name}}: <span>{{val.text}}</span></li>
                </ul>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="24">
              <div class="dz-right1">
                <ul>
                  <li v-for="val in huanjinglist" >{{val.name}}: <span>{{val.text}}</span></li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "jieshuiguangai",
    data(){
      return{
        turanglist:[
          {name:'土壤（PH值）',text:6.8},
          {name:'土壤湿度',text:'60%'},
          {name:'提醒事项',text:6.8}
          ],
        huanjinglist:[
          {name:'风力',text:'10.8m/s'},
          {name:'风向',text:'东南风'},
          {name:'空气温度',text:'20℃'},
          {name:'空气湿度',text:'60%'},
          {name:'气压',text:'60%'},
          {name:'雨量',text:'20mm'},
        ]
      }
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
    height: 505px;
    margin-top: 20px;
    background: url("/static/img1/jieshuiguangai/shebei/水泵K.png");
    background-size: 100% 100%;
  }
  .dz-left img{
    width: 100%;
    height: 100%;
  }
  .dz-left1 img{
    width: 100%;
    height: 100%;
  }

  .dz-left1{
    width: 100%;
    height: 244px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 20px;
  }
  .dz-right1{
    width: 100%;
    height: 243px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 20px;
  }

  .el-row{
    margin: 0 !important;
  }
  ul{
    list-style: none;
  }
  li{
    margin-left: 10px;
    width: 130px;
    height: 14px;
    margin-top: 10px;
    font-family: FZLTZHK--GBK1-0;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 46px;
    letter-spacing: 0px;
    color: #afdeff;
  }
</style>
