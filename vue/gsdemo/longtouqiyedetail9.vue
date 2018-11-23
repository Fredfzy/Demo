<template>
  <div id="longtouqiyedetail9">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">智慧温室</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">智慧温室简介...</span>
          <el-button type="primary"class="mybtn" :class="{mybtn1:isMainStyle==index}" v-for="(item,index) in isMainlist"  @click="isToggle(index)">{{item.name}}</el-button>

        </p>
      </div>
      <div class="longtou-detail-content" v-if="isMain">
        <el-row :gutter="12">
          <el-col :span="8">
            <div class="zhihuiwenshi-info">
              <echarts141></echarts141>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="zhihuiwenshi-info">
              <echarts140></echarts140>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="zhihuiwenshi-info">
              <echarts139></echarts139>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="longtou-detail-content1" v-if="isMain1">
        <el-row :gutter="12">
          <el-col :span="8">
            <div class="zhineng-left-top">
              <div class="zuobiao-icon" :class="{zuobiaoIcon1:isMainStyle1==index}" :style="{top:item.top+'%',left:item.left + '%'} " v-for="(item,index) in zuobiaoList" @click="zuobiaoChange(index)">
                {{item.id}}
              </div>
            </div>
            <div class="zhineng-left-bottom">
                <div class="dz-info" style="margin-right: 12px;">
                  <p style="font-size: 16px;color: #afdeff;">大气温度</p>
                  <p style="font-size: 20px;color: #ffffff;">{{ModelList.airtem1}}</p>
                </div>
                <div class="dz-info" style="margin-right: 12px;">
                  <p style="font-size: 16px;color: #afdeff;">相对湿度</p>
                  <p style="font-size: 20px;color: #fd0000;">{{ModelList.airdam1}}</p>
                </div>
                <div class="dz-info" style="margin-right: 12px;">
                  <p style="font-size: 16px;color: #afdeff;">大气压</p>
                  <p style="font-size: 20px;color: #ffffff;">{{ModelList.illumint1}}</p>
                </div>
                <div class="dz-info" style="margin-right: 12px;">
                  <p style="font-size: 16px;color: #afdeff;">风速</p>
                  <p style="font-size: 20px;color: #00baff;">{{ModelList.co2con1}}</p>
                </div>
                <div class="dz-info">
                  <p style="font-size: 16px;color: #afdeff;">风向</p>
                  <p style="font-size: 20px;color: #ffffff;">{{ModelList.soiltem1}}</p>
                </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shuili-content">
              <div class="shuili-content-top">
                <div class="content-top-left">
                  <div class="dz-info1" >
                    <span style="font-size: 16px;color: #afdeff;">空气温度</span>
                    <span class="info1-span" style="font-size: 20px;color: #ffffff;">{{ModelList.airtem}}</span>
                  </div>
                  <div class="dz-info1" >
                    <span style="font-size: 16px;color: #afdeff;">土壤温度</span>
                    <span class="info1-span" style="font-size: 20px;color: #00baff;">{{ModelList.soiltem}}</span>
                  </div>
                  <div class="dz-info1" >
                    <span style="font-size: 16px;color: #afdeff;">空气湿度</span>
                    <span class="info1-span" style="font-size: 20px;color: #fd0000;">{{ModelList.airdam}}</span>
                  </div>
                  <div class="dz-info1">
                    <span style="font-size: 16px;color: #afdeff;">土壤湿度</span>
                    <span class="info1-span" style="font-size: 20px;color: #ffffff;">{{ModelList.soildam}}</span>
                  </div>
                  <div class="dz-info1">
                    <span style="font-size: 16px;color: #afdeff;">光照强度</span>
                    <span style="font-size: 20px;color: #ffffff;margin-left: 80px">{{ModelList.illumint}}</span>
                  </div>
                  <div class="dz-info1">
                    <span style="font-size: 16px;color: #afdeff;">土壤养分</span>
                    <span style="font-size: 20px;color: #ffffff;margin-left: 80px">{{ModelList.soil1}}</span>
                  </div>
                </div>
                <div class="contnet-top-right" >
                  <p style="font-size: 18px;color: #afdeff;">CO2浓度</p>
                  <p style="font-size: 28px;color: #ffffff;">{{ModelList.co2con}}</p>
                </div>
              </div>
              <div class="shuili-content-bottom">
                <table>
                  <tr>
                    <th>类型</th>
                    <th>ID</th>
                    <th>传感器名称</th>
                    <th>实时数据</th>
                    <th>状态</th>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>JS3310211</td>
                    <td>CO2</td>
                    <td>1116.96PPM</td>
                    <td>正常</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>JS3310212</td>
                    <td>光照强度</td>
                    <td>2500LUX</td>
                    <td>正常</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>JS3310213</td>
                    <td>空气温度</td>
                    <td>24℃</td>
                    <td>正常</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>JS3310214</td>
                    <td>空气湿度</td>
                    <td>47.7%</td>
                    <td>正常</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>JS3310215</td>
                    <td>土壤湿度</td>
                    <td>14℃</td>
                    <td>正常</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shuili-right">
              <p>玻璃温室实时视频</p>
              <div class="swiper-container">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-wrapper" >
                  <div class="swiper-slide"><img src="/static/img1/zhws/video.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video1.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video2.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video3.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video4.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video5.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video6.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/zhws/video7.png" alt=""></div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts139 from '@/components/zuzengData/zuzengEcharts/zhwsEcharts/echarts139'
  import echarts140 from '@/components/zuzengData/zuzengEcharts/zhwsEcharts/echarts140'
  import echarts141 from '@/components/zuzengData/zuzengEcharts/zhwsEcharts/echarts141'
  import Swiper from 'swiper'
    export default {
      name: "longtouqiyedetail9",
      components:{
        echarts139,echarts140,echarts141
      },
      data(){
        return{
          zuobiaoStyle:0,
          ModelList:{
            airtem1: '24℃',
            airdam1: '47.7%',
            illumint1: '0.4kpa',
            co2con1: '5m/S',
            soiltem1: '东南',
            airtem: '22℃',
            airdam: '44.7%',
            illumint: '2501LUX',
            co2con: '352PPM',
            soiltem: '15℃',
            soildam: '72.7%',
            soil1:'10.9EC'
          },
          zuobiaoList:[
            {
              id:'1#',
              top:36,
              left:37,
              img1:'/static/img1/model1/1.png',
              airtem1: '24℃',
              airdam1: '47.7%',
              illumint1: '0.4kpa',
              co2con1: '5m/S',
              soiltem1: '东南',
              airtem: '22℃',
              airdam: '44.7%',
              illumint: '2501LUX',
              co2con: '352PPM',
              soiltem: '15℃',
              soildam: '72.7%',
              soil1:'10.9EC'
            },
            {
              id:'2#',
              top:51,
              left:45,
              img1:'/static/img1/model1/2.png',
              airtem1: '23℃',
              airdam1: '48.7%',
              illumint1: '0.5kpa',
              co2con1: '6m/S',
              soiltem1: '西南',
              airtem: '21℃',
              airdam: '42.7%',
              illumint: '2501LUX',
              co2con: '352PPM',
              soiltem: '15℃',
              soildam: '71.7%',
              soil1:'10.8EC'
            },
            {
              id:'3#',
              top:30,
              left:5,
              img1:'/static/img1/model1/3.png',
              airtem1: '22℃',
              airdam1: '45.7%',
              illumint1: '0.4kpa',
              co2con1: '4m/S',
              soiltem1: '东南',
              airtem: '23℃',
              airdam: '41.7%',
              illumint: '2489LUX',
              co2con: '352PPM',
              soiltem: '16℃',
              soildam: '72.7%',
              soil1:'10.9EC'
            },
            {
              id:'4#',
              top:64,
              left:50,
              img1:'/static/img1/model1/4.png',
              airtem1: '25℃',
              airdam1: '48.7%',
              illumint1: '0.3kpa',
              co2con1: '5m/S',
              soiltem1: '东南',
              airtem: '21℃',
              airdam: '45.7%',
              illumint: '2501LUX',
              co2con: '351PPM',
              soiltem: '16℃',
              soildam: '72.7%',
              soil1:'11.9EC'
            }
          ],
          isMain:true,
          isMain1:'',
          isMainStyle:0,
          isMainStyle1:0,
          isMainlist:[
            {
              name:"统计分析"
            },
            {
              name:"智能化设备控制"
            }
          ],
        }
      },
      methods:{
        isToggle(index){
          this.isMainStyle=index;
          if(index==0){
            this.isMain=true;
            this.isMain1=false;
          }else{
            this.isMain=false;
            this.isMain1=true;
          }
        },
        zuobiaoChange(index){
          this.isMainStyle1=index
          this.ModelList=this.zuobiaoList[index];
        }
      },
      created:function () {
        this.$nextTick(function() {
          var swiper = new Swiper({
            el: '.swiper-container',
            initialSlide: 1,//参数，设置默认的active索引 设置为0即是slider1
            spaceBetween: 10,//slider之间的距离
            slidesPerView: 1,//设置容器同时能够显示slides的数量
            centeredSlides: true,//设定为true时，active slide会居中，而不是默认状态下的居左。
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

<style scoped>
 #longtouqiyedetail9 .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
 #longtouqiyedetail9 .longtou-detail-title{
   margin-left: 14px;

 }
 #longtouqiyedetail9 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
 #longtouqiyedetail9 .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
 #longtouqiyedetail9 .mybtn{
   width: 200px;
   height: 40px;
   background-color: #041526;
   color: #91b9d6;
   border: solid 1px #3d5268;
   float: right;
   margin-right: 20px;
   border-radius: 4px;
   cursor: pointer;
 }
 #longtouqiyedetail9  .mybtn1{
   width: 200px;
   height: 40px;
   color: #fff;
   border: solid 1px #3d5268;
   float: right;
   margin-right: 20px;
   border-radius: 4px;
   cursor: pointer;
   background-color: #0096cf;
 }
 #longtouqiyedetail9  .mybtn:hover{
   background-color: #0096cf;
   color: #fff;
   border: solid 1px #3d5268;
   border-radius: 4px;
 }
 #longtouqiyedetail9 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  .el-row{
    margin: 0 !important;
  }
 #longtouqiyedetail9 .zhihuiwenshi-info{
    width: 100%;
    height: 476px;
    background: url("/static/img1/zhihuiwenshi.png") no-repeat center center;
    background-size: 100% 100%;
  }
 .longtou-detail-content1{
   margin: 18px 10px 0 10px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuli-left-info{
   width: 100%;
   height: 476px;
   background-color: #06182b;
   border: solid 1px #54789f;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuli-left-info p{
   padding-left: 20px;
   font-size: 20px;
   line-height: 40px;
   color: #c5e7ff;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuli-left-info .shuli-left-img{
   width: 100%;
   height: 436px;
   background: url("/static/img1/shuilixitong-img.png") no-repeat center center;
   background-size: 100% 100%;
 }

 #longtouqiyedetail9 .longtou-detail-content1 .zhineng-left-top{
   width: 100%;
   height: 338px;
   background: url("/static/img1/longtouqiye-detail.png") no-repeat;
   background-size: 100% 100%;
   margin-bottom: 16px;
   position: relative;
 }
 .zuobiao-icon{
   position: absolute;
   cursor:pointer;
   width:47px;
   height:47px;
   border-radius:50px;
   border:solid rgb(100,100,100) 1px;
   background-color: #0065cc;
   text-align: center;
   line-height: 47px;
   font-size: 15px;
   color: #ffffff;
 }
 .zuobiaoIcon1{
   position: absolute;
   cursor:pointer;
   width:47px;
   height:47px;
   border-radius:50px;
   border:solid rgb(100,100,100) 1px;
   background-color: red;
   text-align: center;
   line-height: 47px;
   font-size: 15px;
   color: #ffffff;

 }
 #longtouqiyedetail9 .longtou-detail-content1 .zhineng-left-bottom{
   width: 100%;
   height: 125px;
   display: flex;
 }
 #longtouqiyedetail9 .longtou-detail-content1  .dz-info{
   /*width: 124px;*/
   width: 100%;
   height: 125px;
   background-color: #030e1a;
   border: solid 1px #3d5268;
   border-top-color: #49a3ff;
   text-align: center;
   cursor: pointer;
 }
 #longtouqiyedetail9 .longtou-detail-content1  .dz-info:hover{
   background-color: #091e35;
 }
 #longtouqiyedetail9 .longtou-detail-content1  .dz-info p{
   text-align: center;
 }
 #longtouqiyedetail9 .longtou-detail-content1  .dz-info p:first-child{
   line-height: 80px;
 }
 #longtouqiyedetail9 .longtou-detail-content1  .dz-info p:last-child{
   line-height: 40px;
 }
 .shuili-content{
   position: relative;
 }

 .content-top-left{
   height: 163px;
   width: 500px;
   padding-left: 3px;
   display: flex;
   flex-wrap: wrap;

 }
 .content-top-left .dz-info1{
   /*width: 124px;*/
   width: 235px;
   height: 46px;
   background-color: #030e1a;
   border: solid 1px #3d5268;
   border-top-color: #49a3ff;
   line-height: 46px;
   text-align: center;
   cursor: pointer;
   margin-right: 10px;
   margin-bottom: 9px;
 }

 .content-top-left .dz-info1:hover{
   background-color: #091e35;
 }
 .content-top-left .dz-info1 span{
   text-align: center;
 }
 .info1-span{
   margin-left: 100px;
 }
 .contnet-top-right{
   width: 124px;
   height:160px;
   background-color: #030e1a;
   border: solid 1px #3d5268;
   border-top-color: #49a3ff;
   text-align: center;
   cursor: pointer;
   position: absolute;
   left: 497px;
   top:0;
 }
 .contnet-top-right p:first-child{
   line-height: 80px;
 }
 .contnet-top-right p:last-child{
   line-height: 100px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-top{
   width: 100%;
   height: 168px;
   margin-bottom: 16px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-top .content-left{
   width: 70px;
   height: 100%;
   padding: 12px 21px 26px 29px;
   box-sizing: border-box;
   border-right: 1px solid #54789f;
   font-size: 18px;
   color: #c5e7ff;
   float: left;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-top .content-right{
   width: calc(100% - 70px);
   height: 100%;
   padding: 25px 0 25px 25px;
   box-sizing: border-box;
   font-size: 15px;
   line-height: 32px;
   color: #99c1f2;
   float: left;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom{
   width: 100%;
   height: 297px;
   background: url("/static/img1/shuilixitong-img2.png") no-repeat center center;
   background-size: 100% 100%;
   padding-left: 3px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom table{
   width: 100%;
   text-align: center;
   border-collapse:collapse;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom table tr th{
   flex: 1;
   height: 55px;
   line-height: 55px;
   border-bottom: 1px solid #54789f;
   color: #78bae8;
   font-size: 18px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom table tr th:nth-child(6){
   flex: 0 0 18%;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom table tr th:nth-child(7){
   flex: 0 0 18%;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom table tr{
   display: flex;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-content-bottom table tr td{
   flex: 1;
   height: 48px;
   line-height: 48px;
   color: #6094b9;
   font-size: 14px;
 }

 #longtouqiyedetail9 .longtou-detail-content1 .shuili-right{
   width: 100%;
   height: 480px;
   background: url("/static/img1/shuilixitong-img3.png") no-repeat center center;
   background-size: 100% 100%;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-right .shuili-right-content{
   padding: 15px 44px 0 20px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-right-content-title{
   font-size: 20px;
   line-height: 20px;
   color: #c5e7ff;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-right-info{
   height: 99px;
   margin-bottom: 50px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-right-info-left{
   width: 90px;
   height: 100%;
   font-size: 18px;
   color: #70b3d9;
   line-height: 40px;
   padding: 20px 0 60px 0;
   box-sizing: border-box;
   display: inline-block;
   float: left;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-right-info-right{
   width: calc(100% - 90px);
   height: 100%;
   display: inline-block;
   box-sizing: border-box;
   padding-top: 10px;
   padding-left: 10px;
   float: left;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .shuili-righthuakuai{
   width: 100%;
   height: 30px;
   padding-top: 10px;
 }
 #longtouqiyedetail9 .longtou-detail-content1 .sucai-title-btn{
   width: 203px;
   height: 30px;
   background-color: #0096cf;
   border-radius: 4px;
   color: #fff;
   float: left;
   margin-right: 20px;
   font-size: 16px;
   line-height: 1px;
   margin-top: 32px;
 }
 .shuili-right{
   padding-top:10px ;
 }
 .shuili-right p{
   font-size: 20px;
   line-height: 40px;
   color: #c5e7ff;
   margin-left: 10px;
   margin-bottom: 20px;
 }
 #longtouqiyedetail9 .swiper-container {
   width: 612px;
   height: 374px;
   overflow: hidden;
 }
 #longtouqiyedetail9 .swiper-slide {
 }
 #longtouqiyedetail9 .swiper-slide img{
   width: 100%;
   height: 100%;
 }
 #longtouqiyedetail9 .swiper-button-prev,.swiper-button-next{
   top:61%;
   height: 20px;
   width: 27px;
   right: 0;
 }
 #longtouqiyedetail9 .swiper-button-prev{
   left:0;
 }
</style>
