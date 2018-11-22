<template>
  <div id="longtouqiyedetail8">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">种植业设施示范点——福朝葡萄</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">南京福朝农业发展有限公司位于竹镇镇丰乐村黄云组，主要经营范围是葡萄种植及销售，现已建成：葡萄种植区、鱼养殖区、办公区、停车场、餐饮区等。在葡萄种植方面.....</span>
        </p>
      </div>
      <div class="longtou-detail-content">
        <el-row :gutter="12">
          <el-col :span="6"><div class="dz-left">
            <div class="zuobiao-icon" :class="{zuobiaoIcon1:isMainStyle1==index}" :style="{top:item.top+'%',left:item.left + '%'} " v-for="(item,index) in zuobiaoList" @click="zuobiaoChange(index)">
              {{item.id}}
            </div>
          </div></el-col>
          <el-col :span="14">
            <div class="dz-content">
              <el-row :gutter="8">
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气温度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{ModelList.airtem}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气湿度</p>
                    <p style="font-size: 20px;color: #fd0000;">{{ModelList.airdam}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-50%</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">光照强度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{ModelList.illumint}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：200-1500</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">CO2浓度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{ModelList.co2con}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：0-500PPM</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤温度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{ModelList.soiltem}}</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤湿度</p>
                    <p style="font-size: 20px;color: #ffffff;">{{ModelList.soildam}}</p>
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
              <p>
                <span>溯源关键节点信息</span>
                <span>全部</span>
              </p>
              <div class="swiper-container">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-wrapper" >
                  <div class="swiper-slide"><img src="/static/img1/fuchaoputao-img1.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/fuchaoputao-img2.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/fuchaoputao-img3.png" alt=""></div>
                  <div class="swiper-slide"><img src="/static/img1/xiantaoguoziwang-img.png" alt=""></div>
                </div>
              </div>
              <ul>
                <li>
                  <p>
                    <span>喷洒农药，100亩，xxx农药...  </span>
                    <span>6月15日</span>
                  </p>
                </li>
              </ul>
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
    </div>
  </div>
