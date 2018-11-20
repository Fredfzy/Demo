<template>
    <div class="pig">
      <div class="pig1">
        <p>兴泉合作社</p>
      </div>
      <div class="pig2">
        <img src="/static/img1/video.png" alt="" />
        <p>
          南京润麟农业科技有限公司位于南京市六合区竹镇镇乌山村瓦谢组，公司主要业务涉及：生猪养殖、农业项目开发、苗木、果树种植、销售、农业技术咨询服务、饲料及添加剂、初级农产品及销售等。南京润麟农业是南京市种养结合示范点、全国生猪标准化示范场。
        </p>
      </div>
      <div class="pig3">
        <div class="pig4">
          <div class="pig5" v-for="val in bfelemet">
          <span class="left">{{val.text}}</span ><span class="right">{{val.parameter}}</span>
          </div>
          <div class="pig6">
            <span class="redgird"></span><span>正常</span> <span class="greengird"></span><span>异常</span>
          </div>
        </div>
        <div class="pig7">
          <img src="/static/img1/xuxian.png" alt="">
        </div>
        <div class="pig8" >
          <div class="pig9"  v-for="url in imglist">
            <img  :src="url" alt="">
          </div>
          <div class="pig10">
            查看详情
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: "longtouModel9",
    data(){
      return{
        bfelemet:[
          {text:'温度',parameter:'24℃'},
          {text:'湿度',parameter:'65%'},
          {text:'氨气',parameter:'0.001'},
          {text:'硫化氢',parameter:'0.005'},
          {text:'光照',parameter:'110'}
        ],
        imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
      }
    }
  }

</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .pig {
    width: 802px;
    height: 450px;
    margin-left: 1000px;
    position: relative;
    margin-top: 20px;
  }

  .pig1 {
    width: 802px;
    height: 60px;
    background: url(/static/img1/model-head.png) no-repeat;
    text-align: center;
    line-height: 68px;
  }

  .pig1>p {
    width: 246px;
    height: 24px;
    margin:0 auto;
    color: #74c6ff;
    font-family: MicrosoftYaHei;
    font-size: 24px;
    margin-left: 40px;
  }

  .pig2,.pig3 {
    width: 398px;
    height: 385px;
    background-color: #06365b;
    margin-top: 4px;
    padding:10px 19px 0 19px;
    background: url(/static/img1/model-content.png) no-repeat;

  }
  .pig3{
    position: absolute ;
    left: 402px;
    top:60px;
  }
  .pig2>p {
    width: 359px;
    height: 133px;
    color: #74c6ff;
    font-family: FZLTHJW--GB1-0;
    font-size: 16px;
  }

  .pig4{
    width: 399px;
    display: flex;
    flex-wrap: wrap;
  }
  .pig5{
    width: 178px;
    height: 57px;
    background: url("/static/img1/data-card.png") no-repeat;
    background-size: 100% 100%;
    margin: 5px 5px 2px 2px;
    text-align: center;
    line-height: 57px;
    color: #93d3ff;
  }
  .left{
    margin-right: 50px;
    font-family: FZLTHJW--GB1-0;
    font-size: 18px;
  }

  .right{
    font-family: FZLTHJW--GB1-0;
    font-size: 18px;
    color: #18f832;
  }
  .pig6{
    width: 178px;
    height: 57px;
    margin: 5px 5px 2px 2px;
    text-align: center;
    line-height: 57px;
    color: #93d3ff;
  }
  .redgird{
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #18f832;
  }
  .greengird{
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #ff071a;
    margin-left: 40px;
  }
  .pig8{
    margin-top: 10px;
    width: 399px;
    display: flex;
    flex-wrap: wrap;
  }
  .pig8 img{
    width: 100%;
    height: 100%;
  }
  .pig9{
    width: 119px;
    height: 67px;
  }
  .pig10{
    margin: 0 auto;
    margin-top: 10px;
    width: 148px;
    height: 40px;
    margin-top:20px;
    text-align: center;
    line-height: 40px;
    background: url(/static/img1/button.png) no-repeat;
    color: #8ed0ff;
    font-size: 22px;
  }
  /*.pig4{*/
  /*margin-left: 7px;*/
  /*}*/
  /*.pig4>div {*/
  /*background: url(/static/img1/data-card.png) no-repeat;*/
  /*background-size:125px 35px;*/
  /*width: 125px;*/
  /*height: 35px;*/
  /*float: left;*/
  /*margin-top: 10px;*/
  /*padding: 2px;*/
  /*text-align: center;*/
  /*line-height: 30px;*/

  /*}*/

  /*.pig5 {*/
  /*background: url(/static/img1/data-card.png) no-repeat;*/
  /*background-size:125px 35px;*/
  /*width: 125px;*/
  /*height: 35px;*/
  /*float: left;*/
  /*margin: 1px;*/
  /*text-align: center;*/
  /*line-height: 30px;*/
  /*margin-left:7px ;*/


  /*}*/

  /*.pig6 {*/
  /*width: 12px;*/
  /*height: 12px;*/
  /*background-color: green;*/

  /*}*/

  /*.pig7 {*/
  /*width: 12px;*/
  /*height: 12px;*/
  /*background-color: red;*/
  /*}*/

  /*.pig8 {*/
  /*background: url(/static/img1/model-foot.png) no-repeat;*/
  /*width: 398px;*/
  /*height: 295px;*/
  /*}*/

  /*.pig9 {*/
  /*width: 398px;*/
  /*padding: 10px 19px 0 19px;*/

  /*}*/

  /*.pig10 {*/
  /*float: left;*/
  /*background: url(/static/img1/img1.png) no-repeat;*/
  /*width: 119px;*/
  /*height: 67px;*/
  /*background-color: #0480ff;*/
  /*border: solid 1px #53aadc;*/
  /*float: left;*/

  /*}*/

  /*.pig11 {*/
  /*float: left;*/
  /*background: url(/static/img1/img2.png) no-repeat;*/
  /*width: 119px;*/
  /*height: 67px;*/
  /*background-color: #0480ff;*/
  /*border: solid 1px #53aadc;*/
  /*float: left;*/
  /*}*/

  /*.pig12 {*/
  /*float: left;*/
  /*background: url(/static/img1/img3.png) no-repeat;*/
  /*width: 119px;*/
  /*height: 67px;*/
  /*background-color: #0480ff;*/
  /*border: solid 1px #53aadc;*/
  /*float: left;*/
  /*}*/
  /*.pig13{*/
  /*margin: 0 auto;*/
  /*width: 148px;*/
  /*height: 40px;*/
  /*margin-top:20px;*/
  /*text-align: center;*/
  /*line-height: 40px;*/
  /*background: url(/static/img1/button.png) no-repeat;*/
  /*color: #8ed0ff;*/
  /*font-size: 22px;*/
  /*}*/
  /*.pig14{*/
  /*font-size: 17px;*/
  /*color: #93d3ff;*/
  /*font-family: FZLTHJW--GB1-0;*/
  /*}*/
  /*.pig15{*/
  /*font-family: FZLTHJW--GB1-0;*/
  /*font-size: 17px;*/
  /*color: #18f832;*/
  /*margin-left: 4px;*/
  /*}*/
  /*.map{*/
  /*width: 688px;*/
  /*height: 544px;*/
  /*float: left;*/
  /*background: url(/static/img1/home-map.png) no-repeat;*/
  /*background-size:100% 100% ;*/
  /*position: relative;*/
  /*margin-top: 100px;*/
  /*}*/

</style>
