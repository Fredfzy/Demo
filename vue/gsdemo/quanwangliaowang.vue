<template>
  <div class="longtou-detail">
    <div class="longtou-detail-title">
      <p>
        <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
        <span style="color: #afdeff; font-size: 30px;line-height: 32px">全景瞭望</span>
        <span style="color: #497da1;font-size: 18px; line-height: 30px">简介...</span>
        <el-button type="primary" class="sucai-title-btn sucai-title-btn1">大泉湖</el-button>
        <el-button type="primary" class="sucai-title-btn sucai-title-btn1">巴布洛</el-button>
        <el-button type="primary" class="sucai-title-btn">止马岭</el-button>
      </p>
    </div>
    <div class="longtou-detail-content">
      <el-row :gutter="12">
        <el-col :span="17">
          <el-row :gutter="16">
            <el-col :span="12">
              <div class="quanjing-left">
                <p>止马岭实时视频</p>
                <div class="quanjing-left-img"></div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="quanjing-content">
                <p>止马岭实时视频</p>
                <div class="quanjing-content-img"></div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
            <div class="quanjing-right-top">
              <div class="dz-left1-img">
                <p class="dz-left1-img-title">兴泉红薯图片集</p>
                <div class="swiper-container">
                  <div class="swiper-scrollbar"></div>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-wrapper" >
                    <div class="swiper-slide"><img src="/static/img1/quanjing-img1.png" alt=""></div>
                    <div class="swiper-slide"><img src="/static/img1/quanjing-img4.png" alt=""></div>
                    <div class="swiper-slide"><img src="/static/img1/quanjing-img5.png" alt=""></div>
                    <div class="swiper-slide"><img src="/static/img1/quanjing-img.png" alt=""></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="quanjing-right-bottom">
              <echarts135></echarts135>
            </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import echarts135 from '@/components/zuzengData/zuzengEcharts/qwlwEcharts/echarts135'
  import Swiper from 'swiper'
    export default {
      name: "quanwangliaowang",
      components:{
        echarts135
      },
      data(){
        return{
        }
      },
      methods:{

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

<style scoped>
  .longtou-detail{
    width: 100%;
    height: 100%;
    background-color:#020b15 ;
    background-size: 100% 100%;
  }
  .longtou-detail-title{
    padding-left: 10px;
    padding-top: 10px;
  }
  .longtou-detail-title p{
    line-height: 40px;
  }
  .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  .quanjing-left{
    width: 100%;
    height: 480px;
    background-color: #06182b;
    border: solid 1px #54789f;
  }
  .quanjing-left p{
    font-size: 20px;
    line-height: 50px;
    color: #c5e7ff;
    padding-left: 15px;
  }
  .quanjing-left-img{
    width: 100%;
    height: 380px;
    background: url("/static/img1/quanjing-img.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .quanjing-content{
    width: 100%;
    height: 480px;
    background-color: #06182b;
    border: solid 1px #54789f;
  }
  .quanjing-content p{
    font-size: 20px;
    line-height: 50px;
    color: #c5e7ff;
    padding-left: 15px;
  }
  .quanjing-content-img{
    width: 100%;
    height: 380px;
    background: url("/static/img1/quanjing-img1.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .quanjing-right-top{
    width: 100%;
    height: 184px;
    background: url("/static/img1/quanjing-img2.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 20px;
    padding: 0 0 0 16px;
    box-sizing: border-box;
  }
  .dz-left1-img{
    float: left;
  }
  .dz-left1-img-title{
    font-size: 20px;
    line-height: 50px;
    color: #c5e7ff;
  }
  .dz-left1-img1{
    width: 192px;
    height: 108px;
    background: url("/static/img1/quanjing-img4.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: 10px;
    float: left;
  }
  .dz-left1-img2{
    width: 192px;
    height: 108px;
    background: url("/static/img1/quanjing-img5.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: 10px;
    float: left;
  }

  .quanjing-right-bottom{
    width: 100%;
    height: 277px;
    background: url("/static/img1/quanjing-img3.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .sucai-title-btn{
    width: 200px;
    height: 40px;
    background-color: #0096cf;
    border-radius: 4px;
    color: #fff;
    float: right;
    margin-right: 20px;
  }
  .sucai-title-btn1{
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
  }
  .swiper-container {
    width: 498px;
    height: 105px;
    margin:10px;
    overflow: hidden;
  }
  .swiper-slide {
    width: 139px;
    background: #f1f1f1;
    color:#000;
    text-align: center;
    line-height: 130px;
  }
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  .swiper-button-prev,.swiper-button-next{
    top:65%;
    height: 20px;
    width: 27px;
    right: 0;
  }
  .swiper-button-prev{
    left:0;
  }
</style>