</template>
<script>
  import echarts124 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts124'
  import echarts125 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts125'
  import echarts126 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts126'
  import Swiper from 'swiper'
    export default {
      name: "longtouqiyedetail8",
      components:{
        echarts124,echarts125,echarts126
      },
      data(){
        return{
          zuobiaoStyle:0,
          isMainStyle1:0,
          ModelList:{
            airtem: '24℃',
            airdam: '43.7%',
            illumint: '2502LUX',
            co2con: '353PPM',
            soiltem: '16℃',
            soildam: '73.7%'
          },
          zuobiaoList:[
            {
              top:46,
              left:27,
              id:'1#',
              img1:'/static/img1/model1/1.png',
              airtem: '24℃',
              airdam: '43.7%',
              illumint: '2502LUX',
              co2con: '353PPM',
              soiltem: '16℃',
              soildam: '73.7%'
            },
            {
              top:51,
              left:48,
              id:'2#',
              img1:'/static/img1/model1/2.png',
              airtem: '22℃',
              airdam: '43.7%',
              illumint: '2502LUX',
              co2con: '353PPM',
              soiltem: '16℃',
              soildam: '73.7%'
            },
            {
              top:30,
              left:15,
              id:'3#',
              img1:'/static/img1/model1/3.png',
              airtem: '25℃',
              airdam: '43.7%',
              illumint: '2502LUX',
              co2con: '353PPM',
              soiltem: '16℃',
              soildam: '73.7%'
            },
            {
              top:64,
              left:48,
              id:'4#',
              img1:'/static/img1/model1/4.png',
              airtem: '23℃',
              airdam: '44.7%',
              illumint: '2502LUX',
              co2con: '353PPM',
              soiltem: '16℃',
              soildam: '73.7%'
            }
          ],
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
        autoPlay () {
          this.mark++;
          if (this.mark === 4) { //当遍历到最后一张图片置零
            this.mark = 0
          }
        },
        change (i) {
          this.mark = i
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
            initialSlide: 0,//参数，设置默认的active索引 设置为0即是slider1
            spaceBetween: 10,//slider之间的距离
            slidesPerView: 3.5,//设置容器同时能够显示slides的数量
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

<style>
 #longtouqiyedetail8 .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
 #longtouqiyedetail8 .longtou-detail-title{
   margin-left: 14px;

  }
 #longtouqiyedetail8 .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
 #longtouqiyedetail8 .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
 #longtouqiyedetail8 .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
 #longtouqiyedetail8 .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/sucaidapeng1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
    border: 1px solid #49a3ff;
   position: relative;
  }
 #longtouqiyedetail8 .zuobiao-icon{
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
 #longtouqiyedetail8 .zuobiaoIcon1{
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
 /*.dz-left1-switch .el-switch .el-switch__core{*/
  /*width: 76px !important;*/
  /*height: 34px !important;*/
  /*}*/

 #longtouqiyedetail8 .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
  }
 #longtouqiyedetail8 .dz-info:hover{
   background-color: #091e35;
 }
 #longtouqiyedetail8 .dz-info p{
    text-align: center;
  }
 #longtouqiyedetail8 .dz-info p:first-child{
    line-height: 80px;
  }
 #longtouqiyedetail8 .dz-info p:last-child{
    line-height: 90px;
  }
 #longtouqiyedetail8 .dz-info1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
 #longtouqiyedetail8 .dz-right{
    width: 100%;
    height: 190px;
  }
 #longtouqiyedetail8 .dz-right ul li{
    height:  190px
  }
 #longtouqiyedetail8 .img1{
    width: 100%;
    height: 100%;
  }
 #longtouqiyedetail8 .dz-right1{
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }
  .el-row{
    margin: 0 !important;
  }

 #longtouqiyedetail8 .dz-left1{
    width: 100%;
    height: 200px;
    background: url("/static/img1/fuchaoputao-img4.png") no-repeat center center;
    background-size: 100% 100%;
  }
 #longtouqiyedetail8 .dz-left1 p{
    padding-top: 5px;
    padding-left: 18px;
  }
 #longtouqiyedetail8 .dz-left1 p span:first-child{
    font-size: 16px;
    line-height: 40px;
    color: #c5e7ff;
  }
 #longtouqiyedetail8 .dz-left1 p span:last-child{
    font-size: 14px;
    line-height: 30px;
    color: #5f7a8d;
    float: right;
    margin-right: 18px;
  }
 #longtouqiyedetail8 .dz-left1 .dz-left1-img{
    height: 88px;
    padding-left: 18px;
  }
 #longtouqiyedetail8 .dz-left1 .dz-left1-img .dz-left1-img1{
    width: 125px;
    height: 100%;
    background: url("/static/img1/fuchaoputao-img1.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-right: 10px;
  }
 #longtouqiyedetail8 .dz-left1 .dz-left1-img .dz-left1-img2{
    width: 125px;
    height: 100%;
    background: url("/static/img1/fuchaoputao-img2.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-right: 10px;
  }
 #longtouqiyedetail8 .dz-left1 .dz-left1-img .dz-left1-img3{
    width: 125px;
    height: 100%;
    background: url("/static/img1/fuchaoputao-img3.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-right: 10px;
  }
 #longtouqiyedetail8 .dz-left1 ul li p span:first-child{
    font-size: 14px;
    line-height: 30px;
    color: #6094b9;
  }
 #longtouqiyedetail8 .dz-left1 ul li p span:last-child{
    font-size: 14px;
    line-height: 30px;
    color: #688599;
  }
 #longtouqiyedetail8 .swiper-container {
    width: 433px;
    height: 93px;
    margin:10px;
    overflow: hidden;
  }
 #longtouqiyedetail8 .swiper-slide {
    width: 139px;
    background: #f1f1f1;
    color:#000;
    text-align: center;
    line-height: 130px;
  }
 #longtouqiyedetail8 .swiper-slide img{
    width: 100%;
    height: 100%;
  }
 #longtouqiyedetail8 .swiper-button-prev,.swiper-button-next{
    top:61%;
    height: 20px;
    width: 27px;
    right: 0;
  }
 #longtouqiyedetail8 .swiper-button-prev{
    left:0;
  }
</style>
