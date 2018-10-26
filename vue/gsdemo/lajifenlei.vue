<template>
<div class="longtou-detail">
  <div class="longtou-detail-title">
    <p>
      <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
      <span style="color: #afdeff; font-size: 30px;line-height: 32px">垃圾分类</span>
      <span style="color: #497da1;font-size: 18px; line-height: 30px">巴布洛蔬菜大棚重点致力于农业信息化、数字化、可视化、远程操控...</span>
    </p>
  </div>
  <div class="longtou-detail-content">
    <el-row :gutter="12">
      <el-col :span="6">
        <div class="dz-left">
          <echarts117></echarts117>
        </div>
        <div class="dz-left">
          <echarts118></echarts118>
        </div>
        <div class="dz-left">
          <echarts119></echarts119>
        </div>
      </el-col>
      <el-col :span="18">
         <div class="dz-content">
           <div class="zuzeng-map">
             <div class="zuzeng-map-bg">
               <div class="zuobiao-icon" :style="{top:item.top+'%',left:item.left + '%'} " v-for="(item,index) in zuobiaoList" @click="zuobiaoChange(index)">
                 <div class="zuobiao-yuan" >
                   <div :class="{locationicon:index == zuobiaoStyle}" ></div>
                 </div>
                 <div class="zuobiao-yuan1"></div>
                 <span class="zuobiao-info">{{item.name}}</span>
                 <div class="lajifenlei-model" v-if="zuobiaoList[index].model">
                   <span>{{item.name}}</span>
                   <p v-for="item1 in item.modelList">
                     <span>{{item1.modelName}}}</span>
                     <span>{{item1.modelValue}}</span>
                   </p>
                 </div>
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
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
    import echarts117 from '@/components/zuzengData/zuzengEcharts/ljEcharts/echarts117'
    import echarts118 from '@/components/zuzengData/zuzengEcharts/ljEcharts/echarts118'
    import echarts119 from '@/components/zuzengData/zuzengEcharts/ljEcharts/echarts119'
    export default {
      name: "lajifenlei",
      components:{
        echarts117,echarts118,echarts119
      },
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
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:51,
              left:38,
              name:'枫彩集团',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:30,
              left:5,
              name:'止马岭',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:74,
              left:36,
              name:'果子王仙桃',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:80,
              left:25,
              name:'农科院基地',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:85,
              left:20,
              name:'巴布洛生态谷',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:85,
              left:37,
              name:'大展黄玉梨',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:80,
              left:55,
              name:'福朝葡萄',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:74,
              left:68,
              name:'智慧大棚',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:80,
              left:70,
              name:'智慧温室',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:22,
              left:28,
              name:'兴泉合作社',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:28,
              left:60,
              name:'立友合作社',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
            },
            {
              top:70,
              left:55,
              name:'竹镇镇人民政府',
              model:false,
              modelList:[
                {
                  modelName:'可回收垃圾',
                  modelValue:'12吨'
                },
                {
                  modelName:'有害垃圾',
                  modelValue:'342吨'
                },
                {
                  modelName:'餐厨垃圾',
                  modelValue:'120吨'
                },
                {
                  modelName:'其他垃圾',
                  modelValue:'58吨'
                }

              ]
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
 .longtou-detail{
   width: 100%;
   height: 100%;
   background-color:#020b15 ;
   background-size: 100% 100%;
 }
  .longtou-detail-title{
    /*border-left: solid 1px #006dc0;*/
    border-bottom: solid 1px #006dc0;
    /*border-right: solid 1px #006dc0;*/
    padding-left: 10px;
  }
 .longtou-detail-title p{
   line-height: 40px;
 }
  .longtou-detail-content{
    margin: 18px 10px 0 10px;
  }
  .dz-left{
    width: 100%;
    height: 145px;
    background: url("/static/img1/lajifenlei-newcard.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 14px;
  }
  .dz-content{
    width: 100%;
    height: 467px;
    background: url("/static/img1/lajifenlei-map.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }

 /*地图*/
 .zuzeng-map{
   width: 483px;
   height: 405px;
   position: absolute;
   top:6%;
   left: 28%;
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
  .lajifenlei-model{
    width: 195px;
    height: 109px;
    background: url("/static/img1/laji-model.png") no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    top:-102px;
    left:4px;
    z-index: 999;
  }
  .lajifenlei-model>span:first-child{
    font-size: 15px;
    color: #aee2ff;
    line-height: 30px;
    margin-left: 25px;
  }
 .lajifenlei-model p{
   padding-left: 8px;
   font-size: 12px;
   line-height: 18px;
   color: #74c6ff;
 }
</style>
