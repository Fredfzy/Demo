<template>
<div class="longtou-detail">
  <div class="longtou-detail-title">
    <p>
      <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
      <span style="color: #afdeff; font-size: 30px;line-height: 32px">三产融合</span>
      <span style="color: #497da1;font-size: 18px; line-height: 30px">巴布洛蔬菜大棚重点致力于农业信息化、数字化、可视化、远程操控...</span>
    </p>
  </div>
  <div class="longtou-detail-content">
    <el-row :gutter="24">
      <el-col :span="8">
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="dz-left1">
                <echarts127></echarts127>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="dz-left1">
                <echarts128></echarts128>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="dz-left2 ">
                <p class="title1">推送轮播</p>
                <div id="demo">
                  <div id="demo1">
                    <ul>
                      <li v-for="(val,index) in zuobiaoList" @click="zuobiaoChange(index)">
                        <span>{{val.news}}</span>
                      </li>
                    </ul>
                  </div>
                  <div id="demo2">
                    <ul>
                      <li v-for="(val,index) in zuobiaoList" @click="zuobiaoChange(index)">
                        <span>{{val.news}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="dz-left2">
                <p class="title1">需求统计</p>
                <div id="demof">
                  <div id="demof1">
                    <ul>
                      <li v-for="(val,index) in zuobiaoList" @click="zuobiaoChange(index)">
                        <span>{{val.news1}}</span>
                      </li>
                    </ul>
                  </div>
                  <div id="demof2">
                    <ul>
                      <li v-for="(val,index) in zuobiaoList" @click="zuobiaoChange(index)">
                        <span>{{val.news1}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-col>
      <el-col :span="10">
        <div class="dz-left sanchang-map ">
          <p>游客总数<span class="lleft">865，456，660，8</span>人</p>
          <div class="zuzeng-map">
            <div class="zuzeng-map-bg">
              <div class="zuobiao-icon" :style="{top:item.top+'%',left:item.left + '%'} " v-for="(item,index) in zuobiaoList" >
                <div class="zuobiao-myuan zuobiao-yuan" >
                  <!--<div :class="{locationicon:index == zuobiaoStyle}" ></div>-->
                </div>
                <div class="zuobiao-myuan1 zuobiao-yuan1">
                  <!--<div :class="{locationicon1:index == zuobiaoStyle}" ></div>-->
                </div>
                <!--<transition mode="out-in" enter-active-class="bounceInRight" leave-active-class="bounceOutRight">-->
                <span>{{item.name}}</span>
                <div class="lajifenlei-model animated" v-if="zuobiaoList[index].model">
                    <p class="title1"><ul><li>{{item.name}}</li></ul><span id="span1" @click="closeModel(index)"><i class="icon-cross"></i></span></p>
                    <div><img src="" alt=""></div>
                    <p class="content1">{{item.news1}}</p>
                </div>
                <!--</transition>-->
              </div>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :span="6">
        <el-row :gutter="12">
          <el-col :span="24">
            <div class="dz-left1">
              <echarts129></echarts129>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="24">
            <div class="ileft">
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import echarts127 from '@/components/zuzengData/zuzengEcharts/scrhEcharts/echarts127'
  import echarts128 from '@/components/zuzengData/zuzengEcharts/scrhEcharts/echarts128'
  import echarts129 from '@/components/zuzengData/zuzengEcharts/scrhEcharts/echarts129'
  export default {
    name: "sanchanronghe",
    components:{
      echarts127,echarts128,echarts129
    },
    mounted(){
      this.zuobiaoChange(0);
      this.lunbo();
      this.lunbo1();
    },
    data(){
      return{
        newlist:[
          '枫彩集团的花期还有3天就...',
          '果子王的鲜桃快要成熟啦...',
          '枫彩集团的花期还有3天就...',
          '果子王的鲜桃快要成熟啦...',
          '枫彩集团的花期还有3天就...',
          '果子王的鲜桃快要成熟啦...'
        ],
        new1list:[
          '果子王鲜桃需要采摘员50名...',
          '黄玉梨需要喷农药10人，200...',
          '果子王鲜桃需要采摘员50名...',
          '黄玉梨需要喷农药10人，200...',
          '果子王鲜桃需要采摘员50名...',
          '黄玉梨需要喷农药10人，200...'
        ],
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        zuobiaoStyle:0,
        zuobiaoList:[
          {
            top:51,
            left:38,
            name:'枫彩集团',
            model:true,
            news:'枫彩集团的花期还有3天就...',
            news1:'黄玉梨需要喷农药10人，200...',
            img:'/static/img1/ncpsy/fcpt/pto-fiv.png'
          },
          {
            top:46,
            left:37,
            name:'大泉湖',
            model:false,
            news:'果子王的鲜桃快要成熟啦...',
            news1:'果子王鲜桃需要采摘员50名...',
            img:'/static/img1/ncpsy/fcpt/pto-one.png'
          },
          {
            top:30,
            left:5,
            name:'止马岭',
            model:false,
            news:'枫彩集团的花期还有3天就...',
            news1:'果子王鲜桃需要采摘员50名...',
            img:'/static/img1/ncpsy/gzwxt/pto-fiv.png'
          },
          {
            top:64,
            left:38,
            name:'果子王仙桃',
            model:false,
            news:'果子王的鲜桃快要成熟啦...',
            news1:'果子王鲜桃需要采摘员50名...',
            img:'/static/img1/ncpsy/gzwxt/pto-one.png'
          },
          {
            top:77,
            left:22,
            name:'农科院基地',
            model:false,
            news:'枫彩集团的花期还有3天就...',
            news1:'果子王鲜桃需要采摘员50名...',
            img:'/static/img1/ncpsy/gzwxt/pto-one.png'
          },
          {
            top:86,
            left:18,
            name:'巴布洛生态谷',
            model:false,
            news:'果子王的鲜桃快要成熟啦...',
            news1:'黄玉梨需要喷农药10人，200...'
          },
          {
            top:83,
            left:33,
            name:'大展黄玉梨',
            model:false,
            news:'枫彩集团的花期还有3天就...',
            news1:'果子王鲜桃需要采摘员50名...'
          },
          {
            top:83,
            left:56,
            name:'福朝葡萄',
            model:false,
            news:'黄玉梨需要喷农药10人，200...',
            news1:'黄玉梨需要喷农药10人，200...'
          },
          {
            top:67,
            left:65,
            name:'智慧大棚',
            model:false,
            news:'枫彩集团的花期还有3天就...',
            news1:'果子王鲜桃需要采摘员50名...'
          },
          {
            top:69,
            left:66,
            name:'智慧温室',
            model:false,
            news:'果子王的鲜桃快要成熟啦...',
            news1:'黄玉梨需要喷农药10人，200...'
          },
          {
            top:20,
            left:28,
            name:'兴泉甘薯基地',
            model:false,
            news:'枫彩集团的花期还有3天就...',
            news1:'果子王鲜桃需要采摘员50名...'
          },
          {
            top:28,
            left:59,
            name:'立友合作社',
            model:false,
            news:'果子王的鲜桃快要成熟啦...',
            news1:'黄玉梨需要喷农药10人，200...'
          },
          {
            top:73,
            left:54,
            name:'竹镇镇人民政府',
            model:false,
            news:'枫彩集团的花期还有3天就...',
            news1:'黄玉梨需要喷农药10人，200...'
          },

        ],
      }
    },
    methods:{
      zuobiaoChange(index){
        console.log(index);
        this.zuobiaoStyle=index;
        var yuan=document.getElementsByClassName('zuobiao-myuan');
        var yuan1=document.getElementsByClassName('zuobiao-myuan1');
        for (var i =0;i<this.zuobiaoList.length;i++){
          if( i ==index){
            this.zuobiaoList[index].model=true;
            yuan[index].classList.add('locationicon');
            yuan1[index].classList.add('locationicon1');
            yuan[index].classList.remove('zuobiao-yuan');
            yuan1[index].classList.remove('zuobiao-yuan1');
          }
          else {
            this.zuobiaoList[i].model=false;
            yuan[i].classList.add('zuobiao-yuan');
            yuan1[i].classList.add('zuobiao-yuan1');
            yuan1[i].classList.remove('locationicon1');
          }
        }
      },
      lunbo(){
        var speed=40;
        var fDemo=document.getElementById('demo');
        var fDemo1=document.getElementById('demo1');
        var fDemo2=document.getElementById('demo2');
        function Marquee1(){
          if(fDemo2.offsetHeight-fDemo.scrollTop<=0)
            fDemo.scrollTop-=fDemo1.offsetHeight
          else{
            fDemo.scrollTop++
          }
        }
        var MyMar1=setInterval(Marquee1,speed)
        fDemo.onmouseover=function() {clearInterval(MyMar1)}
        fDemo.onmouseout=function() {MyMar1=setInterval(Marquee1,speed)}
      },
      lunbo1(){
        let speed=40;
        let fDemo=document.getElementById('demof');
        let fDemo1=document.getElementById('demof1');
        let fDemo2=document.getElementById('demof2');
        function Marquee1(){
          if(fDemo2.offsetHeight-fDemo.scrollTop<=0)
            fDemo.scrollTop-=fDemo1.offsetHeight
          else{
            fDemo.scrollTop++
          }
        }
        let MyMar1=setInterval(Marquee1,speed)
        fDemo.onmouseover=function() {clearInterval(MyMar1)}
        fDemo.onmouseout=function() {MyMar1=setInterval(Marquee1,speed)}
      },
      closeModel(index){
        this.zuobiaoList[index].model=false;
        }
      }
  }

</script>

<style scoped>

 .longtou-detail{
   width: 100%;
   height: 100%;
    background: url("/static/img1/home-bg.png") no-repeat right center;
    background-size: 100% 100%;
 }
  .longtou-detail-title{
    margin-left: 24px;
  }

  .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  .dz-left{
    padding-left: 10px;
    padding-top: 10px;
  }
  .dz-left p{
    font-size: 11px;
    line-height: 11px;
    line-height: 11px;
    color: #8ed0ff;
    margin-top: 10px;
    padding-left: 5px;
  }
  .lleft{
    font-size: 24px;
    color: #d6e4ff;
    line-height: 24px;
    margin-left: 5px;
  }
 .dz-left1{
   width: 100%;
   height: 208px;
   background: url("/static/img1/home-data.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top: 30px;
 }
  .dz-left{
    /*width: 500px;*/
    width: 100%;
    height: 466px;
    margin-top: 20px;
  }

  .dz-left1{
    width: 100%;
    height: 208px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 20px;
  }
 .dz-left2{
   width: 100%;
   height: 251px;
   background: url("/static/img1/home-data.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top:15px;
   box-sizing: border-box;
   padding-top: 10px;
   padding-left: 20px;
 }
 .ileft{
   width: 100%;
   height: 251px;
   background: url("/static/img1/sanchanronghe/pic-one.png") no-repeat center center;
   background-size: 100% 100%;
   margin-top:15px;
 }
 .title1{
   /*margin-left:20px;*/
   width: 64px;
   height: 15px;
   font-family: FZLTZHUNHK--GBK1-0;
   font-size: 16px;
   font-weight: normal;
   font-stretch: normal;
   letter-spacing: 0px;
   color: #c5e7ff;
 }
 .notice{
   overflow: hidden;
   position: relative;
 }
 ul{
   margin: 0;
   padding: 0;
   margin-top: 20px;
   width: 180px;
 }
 li{
   width: 200px;
   height: 18px;
   font-family: FZLTZHK--GBK1-0;
   font-size: 14px;
   line-height: 14px;
   color: #8ed0ff;
   margin: 0;
   padding: 0;
   margin-top: 14px;
   margin-left: 15px;
   cursor: pointer;
 }
  li p{
    width: 100%;
  }
 ul li :hover{
   border: 1px solid #006dc0;
   background-color: #336799;
 }
 .el-row{
   margin: 0 !important;
 }
 /*地图*/
 .sanchang-map{
   background: url("/static/img1/sanchanronghe/map  K.png") no-repeat center center;
   background-size: 100% 100%;
   /*z-index: -2;*/
 }
 .zuzeng-map{
   width: 412px;
   height: 348px;
   position: absolute;
   top:18%;
   left: 36%;
 }
 .zuzeng-map-bg{
   width: 100%;
   height: 100%;
   background: url("/static/img1/home-map.png") no-repeat center center;
   background-size: 100% 100%;
   position: relative;
 }
 .locationicon {
   width: 14px;
   height: 14px;
   background-color: #ff0000;
   border-radius: 50%;
   position: absolute;
   top:0;
   left: 0;
 }
 .locationicon1 {
   width: 14px;
   height: 14px;
   background-color: #ff0000;
   border-radius: 50%;
   box-shadow: 0px 0px 0px 8px
   rgba(166, 41, 62, 0.55);
   animation: warn 1.2s ease-in-out;
   animation-iteration-count: infinite;
 }
 .zuobiao-icon{
   position: absolute;
   color: #bae9ff;
   font-size: 12px;
   cursor:pointer;
 }
 .zuobiao-yuan{
   width: 10px;
   height: 10px;
   border-radius: 50%;
   background-color: #e9af00;
   position: relative;
 }
 .zuobiao-yuan1{
   width: 10px;
   height: 10px;
   border-radius: 50%;
   /*background-color: #e9af00;*/
   box-shadow: 0px 0px 0px 8px rgba(233, 175, 0, 0.8);
   animation: warn 1.2s  ease-in-out;
   animation-iteration-count: infinite;
   margin-top: -10px;
 }
 .zuobiao-info{
   width: 100px;
   position: absolute;
   top: 0;
   left: 15px;
 }

 /*model*/
 .lajifenlei-model{
   width: 220px;
   height: 231px;
   background-color: #041624;
   border: solid 2px #4f6273;
   position: fixed;
   top:290px;
   left:  1135px;

 }
 .lajifenlei-model {
   padding-left: 20px;
   padding-top: 10px;
   font-size: 14px;
   line-height: 19px;
   color: #9ecafd;
 }

 .lajifenlei-model div{
   width: 199px;
   height: 113px;
   border: 1px solid gray;
   margin-top: 20px;
 }
 .lajifenlei-model .title1 li{
   margin: 0;
   font-size: 18px;
   line-height: 18px;
   color: #aee2ff;
   padding: 0;
   margin-left: 14px;
   margin-top: -15px;
 }
 .lajifenlei-model .content1{
   margin: 0;
   width: 198px;
   font-size: 14px;
   line-height: 34px;
   padding: 0;
 }
 /*模态框上的x*/

 [class|=icon]{  /*所有类名以“icon-”开头的*/
   width: 20px;
   height: 20px;
   top: 6%;  /*上边距为父元素50%*/
   margin-top: -10px;  /*再往上移动自身高度一半，就垂直居中了*/
   position: absolute;  /*有些图标高度不是20px，那么margin-top要单独设置*/
 }

 [class|=icon]::before,  /*所有类名以“icon-”开头的伪元素*/
 [class|=icon]::after{
   content: "";
   position: absolute;
   height: 0;
   width: 0;
 }

 #span1 .icon-cross{
   right:2px;
 }
 #span1 .icon-cross::before,
 #span1 .icon-cross::after{
   background: #aaa;
 }
 #span1 .icon-cross:hover::before,
 #span1 .icon-cross:hover::after{
   background: #00a1d6;
 }
 .icon-cross::before,
 .icon-cross::after{
   height: 16px;
   width: 1.5px;
   top: 2px;
   right: 9px; /*设置right和top使叉号居中*/
   border-radius: 1px;
 }
 .icon-cross::before{
   transform: rotate(45deg);
 }
 .icon-cross::after{
   transform: rotate(-45deg);
 }
 /*推送轮播文字栏样式*/
 #demo ul{
   margin:0;
   padding:0;
   list-style:none;
 }
 #demo li a{
   display:block;
 }
 #demo{
   padding-top: 10px;
   float:left;
   width:180px;
   height:200px;
   display:inline;
   overflow:hidden;
   margin-top: 8px;
 }
 #demof ul{
   margin:0;
   padding:0;
   list-style:none;
 }
 #demof li a{
   display:block;
 }
 #demof{
   float:left;
   width:180px;
   height:200px;
   display:inline;
   overflow:hidden;
   margin-top: 8px;

 }

</style>
