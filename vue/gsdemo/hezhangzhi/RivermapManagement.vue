<template>
    <!--<河长制电子地图-->
  <div class="dz-content">
    <div class="zuzeng-map">
      <div class="zuzeng-map-bg">
        <div class="zuobiao-icon" :style="{top:item.top+'%',left:item.left + '%'} "
             v-for="(item,index) in zuobiaoList" @click="zuobiaoChange(index)">
          <div class="zuobiao-myuan zuobiao-yuan">
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
          <div class="lajifenlei-model1" v-if="zuobiaoList[index].model">
            <p class="title1">
            <ul>
              <li>{{item.name}}</li>
            </ul>
            <span id="span1" @click="closeModel(index)"><i class="icon-cross"></i></span></p>
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
            <p style="margin-top: 5px">说明：......</p>
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
        name: "RivermapManagement",
        data() {
        return {
          value1: true,
          value2: true,
          value3: true,
          value4: true,
          zuobiaoStyle: 0,
          zuobiaoList: [
            {
              top: 46,
              left: 37,
              name: '丰乐河',
              model: false,
              img: '/static/img1/heliu/himg1.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '薛后生',
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇大泉',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '18902514289',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '18013031507',
                },
              ]
            },
            {
              top: 51,
              left: 38,
              name: '皂河右岸',
              model: false,
              img: '/static/img1/heliu/himg2.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '李保明 '
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇大泉',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13601430847 ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '57680778',
                },
              ]
            },
            {
              top: 30,
              left: 5,
              name: '皂河左岸',
              model: false,
              img: '/static/img1/heliu/himg3.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '余秀芳'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇侯桥',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13218899747  ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '15916322706',
                },
              ]
            },
            {
              top: 64,
              left: 38,
              name: '八里河',
              model: false,
              img: '/static/img1/heliu/himg4.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '潘金梅'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇八里',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13405884916   ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '19850899455',
                },
              ]
            },
            {
              top: 77,
              left: 22,
              name: '皂河二期',
              model: false,
              img: '/static/img1/heliu/himg5.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '黄凤鸣'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇送驾',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13222781856   ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '13126731846',
                },
              ]
            },
            {
              top: 86,
              left: 18,
              name: '耿跳河 ',
              model: false,
              img: '/static/img1/heliu/himg6.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '黄文和'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇光华',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13914454116    ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '18013327696',
                },
              ]
            },
            {
              top: 83,
              left: 33,
              name: '向阳河',
              model: false,
              img: '/static/img1/heliu/himg7.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '汪庆江'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇金磁',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13182882802     ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '13565875066',
                },
              ]
            },
            {
              top: 83,
              left: 56,
              name: '东大河',
              model: false,
              img: '/static/img1/heliu/himg8.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '周明龙'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇乌石',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13814501615 ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '13260933135',
                },
              ]
            },
            {
              top: 57,
              left: 65,
              name: '耿跳河1',
              model: false,
              img: '/static/img1/heliu/himg9.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '史家仁'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇烟墩',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '15077893622 ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '13839166936',
                },
              ]
            },
            {
              top: 69,
              left: 66,
              name: '中黄河',
              model: false,
              img: '/static/img1/heliu/himg10.png',
              modelList: [
                {
                  modelName: '责任人：',
                  modelValue: '王景华'
                },
                {
                  modelName: '巡查记录：',
                  modelValue: '2018/08/29'
                },
                {
                  modelName: '环境质量：',
                  modelValue: '良好'
                }
              ],
              modelList1:[
                {
                  modelName: '行政区域：',
                  modelValue: '竹镇石婆',
                },
                {
                  modelName: '联系方式一：',
                  modelValue: '13022501291 ',
                },
                {
                  modelName: '联系方式二：',
                  modelValue: '13260933135',
                },
              ]
            },
            // {
            //   top:20,
            //   left:28,
            //   name:'兴泉合作社',
            //   model:false,
            //   img:'/static/img1/xqhs/pic-one.png',
            //   modelList:[
            //     {
            //       modelName:'责任人：',
            //       modelValue:'徐杰'
            //     },
            //     {
            //       modelName:'巡查记录：',
            //       modelValue:'2018/08/29'
            //     },
            //     {
            //       modelName:'环境质量：',
            //       modelValue:'良好'
            //     }
            //   ]
            // },
            // {
            //   top:28,
            //   left:59,
            //   name:'立友合作社',
            //   model:false,
            //   img:'/static/img1/ncpsy/gzwxt/pto-one.png',
            //   modelList:[
            //     {
            //       modelName:'责任人：',
            //       modelValue:'周刚'
            //     },
            //     {
            //       modelName:'巡查记录：',
            //       modelValue:'2018/08/29'
            //     },
            //     {
            //       modelName:'环境质量：',
            //       modelValue:'良好'
            //     }
            //   ]
            // },
            // {
            //   top:73,
            //   left:54,
            //   name:'竹镇镇人民政府',
            //   model:false,
            //   img:'/static/img1/ncpsy/gzwxt/gzw.png',
            //   modelList:[
            //     {
            //       modelName:'责任人：',
            //       modelValue:'吴迪'
            //     },
            //     {
            //       modelName:'巡查记录：',
            //       modelValue:'2018/08/29'
            //     },
            //     {
            //       modelName:'环境质量：',
            //       modelValue:'良好'
            //     }
            //   ]
            // },


          ],
        }
      },
        mounted(){
        this.zuobiaoChange(0);
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
    height: 151px;
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
    width: 226px;
    height: 84px;
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
  /*//新填的弹出框*/
  .lajifenlei-model1{
    width: 400px;
    height: 300px;
    background-color: #041624;
    border: solid 2px #4f6273;
    position: fixed;
    top:225px;
    left:  1335px;

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
