<template>
  <div class="longtou-detail">
    <div class="longtou-detail-title">
      <p>
        <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
        <span style="color: #afdeff; font-size: 30px;line-height: 32px">HACCP农产品溯源系统</span>
        <span style="color: #497da1;font-size: 18px; line-height: 30px">简介...</span>
      </p>
    </div>
    <div class="longtou-detail-content">
      <el-row :gutter="12">
        <el-col :span="5">
          <div class="shuyuan-left">
            <div class="shuyuan-left-item">
              <p style="font-size: 16px;color: #c5e7ff;">兴泉甘薯关键节点溯源信息</p>
              <p style="font-size: 14px;line-height: 28px;color: #80a5cf;">喷洒农药</p>
              <div class="nongyaodetail">
                <div class="nongyaodetail-img"></div>
                <div class="nongyaodetail-info">
                  <p>时间：7月10日</p>
                  <p>农药：烯禾啶除草剂</p>
                  <p>农药登记证：PD20082886</p>
                  <p>有效成分：烯禾啶12.5%(乳油)   </p>
                </div>
              </div>
              <p>产品规格：450ml*20瓶/件</p>
              <p>用量：4瓶/亩       </p>
              <p>施用面积：200亩</p>
              <p>功效：烯禾啶属环己酮类除草剂，是内吸传导型茎叶处理剂，对禾本科杂草有活性，对阔叶杂草无效。</p>
              <p>防治对象：禾本科杂草如稗草、野燕草、狗尾草、马唐、牛筋草、画眉草、看麦娘等。</p>
            </div>
            <div class="shuyuan-left-item">
              <p style="font-size: 16px;color: #c5e7ff;">兴泉甘薯关键节点溯源信息</p>
              <p style="font-size: 14px;line-height: 28px;color: #80a5cf;">喷洒农药</p>
              <div class="nongyaodetail">
                <div class="nongyaodetail-img"></div>
                <div class="nongyaodetail-info">
                  <p>时间：7月10日</p>
                  <p>农药：烯禾啶除草剂</p>
                  <p>农药登记证：PD20082886</p>
                  <p>有效成分：烯禾啶12.5%(乳油)   </p>
                </div>
              </div>
              <p>产品规格：450ml*20瓶/件</p>
              <p>用量：4瓶/亩       </p>
              <p>施用面积：200亩</p>
              <p>功效：烯禾啶属环己酮类除草剂，是内吸传导型茎叶处理剂，对禾本科杂草有活性，对阔叶杂草无效。</p>
              <p>防治对象：禾本科杂草如稗草、野燕草、狗尾草、马唐、牛筋草、画眉草、看麦娘等。</p>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
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
                    <div class="lajifenlei-model-info">
                      <p  v-for="item1 in item.modelList">{{item1.modelName}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="shuyuan-right">
            <div class="dz-left1-img">
              <p class="dz-left1-img-title">兴泉红薯图片集</p>
              <div class="dz-left1-img1"></div>
              <div class="dz-left1-img2"></div>
            </div>
            <div class="shuyuan-right-info">
              <p class="dz-left1-img-title">农产品检测报告</p>
              <div class="shuyuan-right-img">
                <div class="shuyuan-right-img1"></div>
                <div class="shuyuan-right-img1"></div>
                <div class="shuyuan-right-img1"></div>
                <div class="shuyuan-right-img1"></div>
              </div>
            </div>
          </div>
          <div class="shuyuan-right1">
            <echarts120></echarts120>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import echarts120 from '@/components/zuzengData/zuzengEcharts/suyuanEcharts/echarts120'
    export default {
      name: "nongchanpinsuyuan",
      components:{
        echarts120
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
              top:74,
              left:36,
              name:'果子王鲜桃',
              model:false,
              modelList:[
                {
                  modelName:'果子王鲜桃',
                },
                {
                  modelName:'生产总数：125469吨；批次总数：4；',
                },
                {
                  modelName:'7月2日，灌溉，200亩，喷灌+滴灌2小时',
                },
                {
                  modelName:'8月2日，除草，200亩，喷洒农药，烯禾啶除草剂',
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
                  modelName:'即食玉米',
                },
                {
                  modelName:'生产总数：125469吨；批次总数：4；',
                },
                {
                  modelName:'8月2日，除草，200亩，喷洒农药，烯禾啶除草剂',
                },
                {
                  modelName:'8月15日，施肥，200亩，颗粒氯化铵；',
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
                  modelName:'大展黄玉梨',
                },
                {
                  modelName:'生产总数：125469吨；批次总数：4；',
                },
                {
                  modelName:'8月2日，除草，200亩，喷洒农药，烯禾啶除草剂',
                },
                {
                  modelName:'8月15日，施肥，200亩，颗粒氯化铵；',
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
                  modelName:'福朝葡萄',
                },
                {
                  modelName:'生产总数：125469吨；批次总数：4；',
                },
                {
                  modelName:'7月2日，灌溉，200亩，喷灌+滴灌2小时',
                },
                {
                  modelName:'8月2日，除草，200亩，喷洒农药，烯禾啶除草剂',
                }
              ]
            },
            {
              top:22,
              left:28,
              name:'兴泉甘薯',
              model:false,
              modelList:[
                {
                  modelName:'兴泉甘薯',
                },
                {
                  modelName:'生产总数：125469吨；批次总数：4；',
                },
                {
                  modelName:'8月2日，除草，200亩，喷洒农药，烯禾啶除草剂',
                },
                {
                  modelName:'8月15日，施肥，200亩，颗粒氯化铵；',
                },
                {
                  modelName:'8月27日，除草，200亩，喷洒农药，烯禾啶除草剂',
                },
                {
                  modelName:'9月15日，施肥，200亩，颗粒氯化铵；',
                },
                {
                  modelName:'9月27日，除草，200亩，喷洒农药，烯禾啶除草剂',
                },
                {
                  modelName:'10月15日，施肥，200亩，颗粒氯化铵；',
                },
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
  .dz-content{
    width: 100%;
    height: 476px;
    background: url("/static/img1/shuyuan-content-card.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }
  .shuyuan-left{
    width: 100%;
    height: 476px;
    background: url("/static/img1/shuyuan-left-card.png") no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 20px 15px 0 20px;
  }
  .shuyuan-left .shuyuan-left-item{
    margin-bottom: 8px;
  }
  .shuyuan-left .nongyaodetail-img{
    width: 108px;
    height: 60px;
    background: url("/static/img1/nongyao-img.png") no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
  }
  .shuyuan-left .nongyaodetail-info{
    display: inline-block;
  }
  .shuyuan-left p{
    font-size: 12px;
    line-height: 16px;
    color: #7b9bb2;
  }

  .shuyuan-right{
    width: 100%;
    height: 304px;
    background: url("/static/img1/shuyuan-right-card.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
    padding-left: 18px;
    box-sizing: border-box;
  }
  .dz-left1-img{
    float: left;
  }
  .dz-left1-img-title{
    font-size: 16px;
    line-height: 40px;
    color: #c5e7ff;
  }
  .dz-left1-img1{
    width: 168px;
    height: 94px;
    background: url("/static/img1/shuyuan-img1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: 10px;
    float: left;
  }
  .dz-left1-img2{
    width: 168px;
    height: 94px;
    background: url("/static/img1/shuyuan-img2.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: 10px;
    float: left;
  }
  .shuyuan-right-info{
    float: left;
  }
  .shuyuan-right-img1{
    width: 83px;
    height: 117px;
    background: url("/static/img1/shuyuan-zhengshu.png") no-repeat center center;
    background-size: 100% 100%;
    float: left;
    margin-right: 26px;
  }
  .shuyuan-right1{
    width: 100%;
    height: 156px;
    background: url("/static/img1/shuyuan-right-card1.png") no-repeat center center;
    background-size: 100% 100%;
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
    width: 354px;
    /*height: 60px;*/
    background-color: #0a315b;
    border: solid 1px #83baf2;
    opacity: 0.64;
    position: absolute;
    top:-86px;
    left:-366px;
    z-index: 999;
  }
  .lajifenlei-model {
    padding-left: 8px;
    font-size: 14px;
    line-height: 19px;
    color: #9ecafd;
  }
  .lajifenlei-model .lajifenlei-model-info p:nth-child(1){
    font-size: 18px;
    line-height: 30px;
    color: #ffffff;
  }
  .lajifenlei-model .lajifenlei-model-info p:nth-child(2){
    font-size: 14px;
    line-height: 24px;
    color: #c1ddfe;
  }
</style>
