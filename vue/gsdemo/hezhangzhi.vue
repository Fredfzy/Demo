<template>
  <div class="longtou-detail">
    <div class="longtou-detail-title">
      <p>
        <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
        <span style="color: #afdeff; font-size: 30px;line-height: 32px">河长制</span>
        <span style="color: #497da1;font-size: 18px; line-height: 30px">由中国各级党政主要负责人担任“河长”，负责组织领导相应河湖的管理和保护工作</span>
      </p>
    </div>
    <div class="longtou-detail-content">
      <el-row :gutter="12">
        <el-col :span="6">
          <div class="dz-left">
            <echarts114></echarts114>
          </div>
          <div class="dz-left">
            <echarts115></echarts115>
          </div>
          <div class="dz-left">
            <echarts116></echarts116>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="dz-content">
            <div class="zuzeng-map">
              <div class="zuzeng-map-bg">
                <div class="zuobiao-icon" :style="{top:item.top+'%',left:item.left + '%'} " v-for="(item,index) in zuobiaoList" @click="zuobiaoChange(index)">
                  <div class="zuobiao-myuan zuobiao-yuan" >
                    <!--<div :class="{locationicon:index == zuobiaoStyle}" ></div>-->
                  </div>
                  <div class="zuobiao-myuan1 zuobiao-yuan1">
                    <!--<div :class="{locationicon1:index == zuobiaoStyle}" ></div>-->
                  </div>
                  <span class="zuobiao-info">{{item.name}}</span>
                  <div class="lajifenlei-model" v-if="zuobiaoList[index].model">
                    <p v-for="item1 in item.modelList">
                      <span>{{item1.modelName}}</span>
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
  import echarts114 from '@/components/zuzengData/zuzengEcharts/hzEcharts/echarts114'
  import echarts115 from '@/components/zuzengData/zuzengEcharts/hzEcharts/echarts115'
  import echarts116 from '@/components/zuzengData/zuzengEcharts/hzEcharts/echarts116'
    export default {
      name: "hezhangzhi",
      components:{
        echarts114,echarts115,echarts116
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
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
                  modelName:'责任人：',
                  modelValue:'xxx'
                },
                {
                  modelName:'巡查记录：',
                  modelValue:'2018/08/29'
                }
              ]
            },


          ],
        }
      },
      methods:{
        zuobiaoChange(index){
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
    box-shadow: 0px 0px 0px 8px rgba(233, 175, 0, 0.55);
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
    width: 226px;
    height: 60px;
    background-color: #091e35;
    border: solid 1px #6895c2;
    opacity: 0.64;
    position: absolute;
    top:-64px;
    left:-220px;
    z-index: 999;
  }
  .lajifenlei-model p{
    padding-left: 8px;
    font-size: 16px;
    line-height: 28px;
    color:#9ecafd;
  }
</style>
