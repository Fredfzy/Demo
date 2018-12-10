<template>
  <div class="zuzeng-head">
    <div class="zuzeng-bg">
      <!--<span class="zuzeng-head-left">2018年10月09日  周二  雷阵雨转中到大雨 东北风4-5级    26℃-18℃   </span>-->
      <span class="zuzeng-head-left">
        <div class="zuzengImgLogo"></div>
        <div style="display: inline-block;margin-left: 66px;">
          <iframe src="//www.seniverse.com/weather/weather.aspx?uid=U9E39C006F&cid=CHJS000000&l=zh-CHS&p=SMART&a=0&u=C&s=4&m=0&x=1&d=0&fc=6aaff7&bgc=&bc=&ti=0&in=0&li=" frameborder="0" scrolling="no" width="1000" height="27" allowTransparency="true"></iframe>
        </div>
        <span style="position: absolute;top: -8px;left: 306px">风速：3.5m/s</span>
      </span>
      <span class="zuzeng-head-content">竹镇智慧农业综合服务平台</span>
      <span class="zuzeng-head-right">快速检索         10:49</span>
      <el-button type="primary" @click="back" size="mini" style="margin-left: 30px;position: absolute;top:10px;right: 122px">返回</el-button>
      <!--<el-button type="primary" @click="back1" size="mini" style="margin-left: 30px;position: absolute;top:10px;right: 222px">退出</el-button>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "zuzengHead",
      methods:{
          back(){
            this.$router.push({path:'/usermanagement'});
          },
      }
    }
</script>

<style scoped>
  /*头部*/
  .zuzeng-head .zuzeng-bg{
    width: 100%;
    height: 90px;
    position: absolute;
    top: 15px;
    line-height: 64px;
    text-align: center;
    font-size: 14px;
    color: #6aaff7;
    z-index: 1;
  }
  .zuzeng-bg{
    width: 100%;
    height: 100%;
    background: url("/static/img1/titlebar.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }
  .zuzengImgLogo{
    width: 55px;
    height: 36px;
    display: inline-block;
    background: url("/static/img1/zuzenglogin/zhuzhen-logo.png") no-repeat;
    background-size:100% 100% ;
    position: absolute;
    top: 6px;
    left:0px;
  }
  .zuzeng-head-content{
    color: #afdeff;
    font-size: 36px;
  }
  .zuzeng-head-left{
    position: absolute;
    top:0;
    left: 10px;
    line-height: 66px;
    opacity: 0.7;
  }
  .zuzeng-head-right{
    position: absolute;
    top:0;
    right: 10px;
    line-height: 55px;
    opacity: 0.7;
  }
</style>
