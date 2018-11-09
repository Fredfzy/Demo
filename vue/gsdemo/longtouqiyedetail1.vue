<template>
  <div id="longtouqiyedetail1">
    <div class="longtou-detail">
      <div class="longtou-detail-title">
        <p>
          <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
          <span style="color: #afdeff; font-size: 30px;line-height: 32px">种植业设施示范点——巴布洛蔬菜大棚</span>
          <span style="color: #497da1;font-size: 18px; line-height: 30px">巴布洛蔬菜大棚重点致力于农业信息化、数字化、可视化、远程操控...</span>
          <!--<el-button v-for="(item,index) in isMainlist" type="primary" class="sucai-title-btn1"  @click="isToggle(index)">{{item.name}}</el-button>-->
          <!--<el-button type="primary" class=" sucai-title-btn1"  @click="isToggle"></el-button>-->
          <button v-for="(item,index) in isMainlist" class="mybtn" :class="{mybtn1:isMainStyle==index}" @click="isToggle(index)">{{item.name}}</button>
        </p>
      </div>
      <div class="longtou-detail-content" v-if="isMain">
        <el-row :gutter="12">
          <el-col :span="6">
            <div class="dz-left"></div>
          </el-col>
          <el-col :span="14">
            <div class="dz-content">
              <el-row :gutter="8">
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气温度</p>
                    <p style="font-size: 20px;color: #ffffff;">24℃</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">空气湿度</p>
                    <p style="font-size: 20px;color: #fd0000;">47.7%</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-50%</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">光照强度</p>
                    <p style="font-size: 20px;color: #ffffff;">2500LUX</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：200-1500</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">CO2浓度</p>
                    <p style="font-size: 20px;color: #ffffff;">354PPM</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：0-500PPM</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤温度</p>
                    <p style="font-size: 20px;color: #ffffff;">15℃</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-31℃</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="dz-info">
                    <p style="font-size: 16px;color: #afdeff;">土壤湿度</p>
                    <p style="font-size: 20px;color: #ffffff;">72.7%</p>
                    <p style="font-size: 14px;color: #688599;">阈值范围：25-50%</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="dz-right" style="position: relative">
              <ul style="float:left">
                <li v-for="(img,index) in imglist" v-show="index===mark" :key="index">
                  <a href="#"><img  class="img1" :src="img" alt=""></a>
                </li>
              </ul>
              <img style="position: absolute;right: 0" src="/static/img1/xqhs/jiantou.png" @click="autoPlay" alt="">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="6">
            <div class="dz-left1">
              <el-row :gutter="12">
                <el-col :span="12">
                  <div class="dz-left1-switch">
                    <p>
                      喷灌
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value1"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                  <div class="dz-left1-switch">
                    <p>
                      风机
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value2"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                  <el-button type="primary" class="dz-left1-btn" @click="openModel('dialogVisible')">定时设置</el-button>
                </el-col>
                <el-col :span="12">
                  <div class="dz-left1-switch">
                    <p>
                      滴灌
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value3"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                  <div class="dz-left1-switch">
                    <p>
                      湿帘
                      <el-switch
                        class="dz-left1-myswitch"
                        v-model="value4"
                        active-color="#22ac38"
                        inactive-color="#303d4a">
                      </el-switch>
                    </p>
                  </div>
                  <el-button type="primary" class="dz-left1-btn" @click="openModel('dialogVisible1')">预警设置</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dz-content1">
              <el-row :gutter="8">
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts126></echarts126>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-info1">
                    <echarts125></echarts125>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dz-right1">
                    <echarts124></echarts124>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="longtou-detail-content1" v-if="isMain1" >
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="my-select">
              <!--<custom_select btn-value="查询" :list="list1"></custom_select>-->
              <el-select v-model="value" placeholder="请选择" class="my-select1">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="10">
              <el-col :span="6" v-for="(val,index) in guanliList">
                <div>
                  <el-button type="primary" class="babuluo-shucai-btn" :class="{babuluoBtn1:isMainStyle1==index}" @click="zhchange(index)">{{val.name}}</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="14">
            <div class="huangjing-left">
              <p>环境温度智能控制</p>
              <div class="huangjing-left-content">
                <span style="color: #497da1;">空气湿度:</span>
                <input type="text"> -
                <input type="text"> %
              </div>
              <div class="huangjing-left-content">
                <span style="color: #497da1;">CO2浓度:</span>
                <input type="text"> -
                <input type="text"> PPM
              </div>
              <div class="huangjing-left-content">
                <span style="color: #497da1;">土壤温度:</span>
                <input type="text"> -
                <input type="text"> ℃
              </div>
              <div class="huangjing-left-content">
                <span style="color: #497da1;">光照强度:</span>
                <input type="text"> -
                <input type="text"> LUX
              </div>
              <div class="huangjing-left-content">
                <span style="color: #497da1;">空气温度:</span>
                <input type="text"> -
                <input type="text"> ℃
              </div>
              <div class="huangjing-left-content">
                <span style="color: #497da1;">土壤湿度:</span>
                <input type="text"> -
                <input type="text"> %
              </div>
              <div class="huangjing-btn">
                <el-button type="primary" class="huangjing-btn1">设定</el-button>
                <el-button type="primary" class="huangjing-btn1">启用</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="huangjing-right">
                  <span style="color: #0096cf;font-size: 24px;line-height: 24px;">蔬菜营养管理</span>
                  <p style="color: #afdeff;font-size: 18px;text-align: left;margin-top: 14px">{{guanliModel.guanli1}}</p>
                  <div class="huangjing-right-content">
                    <img :src="guanliModel.img1" alt="" width="92" height="135"
                         style="float: left;margin: 0 10px 0px 0">
                    <p style="text-align: left;font-size: font-size: 14px;line-height: 24px;color: #7b9bb2;">
                      {{guanliModel.guanli1text}}
                    </p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="huangjing-right">
                  <span style="color: #0096cf;font-size: 24px;line-height: 24px;">蔬菜病虫害管理</span>
                  <p style="color: #afdeff;font-size: 18px;text-align: left;margin-top: 14px">{{guanliModel.guanli2}}</p>
                  <div class="huangjing-right-content">
                    <img :src="guanliModel.img2" alt="" width="92" height="135"
                         style="float: left;margin: 0 10px 0px 0">
                    <p style="text-align: left;font-size: font-size: 14px;line-height: 24px;color: #7b9bb2;">
                      {{guanliModel.guanli2text}}
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!--model-->
      <el-dialog
        title="定时设置"
        :visible.sync="dialogVisible"
        width="550"
        class="my-model">
        <div class="my-model-content">
          <span class="my-span">喷灌:</span>
          <el-input
            placeholder="请输入"
            suffix-icon="el-icon-date"
            v-model="input1"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            suffix-icon="el-icon-date"
            v-model="input2"
            class="my-input1">
          </el-input>
        </div>
        <div class="my-model-content">
          <span class="my-span">滴灌:</span>
          <el-input
            placeholder="请输入"
            suffix-icon="el-icon-date"
            v-model="input3"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            suffix-icon="el-icon-date"
            v-model="input4"
            class="my-input1">
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="my-model-btn">提交</el-button>
      </span>
      </el-dialog>
      <el-dialog
        title="定时设置"
        :visible.sync="dialogVisible1"
        width="550"
        class="my-model1">
        <div class="my-model-content">
          <span class="my-span">空气温度:</span>
          <el-input
            placeholder="请输入"
            v-model="input5"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input6"
            class="my-input1">
          </el-input>
          <span> ℃</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">空气湿度:</span>
          <el-input
            placeholder="请输入"
            v-model="input7"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input8"
            class="my-input1">
          </el-input>
          <span> %</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">CO2浓度:</span>
          <el-input
            placeholder="请输入"
            v-model="input9"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input10"
            class="my-input1">
          </el-input>
          <span> PPM</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">光照强度:</span>
          <el-input
            placeholder="请输入"
            v-model="input11"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input12"
            class="my-input1">
          </el-input>
          <span> LUX</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">土壤温度:</span>
          <el-input
            placeholder="请输入"
            v-model="input13"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input14"
            class="my-input1">
          </el-input>
          <span> ℃</span>
        </div>
        <div class="my-model-content">
          <span class="my-span">土壤湿度:</span>
          <el-input
            placeholder="请输入"
            v-model="input15"
            class="my-input1">
          </el-input>
          <span>- -</span>
          <el-input
            placeholder="请输入"
            v-model="input16"
            class="my-input1">
          </el-input>
          <span> %</span>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false" class="my-model-btn">提交</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import echarts124 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts124'
  import echarts125 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts125'
  import echarts126 from '@/components/zuzengData/zuzengEcharts/blscEcharts/echarts126'
  // import custom_select from '@/components/zuzengData/zuzengCommon/custom-select'

  export default {
    name: "longtouqiyedetail1",
    components: {
      echarts124, echarts125, echarts126
    },
    data() {
      return {
        imglist:[
          '/static/img1/bbl/bbl1.png',
          '/static/img1/bbl/bbl2.png',
          '/static/img1/bbl/bbl3.png',
          '/static/img1/bbl/bbl4.png',
        ],
        mark:0,
        isMain:true,
        isMain1:'',
        isMainStyle:0,
        isMainStyle1:0,
        isMainlist:[
          {
            name:"智能化设备控制"
          },
          {
            name:"蔬菜种植管理"
          }
        ],
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        input11: '',
        input12: '',
        input13: '',
        input14: '',
        input15: '',
        input16: '',
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        dialogVisible: false,
        dialogVisible1: false,
        list1: ["品种", "蔬菜", "水果"],
        options: [
          {
            value: '选项1',
            label: '品种'
          },
          {
            value: '选项2',
            label: '蔬菜'
          },
          {
            value: '选项3',
            label: '水果'
          }],
        value: '',
        guanliModel:{
          name:'播种期',
          guanli1:'播种前使用光碳核肥泡种',
          img1:'/static/img1/babuluo-img4.png',
          guanli1text:'播种前用光碳核肥1：20倍水拌种；供作物吸收利用，增强光合作用，提高光合速率，夜间抑制光呼吸，合成叶绿素供作物生长积累，从而达到不施化肥也能高产的目的。光碳核肥是二氧化碳捕集剂，能够利用空气中已超标的二氧化碳进行农业生产，是一项投入低、产量高、品质优、效益好的最新产品。根据测定，空气中现有二氧化碳含量大多在350-380PPM之间，二氧化碳直接使植物高产的浓度含量应在550PPM以上。',
          guanli2:'供应5%甲维盐-防治小菜蛾、青菜虫',
          img2:'/static/img1/babuluo-img5.png',
          guanli2text:'产品名称：5%甲维盐 有效成份含量：5%甲维盐 功能特点: 本品属于半合成抗生素杀虫剂，其作用机理是阻碍害虫运动神经信息传递而使身体麻痹死亡。作用方式以胃毒为主，对作物无内吸性能，但能渗入施用作物表皮组织，具有较长残效期。对防治棉铃虫有较高活性，防治小菜蛾、甜菜夜蛾等，且不与其它类农药产生交叉抗性，在常规剂量范围内对人、畜安全。'
        },
        guanliList:[
          {
            name:'播种期',
            guanli1:'播种前使用光碳核肥泡种',
            img1:'/static/img1/babuluo-img4.png',
            guanli1text:'播种前用光碳核肥1：20倍水拌种；供作物吸收利用，增强光合作用，提高光合速率，夜间抑制光呼吸，合成叶绿素供作物生长积累，从而达到不施化肥也能高产的目的。光碳核肥是二氧化碳捕集剂，能够利用空气中已超标的二氧化碳进行农业生产，是一项投入低、产量高、品质优、效益好的最新产品。根据测定，空气中现有二氧化碳含量大多在350-380PPM之间，二氧化碳直接使植物高产的浓度含量应在550PPM以上。',
            guanli2:'供应5%甲维盐-防治小菜蛾、青菜虫',
            img2:'/static/img1/babuluo-img5.png',
            guanli2text:'产品名称：5%甲维盐 有效成份含量：5%甲维盐 功能特点: 本品属于半合成抗生素杀虫剂，其作用机理是阻碍害虫运动神经信息传递而使身体麻痹死亡。作用方式以胃毒为主，对作物无内吸性能，但能渗入施用作物表皮组织，具有较长残效期。对防治棉铃虫有较高活性，防治小菜蛾、甜菜夜蛾等，且不与其它类农药产生交叉抗性，在常规剂量范围内对人、畜安全。'
          },
          {
            name:'幼苗期',
            guanli1:'施用大量元素水溶肥料',
            img1:'/static/img1/zhdp/ymq1.png',
            guanli1text:'幼苗肥料大容易烧苗,要少量多次,建议使用速效的水溶肥。平衡型大量元素水溶肥料，100%全水溶，能全方位满足作物不同营养阶段需求，适用范围广。使用后能促进植株均匀生长。叶面喷施，稀释800-1200倍液，建议生长期使用2-3次。可与杀菌剂、杀虫剂混用，安全间隔期7-10天。应在晴天早晨或傍晚喷施本品，不宜在高温、下雨或极端天气下使用。',
            guanli2:'随水加吡虫啉、噻虫嗪等药剂',
            img2:'/static/img1/zhdp/ymq2.png',
            guanli2text:'这些烟碱类的药剂有很好的内吸传导性，随水浇灌后可以高效的被根系吸收分散到整个植株防治刺吸式口器害虫。一旦发现有蚜虫、白粉虱蓟马等害虫为害后应该立即喷药，以蚜虫、白粉虱发生为主的可以使用啶虫脒+吡蚜酮/噻虫嗪+阿维菌素。由于这些害虫相对较小又善飞，因此移栽前打药的时候最好圈着打，即从周围向中间打，而且一定要加入防治病毒的药剂。'
          },
          {
            name:'生长期',
            guanli1:'通用型氮磷钾综合肥',
            img1:'/static/img1/zhdp/szq1.png',
            guanli1text:'营养管理重点工作在促进蔬菜的枝叶生长，保证充足全面的养分供给，矿质元素类型以氮、磷、钾为主，辅以中微量元素，有机无机搭配施用效果更佳；有条件的可以配合施用黄腐酸、氨基酸系列的肥料促进蔬菜根系生长，提高肥料利用率。叶面营养补充需要方面，针对茄果蔬菜需要加大钙的补充，避免缺钙导致的果实生长问题。',
            guanli2:'喷洒臭氧烟雾剂',
            img2:'/static/img1/zhdp/szq2.png',
            guanli2text:'苗期开始使用可显著预防全生育期气传病害的发生，生长中期使用可在一个月内效果显著。生长中期使用时，臭氧可先使病害加重（光合作用受到抑制），但到了20—45天后，适应臭氧环境后，病害可以显著减少，后期生长旺盛切无病害，对灰霉病防效显著。释放时应尽量保证均匀，切喷气孔不能直接对着蔬菜，应该距离蔬菜50厘米以上。熏蒸时间到达后应及时通风，一般通风时间不能少于30分钟。'
          },
          {
            name:'成熟期',
            guanli1:'提供微量元素肥料EDTA-螯合钙',
            img1:'/static/img1/zhdp/csq1.png',
            guanli1text:'叶面营养补充需要方面，针对茄果蔬菜需要加大钙的补充，避免缺钙导致的果实生长问题。本阶段营养管理重点工作是及时补充因果实采摘而损失的养分，同时保证目前蔬菜叶片生长、花蕾分化和果实生长的养分需求，因此氮磷钾养分都需要大量及时补充，同时还需要对蔬菜根系进行养护，提高根系活力，延长果实采收时间，提高经济效益。',
            guanli2:'防治防虫网与黏色板',
            img2:'/static/img1/zhdp/csq2.png',
            guanli2text:'防虫网与黏色板的综合利用能达到控制害虫数量，减少病虫害发生的目的。在温室通风口处用防虫网封闭，阻断害虫的传播途径。蔬菜生产以选用14—40目的网为宜。在能有效防止蔬菜上形体最小的主要害虫—蚜虫的前提下，目数应越小越好，以利通风。防虫网四周要用土压实，防止害虫潜入产卵。在温室内悬挂黄、蓝板。黄板可诱杀蚜虫、白粉虱、斑潜蝇，蓝板可诱杀蓟马。'
          },
        ]
      }
    },
    methods:{
      //切换不同时期的图片和数据
      zhchange(index){
        this.isMainStyle1=index;
        this.guanliModel=this.guanliList[index];
      },
      // 打开model框
      openModel(key){
        if(key=='dialogVisible'){
          this.dialogVisible=true;
        }
        else {
          this.dialogVisible1=true;
        }
      },
      // 关闭model框
      closeModel(key){
        if(key =='dialogVisible'){
          this.dialogVisible=false;
        }
        else {
          this.dialogVisible1=false;
        }
      },
      handleClose(key){
        if(key =='dialogVisible'){
          this.dialogVisible=false;
        }
        else {
          this.dialogVisible1=false;
        }
      },
      isToggle(index){
        this.isMainStyle=index;
        if(index==0){
          this.isMain=true;
          this.isMain1=false;
        }else{
          this.isMain=false;
          this.isMain1=true;
        }
      },
      //轮播图
      autoPlay () {
        this.mark++;
        if (this.mark === 4) { //当遍历到最后一张图片置零
          this.mark = 0
        }
      },
      change (i) {
        this.mark = i
      }
    }
  }
