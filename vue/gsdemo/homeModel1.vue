<template>
  <div class="pig">
    <p>竹镇</p>
    <i class="el-icon-close" style="position: absolute;top: 32px;right: 36px;color: #8bc2e9;cursor: pointer;" @click="toggle"></i>
    <div class="pig1">
      <div class="dz-left1"></div>
      <div class="dz-left2"></div>
    </div>
    <div class="pig2">
      <p>"竹镇，江苏省百家名镇，隶属于南京市六合（Luhe）区。
        一块古老而神奇的土地，以209平方公里的广阔天地静卧长江北岸，坐落南京西北之首。
        人口6.6万人，辖17个村、1个居民委员会和2个国有林场，民族文化传统浓厚，享受民族乡待遇。"
      </p>
      <div class="dz-right">
        <div class="pig5" v-for="item in imglist">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "homeModel1",
        data(){
          return{
            obj:{},
            imglist:['/static/img1/model/right-top1.png','/static/img1/model/right-top2.png',
              '/static/img1/model/right-top3.png','/static/img1/model/right-bottom1.png','/static/img1/model/right-bottom2.png','/static/img1/model/right-bottom3.png']
          }
        },
        methods:{
          toggle(){
            this.obj.isMap=true;
            this.obj.isModel1=false;
            this.obj.isModel=true;
            this.$emit('myModel1',this.obj);
            // this.isModel1=true;
          }
        }
    }
</script>

<style scoped >
  .pig {
    width: 827px;
    height: 397px;
    padding-left: 10px;
    padding-top: 10px;
    background: url("/static/img1/model/bng.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top:10%;
    left: 28%;
  }
  p {
    margin:0 auto;
    color: #74c6ff;
    font-size: 24px;
    line-height: 30px;
    width: 827px;
    margin-top:20px ;
    text-align: center;
  }

  .pig1{
    width: 270px;
    height: 300px;
    float: left;
    /*border: 1px solid grey;*/
    padding-top:10px ;
    padding-left: 25px;
  }
  .dz-left1{
    width: 258px;
    height: 145px;
    background: url("/static/img1/model/left1.png") no-repeat;
    background-size: 100% 100%;
    border: solid 2px #49a3ff;
  }
  .dz-left2{
    width: 258px;
    height: 145px;
    margin-top: 10px;
    background: url("/static/img1/model/left2.png") no-repeat;
    background-size: 100% 100%;
    border: solid 2px #49a3ff;
  }
  .pig2{
    width: 518px;
    height: 300px;
    padding-top:10px ;
    padding-left: 5px;
    float: left;
    box-sizing: border-box;
    /*border: 1px solid grey;*/
  }

  .pig2 p {
    width: 500px;
    height: 89px;
    color: #92caf1;
    font-size: 16px;
    line-height: 24px;
    margin-right: 30px;
    text-align: left;
    margin-top: 0;
    text-indent:2em;
    text-align:justify;
    text-justify:inter-ideograph;
  }
  .dz-right{
    width: 500px;
    margin-right: 30px;
    padding-top: 14px;
    display: flex;
    flex-wrap:wrap ;
  }

  .pig5{
    width: 159px;
    height: 81px;
    margin: 5px 5px 2px 2px;
    margin-left: 0;
    text-align: center;
    line-height: 57px;
    color: #93d3ff;
    border: solid 1px #49a3ff;
  }
  .pig5 img{
    width: 100%;
    height: 100%;
  }

</style>
