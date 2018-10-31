<template>
  <div class="myhome">
    <div class="dz-content">
      <div class="zuzeng-map">
        <div class="zuzeng-map-bg">
          <div class="zuobiao-icon" :style="{top:item.top+'%',left:item.left + '%'} " v-for="(item,index) in zuobiaoList" @click="zuobiaoChange(index)">
            <div class="zuobiao-yuan" >
              <div :class="{locationicon:index == zuobiaoStyle}" ></div>
            </div>
            <div class="zuobiao-yuan1"></div>
            <span class="zuobiao-info">{{item.name}}</span>
            <transition mode="out-in" enter-active-class="bounceInRight" leave-active-class="bounceOutRight">
              <div class="pig" v-if="zuobiaoList[index].model">
              <div class="pig1">
                <p>{{item.name}}</p>
              </div>
              <div class="pig2">
                <img src="/static/img1/video.png" alt="" />
                <p>
                  南京润麟农业科技有限公司位于南京市六合区竹镇镇乌山村瓦谢组，公司主要业务涉及：生猪养殖、农业项目开发、苗木、果树种植、销售、农业技术咨询服务、饲料及添加剂、初级农产品及销售等。南京润麟农业是南京市种养结合示范点、全国生猪标准化示范场。
                </p>
              </div>
              <div class="pig3">
                <div class="pig4">
                  <div class="pig5" v-for="val in item.bfelemet">
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
                  <div class="pig9"  v-for="url in item.imglist">
                    <img  :src="url" alt="">
                  </div>
                  <router-link :to="item.path">
                  <div class="pig10">
                    查看详情
                  </div>
                  </router-link>
                </div>
              </div>
            </div>
            </transition>
          </div>
        </div>
        <!--<div class="lajifenlei-model">-->
        <!--<span>止马岭</span>-->
        <!--<p>-->
        <!--<span>可回收垃圾：</span>-->
        <!--<span>12吨</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>有害垃圾：</span>-->
        <!--<span>342吨</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>餐厨垃圾：</span>-->
        <!--<span>120吨</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>其他垃圾：</span>-->
        <!--<span>58吨</span>-->
        <!--</p>-->
        <!--</div>-->
      </div>
    </div>
    <div class="qiye">
      <!--<div class="pig">-->
        <!--<div class="pig1">-->
          <!--<p>{{zuobiaoList.name}}</p>-->
        <!--</div>-->
        <!--<div class="pig2">-->
          <!--<img src="/static/img1/video.png" alt="" />-->
          <!--<p>-->
            <!--南京润麟农业科技有限公司位于南京市六合区竹镇镇乌山村瓦谢组，公司主要业务涉及：生猪养殖、农业项目开发、苗木、果树种植、销售、农业技术咨询服务、饲料及添加剂、初级农产品及销售等。南京润麟农业是南京市种养结合示范点、全国生猪标准化示范场。-->
          <!--</p>-->
        <!--</div>-->
        <!--<div class="pig3">-->
          <!--<div class="pig4">-->
            <!--<div class="pig5" v-for="val in bfelemet">-->
              <!--<span class="left">{{val.text}}</span ><span class="right">{{val.parameter}}</span>-->
            <!--</div>-->
            <!--<div class="pig6">-->
              <!--<span class="redgird"></span><span>正常</span> <span class="greengird"></span><span>异常</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="pig7">-->
            <!--<img src="/static/img1/xuxian.png" alt="">-->
          <!--</div>-->
          <!--<div class="pig8" >-->
            <!--<div class="pig9"  v-for="url in imglist">-->
              <!--<img  :src="url" alt="">-->
            <!--</div>-->
            <!--<div class="pig10">-->
              <!--查看详情-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: "longtouqiye",
    data(){
      return{
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        zuobiaoStyle:0,
        zuobiaoList:[
          {
            top:46,
            left:37,
            name:'大泉湖',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:51,
            left:38,
            name:'枫彩集团',
            model:false,
            path:'/longtouqiyedetail6',
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:30,
            left:5,
            name:'止马岭',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:74,
            left:36,
            name:'果子王仙桃',
            model:false,
            path:'/longtouqiyedetail7',
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:80,
            left:25,
            name:'农科院基地',
            path:'/longtouqiyedetail10',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:85,
            left:20,
            name:'巴布洛生态谷',
            path:'/longtouqiyedetail1',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:85,
            left:37,
            name:'大展黄玉梨',
            path:'/longtouqiyedetail',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:80,
            left:55,
            name:'福朝葡萄',
            path:'/longtouqiyedetail8',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:74,
            left:68,
            name:'智慧大棚',

            model:false,
          },
          {
            top:80,
            left:70,
            name:'智慧温室',
            path:'/longtouqiyedetail9',//智能温室
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:22,
            left:28,
            name:'兴泉合作社',
            path:'/longtouqiyedetail5',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:28,
            left:60,
            name:'立友合作社',
            path:'/longtouqiyedetail4',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },
          {
            top:70,
            left:55,
            name:'竹镇镇人民政府',
            model:false,
            bfelemet:[
              {text:'温度',parameter:'24℃'},
              {text:'湿度',parameter:'65%'},
              {text:'氨气',parameter:'0.001'},
              {text:'硫化氢',parameter:'0.005'},
              {text:'光照',parameter:'110'}
            ],
            imglist:['/static/img1/img1.png','/static/img1/img2.png','/static/img1/img3.png']
          },


        ],
      }
    },
    methods:{
      zuobiaoChange(index){
        this.zuobiaoStyle=index;
        for (var i =0;i<this.zuobiaoList.length;i++){
          if( i ==index){
            this.zuobiaoList[index].model=true;
          }
          else {
            this.zuobiaoList[i].model=false;
          }
        }
      },
    }
  }

</script>

<style scoped>
  @import "../../assets/css/animate.css";
  a {
    text-decoration: none;
    color: #ffffff;
  }
  .myhome{
    width: 100% ;
    height: 100% ;
    background: url("/static/img1/longtouqiye-bg.png") no-repeat center center;
    background-size: 100% 130%;
    position: relative;
    margin-top: -28px;
  }
  /*地图*/
  /*地图*/
  .zuzeng-map{
    width: 483px;
    height: 405px;
    position: absolute;
    top:16%;
    left: 28%;
    margin-left: -250px;
  }
  .zuzeng-map-bg{
    width: 100%;
    height: 100%;
    background: url("/static/img1/home-map.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }
  .locationicon {
    width: 78px;
    height: 93px;
    background: url("/static/img1/LocationIcon.png") no-repeat ;
    background-size: 100% 100%;
    position: absolute;
    top:-46px;
    left: -30px;
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
    box-shadow: 0px 0px 0px 8px
    rgba(233, 175, 0, 0.55);
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

  .pig {
    width: 802px;
    height: 450px;
    position: fixed;
    top:130px;
    left: 750px;
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
    margin-left: 120px;
    width: 148px;
    height: 40px;
    margin-top:20px;
    text-align: center;
    line-height: 40px;
    background: url(/static/img1/button.png) no-repeat;
    color: #8ed0ff;
    font-size: 22px;
  }

</style>