</script>

<style>
  #longtouqiyedetail1 .longtou-detail {
    width: 100%;
    height: 100%;
    background-color: #020b15;
    background-size: 100% 100%;
  }

  #longtouqiyedetail1 .longtou-detail-title {
    margin-left: 10px;
  }

  #longtouqiyedetail1  .sucai-title-btn {
    background-color: #0096cf;
    color: #fff;
  }
  #longtouqiyedetail1 .mybtn{
    width: 200px;
    height: 40px;
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
    float: right;
    margin-right: 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  #longtouqiyedetail1  .mybtn1{
    width: 200px;
    height: 40px;
    color: #fff;
    border: solid 1px #3d5268;
    float: right;
    margin-right: 20px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #0096cf;
  }
  #longtouqiyedetail1  .mybtn:hover{
    background-color: #0096cf;
    color: #fff;
    border: solid 1px #3d5268;
    border-radius: 4px;
  }
  /*.my-btn:active{*/
    /*background-color: #0096cf;*/
    /*border: solid 1px #3d5268;*/
    /*border-radius: 4px;*/
  /*}*/
  #longtouqiyedetail1 .sucai-title-btn .el-button--primary:focus, .el-button--primary:hover{
    background-color: #0096cf;
  }
  #longtouqiyedetail1 .sucai-title-btn .el-button--primary.is-active, .el-button--primary:active{
    background-color: #0096cf;
  }
  #longtouqiyedetail1 .sucai-title-btn1 {
    width: 200px;
    height: 40px;
    background-color: #041526;
    color: #91b9d6;
    border: solid 1px #3d5268;
    float: right;
    margin-right: 20px;
    border-radius: 4px;
  }

  #longtouqiyedetail1 .longtou-detail-content {
    margin: 10px 10px 0 10px;
  }

  #longtouqiyedetail1 .dz-left {
    /*width: 500px;*/
    width: 100%;
    height: 280px;
    background: url("/static/img1/sucaidapeng1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 15px;
    border: 1px solid #49a3ff;
  }

  #longtouqiyedetail1 .dz-left1 {
    width: 100%;
    height: 200px;
  }

  #longtouqiyedetail1 .dz-left1-switch {
    width: 100%;
    height: 52px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    margin-bottom: 10px;
  }

  #longtouqiyedetail1 .dz-left1-switch p {
    font-size: 24px;
    line-height: 52px;
    color: #afdeff;
    padding-left: 30px;
  }

  #longtouqiyedetail1 .dz-left1-switch .dz-left1-myswitch {
    float: right;
    margin-right: 30px;
    display: inline-block;
    line-height: 52px;
  }

  #longtouqiyedetail1 .dz-left1 .dz-left1-btn {
    width: 100%;
    height: 52px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    color: #afdeff;
    font-size: 24px;
  }

  /*.dz-left1-switch .el-switch .el-switch__core{*/
  /*width: 76px !important;*/
  /*height: 34px !important;*/
  /*}*/

  #longtouqiyedetail1 .dz-info {
    /*width: 124px;*/
    width: 100%;
    height: 190px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
    cursor: pointer;
  }
  #longtouqiyedetail1 .dz-info:hover{
    background-color: #091e35;
  }
  #longtouqiyedetail1 .dz-info p {
    text-align: center;
  }

 #longtouqiyedetail1 .dz-info p:first-child {
    line-height: 80px;
  }

  #longtouqiyedetail1 .dz-info p:last-child {
    line-height: 90px;
  }

  #longtouqiyedetail1 .dz-info1 {
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }

  #longtouqiyedetail1 .dz-right {
    width: 98%;
    height: 190px;
  }
  #longtouqiyedetail1 .dz-right ul li{
    height:  190px
  }
  #longtouqiyedetail1 .img1{
    width: 100%;
    height: 100%;
  }
  #longtouqiyedetail1 .dz-right1 {
    width: 100%;
    height: 280px;
    background: url("/static/img1/home-data.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: -80px;
  }

  #longtouqiyedetail1 .el-row {
    margin: 0 !important;
  }

  #longtouqiyedetail1 .my-select1 {
    width: 100%;
    margin-top: 15px;
  }

  #longtouqiyedetail1 .my-select1 .el-input__inner {
    height: 50px !important;
    border: solid 2px #293745 !important;
    background-color: #020b15 !important;
    color: #fefefe !important;
  }

  #longtouqiyedetail1 .babuluo-shucai-btn {
    width: 100%;
    height: 50px;
    background-color: #041526;
    border-radius: 4px;
    border: solid 1px #49a3ff;
    line-height: 14px;
    font-size: 18px;
    margin-top: 10px;
  }

  #longtouqiyedetail1 .babuluoBtn1 {
    background-color: #2288ea;
  }

  #longtouqiyedetail1 .huangjing-left {
    width: 100%;
    height: 420px;
    background: url("/static/img1/babuluo-img1.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 15px;
  }

  #longtouqiyedetail1 .huangjing-left p {
    font-size: 24px;
    line-height: 78px;
    color: #0096cf;
    padding-left: 40px;
  }

  #longtouqiyedetail1 .huangjing-left-content {
    padding: 10px 95px;
    box-sizing: border-box;
    font-size: 16px;
    display: inline-block;
  }

  #longtouqiyedetail1 .huangjing-left-content input {
    width: 120px;
    height: 36px;
    border: solid 1px #36495c;
    background-color: #041221;
    opacity: 0.6;
    color: #fff;
    box-sizing: border-box;
    padding-left: 10px;
  }

  #longtouqiyedetail1 .huangjing-btn {
    margin-left: 30%;
    margin-top: 3%;
  }

  #longtouqiyedetail1 .huangjing-btn1 {
    width: 160px;
    height: 48px;
    background-color: #0096cf;
    border-radius: 10px;
    margin-left: 60px !important;
  }

  #longtouqiyedetail1 .huangjing-right {
    width: 100%;
    height: 420px;
    background: url("/static/img1/babuluo-img2.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 15px;
    text-align: center;
    box-sizing: border-box;
    padding: 35px;
  }
  #longtouqiyedetail1 .huangjing-right-content{
    margin-top: 10px;
  }
  #longtouqiyedetail1 .my-model .el-dialog{
    width: 482px;
    height: 279px;
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail1 .my-model .el-dialog .el-dialog__header,.el-dialog__title{
   background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail1 .my-model .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail1 .my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail1 .my-model .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail1 .my-model span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetail1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail1 .my-model .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail1 .my-model-btn{
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  #longtouqiyedetail1 .my-model1 .el-dialog{
    width: 550px;
    /*height: 279px;*/
    background-color: #041624;
    border-radius: 5px;
    border: solid 2px rgba(69, 150, 236, 0.76);
  }
  #longtouqiyedetail1 .my-model1 .el-dialog .el-dialog__header,.el-dialog__title{
    background: #041624;
    color: #aee2ff;
  }
  #longtouqiyedetail1 .my-model1 .el-dialog .el-dialog__title{
    font-size: 18px;
    margin-left: 20px;
  }
  #longtouqiyedetail1 .my-model1 .my-model-content{
    margin-bottom: 20px;
  }
  #longtouqiyedetail1 .my-model1 .my-input1 {
    width: 181px;
    height: 42px;
    opacity: 0.51;
  }
  #longtouqiyedetail1 .my-model1 .my-input1 .el-input__inner{
    height: 42px;
    background-color: #041624 !important;
    border-radius: 3px;
    border: solid 1px #4982aa;
    font-size: 14px;
  }
  #longtouqiyedetail1 .my-model1.my-input1 .el-input__suffix{
    color: #aee2ff;
  }
  #longtouqiyedetail1 .my-model1 .my-span{
    font-size: 16px;
    line-height: 34px;
    color: #74c6ff;
    margin-right:10px;
  }
  #longtouqiyedetail1 .my-model1 span:nth-child(3){
    color: #0096cf;
  }
  #longtouqiyedetail1 .my-model1 .el-dialog__body{
    padding-bottom: 10px;
  }
  #longtouqiyedetail1 .my-model1 .el-dialog__footer{
    text-align: center;
  }
  #longtouqiyedetail1 .my-model1 .my-model-btn{
    width: 134px;
    height: 36px;
    background-color: #0096cf;
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>
