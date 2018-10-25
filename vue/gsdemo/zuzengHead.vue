<template>
  <div class="zuzeng-head">
    <div class="zuzeng-bg">
      <!--<span class="zuzeng-head-left">2018年10月09日  周二  雷阵雨转中到大雨 东北风4-5级    26℃-18℃   </span>-->
      <span class="zuzeng-head-left">
        <iframe src="//www.seniverse.com/weather/weather.aspx?uid=U9E39C006F&cid=CHJS000000&l=zh-CHS&p=SMART&a=0&u=C&s=4&m=0&x=1&d=0&fc=6aaff7&bgc=&bc=&ti=0&in=0&li=" frameborder="0" scrolling="no" width="1000" height="27" allowTransparency="true"></iframe>
      </span>
      <span class="zuzeng-head-content">竹镇智慧农业综合服务平台</span>
      <span class="zuzeng-head-right">快速检索         10:49</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "zuzengHead"
    }
</script>

<style scoped>
  /*头部*/
  .zuzeng-head .zuzeng-bg{
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0;
    line-height: 64px;
    text-align: center;
    font-size: 14px;
    color: #6aaff7;
  }
  .zuzeng-bg{
    width: 100%;
    height: 100%;
    background: url("/static/img1/titlebar.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
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
