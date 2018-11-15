<template>
  <!--垃圾运输轨迹追踪-->
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
              <span>{{item1.modelName}}</span>
              <span>{{item1.modelValue}}</span>
            </p>
          </div>
          <div class="lajifenlei-model1" v-if="zuobiaoList[index].model">
            <p class="title1"><ul><li>{{item.name}}</li></ul><span id="span1" @click="closeModel(index)"><i class="icon-cross"></i></span></p>
            <div><img :src="item.img" alt=""></div>
            <p style="display:block;margin-top: 10px;width: 50%;" v-for="item1 in item.modelList">
              <span >{{item1.modelName}}</span>
              <span style="float: right;margin-right: 50px">{{item1.modelValue}}</span>
            </p>
            <div style="float: right;border: none;width: 50%;position: absolute;top: 186px;right: 14px">
              <p style="display:block;margin-top: 10px;" v-for="item1 in item.modelList1">
                <span style="margin-left: 10px">{{item1.modelName}}</span>
                <span style="float: right;">{{item1.modelValue}}</span>
              </p>
            </div>
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
</template>

<script>
    export default {
        name: "RubbishbusManagement",
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
              name:'大泉村积分兑换超市',
              model:true,
              img:'/static/img1/lajifenimg/ljimg1.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第一名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '5000次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '20000元',
                },
              ]
            },
            // {
            //   top:51,
            //   left:38,
            //   name:'竹墩社区积分兑换超市',
            //   model:false,
            //   mg:'/static/img1/lajifenimg/ljimg2.png',
            //   modelList:[
            //     {
            //       modelName:'可回收垃圾',
            //       modelValue:'12吨'
            //     },
            //     {
            //       modelName:'有害垃圾',
            //       modelValue:'342吨'
            //     },
            //     {
            //       modelName:'餐厨垃圾',
            //       modelValue:'120吨'
            //     },
            //     {
            //       modelName:'其他垃圾',
            //       modelValue:'58吨'
            //     }
            //
            //   ]
            // },
            {
              top:30,
              left:5,
              name:'金磁社区积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg3.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第二名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '4500次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '18000元',
                },
              ]
            },
            {
              top:64,
              left:38,
              name:'大侯社区积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg4.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第三名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '4200次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '16852元',
                },
              ]
            },
            {
              top:72,
              left:22,
              name:'大侯垃圾中转站',
              model:false,
              img:'/static/img1/lajifenimg/ljimg5.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '不参与',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '暂无数据',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '暂无数据',
                },
              ]
            },
            {
              top:78,
              left:16,
              name:'石婆村积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg6.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第四名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3900次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '14500元',
                },
              ]
            },
            {
              top:83,
              left:33,
              name:'烟墩社区积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg7.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第十名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3200次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '11000元',
                },
              ]
            },
            {
              top:83,
              left:56,
              name:'侯桥村积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg8.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第五名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3755次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '13000元',
                },
              ]
            },
            {
              top:57,
              left:65,
              name:'光华村积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg9.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第六名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3600次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '12444元',
                },
              ]
            },
            {
              top:69,
              left:66,
              name:'乌石村积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg10.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第七名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3499次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '12222元',
                },
              ]
            },
            {
              top:20,
              left:28,
              name:'八里社区积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg11.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第八名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3400次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '12000元',
                },
              ]
            },
            {
              top:28,
              left:59,
              name:'竹墩社区积分兑换超市',
              model:false,
              img:'/static/img1/lajifenimg/ljimg2.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '第九名',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '3374次',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '11934元',
                },
              ]
            },
            {
              top:76,
              left:47,
              name:'竹镇垃圾中转站',
              model:false,
              img:'/static/img1/lajifenimg/ljimg12.png',
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
              ],
              modelList1:[
                {
                  modelName: '兑换排名：',
                  modelValue: '不参与',
                },
                {
                  modelName: '月兑换次数：',
                  modelValue: '暂无数据',
                },
                {
                  modelName: '月兑换金额：',
                  modelValue: '暂无数据',
                },
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
    /*border-bottom: solid 1px #006dc0;*/
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
    height: 152px;
    background: url("/static/img1/lajifenlei-newcard.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 14px;
  }
  .dz-content{
    width: 100%;
    height: 481px;
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
    left: 14%;
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
    background: url("/static/img1/homezuobiao.png") no-repeat ;
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
    rgba(233, 175, 0, 0.8);
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
  /*//新填的弹出框*/
  .lajifenlei-model1{
    width: 400px;
    height: 300px;
    background-color: #041624;
    border: solid 2px #4f6273;
    position: fixed;
    top:225px;
    left:1335px;

  }
  .lajifenlei-model1{
    padding-left: 20px;
    padding-top: 30px;
    font-size: 14px;
    line-height: 19px;
    color: #9ecafd;
  }

  .lajifenlei-model1 div{
    width: 380px;
    height: 150px;
    border: 1px solid gray;
    margin-top: 20px;
  }
  .lajifenlei-model1 div img{
    width: 100%;
    height: 100%;
  }
  .lajifenlei-model1 .title1 li{
    margin: 0;
    font-size: 18px;
    line-height: 18px;
    color: #aee2ff;
    padding: 0;
    margin-left: 14px;
    margin-top: -15px;
  }
  .lajifenlei-model1 .content1{
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
</style>
