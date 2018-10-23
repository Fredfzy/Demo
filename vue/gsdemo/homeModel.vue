<template>
  <div class="zuzeng-home-model">
    <div class="home-model">
      <h2>竹镇简介</h2>
      <div class="home-voides"></div>
      <p>竹镇，江苏省百家名镇，隶属于南京市六合（Luhe）区。一块古老而神奇的土地，以209平方公里的广阔天地静卧长江北岸，坐落南京西北之首。人口6.6万人，辖17个村、1个居民委员会和2个国有林场，民族文化传统浓厚，享受民族乡待遇。</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "homeModel"
    }
</script>

<style scoped>
  /*竹镇model*/
  .zuzeng-home-model{
    width: 298px;
    /*height: 508px;*/
    background: url("/static/img1/home-model.png") no-repeat ;
    background-size: 100% 100%;
    position: absolute;
    top:18%;
    left:54%;
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
    top:20px;
    left: 42px;
  }
  .home-voides{
    width: 270px;
    height: 152px;
    background: url("/static/img1/home-vedio.png") no-repeat ;
    background-size: 100% 100%;
    border: 1px solid #53aadc;
    margin-bottom: 10px;
  }
  .home-model p{
    font-size: 14px;
    line-height: 20px;
    color: #74c6ff;
  }
</style>
