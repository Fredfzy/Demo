<template>
  <div class="zuzeng-home">
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
    <div class="zuzeng-map">
       <div class="zuzeng-map-bg">
         <div class="location-icon"></div>
         <div class="zuobiao-icon">
           <div class="zuobiao-yuan"></div>
           <span class="zuobiao-info">大泉湖</span>
         </div>
       </div>
    </div>
    <div class="zuzeng-foot">
      <ul>
        <li  :class="{ zuzengfootbtn:index==listStyle}" @click="change(index)" v-for="(item,index ) in footlist">
          <a href="#">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="zuzeng-flex">
      <div class="echarts-bg">
        <echarts105></echarts105>
      </div>
      <div class="echarts-bg">
        <echarts106></echarts106>
      </div>
      <div class="echarts-bg">
        <echarts107></echarts107>
      </div>
      <div class="echarts-bg">
        <echarts107></echarts107>
      </div>
    </div>

    <div class="zuzeng-position-flex">
      <div class="zuzeng-flex">
        <div class="echarts-bg">
          <echarts108></echarts108>
        </div>
        <div class="echarts-bg">
          <echarts109></echarts109>
        </div>
        <div class="echarts-bg">
          <echarts110></echarts110>
        </div>
        <div class="echarts-bg">
          <echarts110></echarts110>
        </div>
      </div>
    </div>
    <div class="zuzeng-home-model">
      <div class="home-model">
        <h2>竹镇简介</h2>
        <div class="home-voides"></div>
        <p>竹镇，江苏省百家名镇，隶属于南京市六合（Luhe）区。一块古老而神奇的土地，以209平方公里的广阔天地静卧长江北岸，坐落南京西北之首。人口6.6万人，辖17个村、1个居民委员会和2个国有林场，民族文化传统浓厚，享受民族乡待遇。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts105 from '@/components/zuzengData/zuzengEcharts/echarts105'
  import echarts106 from '@/components/zuzengData/zuzengEcharts/echarts106'
  import echarts107 from '@/components/zuzengData/zuzengEcharts/echarts107'
  import echarts108 from '@/components/zuzengData/zuzengEcharts/echarts108'
  import echarts109 from '@/components/zuzengData/zuzengEcharts/echarts109'
  import echarts110 from '@/components/zuzengData/zuzengEcharts/echarts110'
  export default {
    name: "zuzengCommon",
    components:{
      echarts105,echarts106,echarts107,echarts108,echarts109,echarts110
    },
    data(){
      return{
        listStyle:0,
        footlist:[
          {
            name:"首页",
            listClass:"zuzeng-foot-btn"
          },
          {
            name:"园区龙头企业",
          },
          {
            name:"三产融合",
          },
          {
            name:"农牧循环",
          },
          {
            name:"HACCP农产品溯源",
          },
          {
            name:"河长制",
          },
          {
            name:"垃圾分类",
          },
          {
            name:"全网瞭望",
          },
          {
            name:"节水灌溉",
          },
          {
            name:"水利系统",
          },
        ]
      }
    },
    methods:{
      change(index){
        this.listStyle=index;
      }
    }

  }
</script>

<style scoped>
  .zuzeng-home {
    width: 100%;
    height: 100%;
    background: url("/static/img1/home-bg.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 90px;
    padding-bottom: 70px;
  }
  /*头部*/
  .zuzeng-head .zuzeng-bg{
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0;
    line-height: 90px;
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
    font-size: 28px;
  }
  .zuzeng-head-left{
    position: absolute;
    top:0;
    left: 10px;
    line-height: 70px;
    opacity: 0.7;
  }
  .zuzeng-head-right{
    position: absolute;
    top:0;
    right: 10px;
    line-height: 70px;
    opacity: 0.7;
  }
  /*底部*/
  .zuzeng-foot{
    width: 100%;
    height: 70px;
    position: absolute;
    bottom:0;
    box-sizing:border-box;
    padding-left: 10px;
  }
  .zuzeng-foot ul{
    display: flex;
    flex: 1;
  }
  .zuzeng-foot ul li {
    width: 182px;
    height: 56px;
    list-style: none;
    color: #fff;
    background: url("/static/img1/foot-nav-xz.png") no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    line-height:  56px;
    margin-right: 16px;
    font-size: 12px;
  }
  .zuzeng-foot ul li a{
    color: #8ed0ff;
    text-decoration:none;
  }
  .zuzeng-foot .zuzengfootbtn{
    width: 220px;
    background: url("/static/img1/foot-nav.png") no-repeat center center;
    background-size: 100% 100%;
    font-size: 16px;
  }
  /*地图*/
  .zuzeng-map{
    width: 600px;
    height: 500px;
    position: absolute;
    top:18%;
    left: 24%;
  }
  .zuzeng-map-bg{
    width: 100%;
    height: 100%;
    background: url("/static/img1/home-map.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }
  .location-icon {
    width: 78px;
    height: 93px;
    background: url("/static/img1/homezuobiao.png") no-repeat ;
    background-size: 100% 100%;
    position: absolute;
    top:50%;
    left: 50%;
    /*border-radius: 50px;*/
    /*background-image: linear-gradient(*/
      /*#ff9c00,*/
      /*#ff9c00),*/
    /*linear-gradient(*/
      /*#99ffff,*/
      /*#99ffff);*/
    /*background-blend-mode: normal,normal;*/
    /*box-shadow: 9px 27px 39px 12px*/
    /*rgba(251, 244, 169, 0.25),*/
    /*inset 0px 4px 4px 1px*/
    /*rgba(255, 255, 255, 0.25);*/
  }
  .zuobiao-icon{
    position: absolute;
    top: 46%;
    left:37%;
    color: #fff;
  }
  .zuobiao-yuan{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #e9af00;
    box-shadow: 0px 0px 0px 4px
    rgba(233, 175, 0, 0.55)
  }

  /*竹镇model*/
  .zuzeng-home-model{
    width: 370px;
    /*height: 508px;*/
    background: url("/static/img1/home-model.png") no-repeat ;
    background-size: 100% 100%;
    position: absolute;
    top:18%;
    left:58%;
    box-sizing: border-box;
    padding: 74px 15px 58px 15px;
  }
  .home-model{
    width: 100%;
    /*height: 100%;*/
    color: #aee2ff;
  }
  .home-model h2{
    position: absolute;
    top:28px;
    left: 42px;
  }
  .home-voides{
    width: 340px;
    height: 190px;
    background: url("/static/img1/home-vedio.png") no-repeat ;
    background-size: 100% 100%;
    border: 1px solid #53aadc;
    margin-bottom: 10px;
  }
  .home-model p{
    font-size: 18px;
    line-height: 28px;
    color: #74c6ff;
  }

  /*echarts数据展示部分*/
  .zuzeng-main{
     display: flex;
     flex: 1;
    flex-direction:column;
  }
  .echarts-bg{
    width: 398px;
    height: 220px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 10px;
  }
  .zuzeng-position-flex{
    position: absolute;
    top:90px;
    right: 10px;
  }
</style>
