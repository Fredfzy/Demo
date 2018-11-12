<template>
  <div class="longtou-detail">
    <div class="longtou-detail-title">
      <p>
        <span style="color: #49a3ff;font-size: 32px;line-height: 32px;font-weight: bolder">|</span>
        <span style="color: #afdeff; font-size: 30px;line-height: 32px">"竹镇园区（立友合作社）虫情监控系统"</span>
        <span style="color: #497da1;font-size: 18px; line-height: 30px">竹镇（立友合作社）虫情监控系统简介...</span>
      </p>
    </div>
    <div class="longtou-detail-content">
      <el-row :gutter="10">
        <el-col :span="9">
          <div class="fleft">
            <div class="dz-left-top">
            </div>
            <div class="dz-left-bottom">
              <el-col :span="12">
                <div class="dz-info" style="margin-left:-7px;">
                  <div style="float: left;margin-top:20px;" >
                    <p style="font-size: 24px;color: #afdeff;">空气温度</p>
                    <p style="font-size: 14px;color: #688599;line-height: 24px"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;阈值范围：25-31℃</p>
                  </div>
                  <p style="float: left;font-size: 36px;color:#fff;margin-top:18px;margin-left: 50px">24℃</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="dz-info" style="margin-left:4px;"  >
                  <div style="float: left;margin-top: 20px">
                    <p style="font-size: 24px;color: #afdeff;">空气湿度</p>
                    <p style="font-size: 14px;color: #688599;line-height: 24px"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;阈值范围：25-50%</p>
                  </div>
                  <p style="font-size: 36px;color: #fd0000;margin-top:20px;margin-left: 50px">47.7%</p>
                </div>
              </el-col>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dz-right-top">
            <echarts133></echarts133>
          </div>
          <div class="dz-right-bottom">
            <echarts134></echarts134>
          </div>
        </el-col>
        <el-col :span="7">
          <el-row :gutter="4" >
            <div class="dz-right-top1">
            <el-col :span="24">
                <div class="content1">
                  <p>生产管理推送 <span>全部</span></p>
                </div>
                <div class="content2">
                  <div class=" content3">
                  </div>
                  <div style="font-size: 15px;color: #7ba4cf;padding-left: 28px;float: left;margin-top: 10px">种子处理</div>
                  <ul class="content4" style="width:250px;float:left;margin-left: 30px">
                    <li>晒种:选晴天晒种1－2天。</li>
                    <li>浸种、包衣：用浸种1+1每套兑水100斤可浸泡、包衣60－80斤种子，常温下泡7天即可。</li>
                    <li>破胸催芽。</li>
                  </ul>
                </div>
            </el-col>
            </div>
            <el-col :span="24">
              <div class="dz-right-bottom1">
                <el-row :gutter="8">
                    <p>高产模型</p>
                    <el-col :span="24">
                      <el-row :gutter="8">
                        <el-col :span="12" >
                          <div class="right-img1"></div>
                        </el-col>
                        <el-col :span="12" >
                          <div class="right-img2"></div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="24">
                      <el-row :gutter="5" >
                        <el-col :span="6">
                          <div class="right-text" >选种期预警配置</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="right-text" >育秧期预警配置</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="right-text" >整地期预警配置</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="right-text" >移栽期预警配置</div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="24">
                      <el-row :gutter="5">
                        <el-col :span="6">
                          <div class="right-text" >灌溉期预警配置</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="right-text" >施肥期预警配置</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="right-text" >病虫预警配置</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="right-text" >黄熟期预警配置</div>
                        </el-col>
                      </el-row>
                    </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import echarts133 from '@/components/zuzengData/zuzengEcharts/lyhzsEcharts/echarts133'
  import echarts134 from '@/components/zuzengData/zuzengEcharts/lyhzsEcharts/echarts134'
  export default {
    name: "longtouqiyedetail4",
    components:{
      echarts133,echarts134
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
    padding-left: 15px;
    margin-top: 10px;
  }
  .longtou-detail-title p{
    line-height: 40px;
  }
  .longtou-detail-content{
    margin: 10px 10px 0 10px;
  }
  .dz-left-top{
    width: 100%;
    height: 373px;
    background: url("/static/img1/lyhzs/pic-one.png") no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    /*padding: 32px 0 32px 26px;*/
    margin-bottom: 14px;
    color: #ffffff;
    line-height: 22px;
    font-size: 18px;
  }
  .dz-left-bottom{
    width: 100%;
    height: 88px;
    margin-bottom: 14px;
  }
  .dz-info{
    /*width: 124px;*/
    width: 100%;
    height: 88px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    border-top-color: #49a3ff;
    text-align: center;
  }
  .dz-right-top{
    width: 100%;
    height: 230px;
    background: url("/static/img1/nongmuxunhuan-img4.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 16px;
  }
  .dz-right-bottom{
    width: 100%;
    height: 230px;
    background: url("/static/img1/nongmuxunhuan-img5.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .dz-right-top1{
    width: 100%;
    height: 176px;
    background: url("/static/img1/nongmuxunhuan-img4.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 16px;
  }
  .dz-right-bottom1{
    width: 100%;
    height: 284px;
    background: url("/static/img1/nongmuxunhuan-img5.png") no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 20px;
  }
  .dz-right-bottom1 p{
    font-size: 18px;
    line-height: 38px;
    color: #c5e7ff;
    margin-left: 4px;
  }
  .dz-content{
    width: 100%;
    height: 476px;
    background: url("/static/img1/nongmuxunhuan-img3.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }

  .content1{
    width: 100%;
    border-bottom: 1px solid  #222d39;
    height: 40px;
    text-align: center;
    line-height: 40px;
    box-sizing: ;
  }
  .content1>p{
    font-size: 18px;
    color: #6094b9;

  }
  .content1>p>span{
    font-size: 16px;
    color: #497da1;
    margin-left: 380px;
  }
  .content3{
    margin-top: 15px;
    margin-left:20px ;
    width: 182px;
    height: 102px;
    float: left;
    background:url("/static/img1/lyhzs/pic-tw.png") ;
  }
  .content4{
    font-family: FZLTZHK--GBK1-0;
    font-size: 13px;
    color: #6094b9;
    list-style-type: decimal;
  }
  .content4 li{
    margin-top: 2px;
    color: #67819c;
    font-size: 13px;
    line-height: 20px;
  }
  .right-img1{
    width: 95%;
    height: 149px;
    background: url("/static/img1/lyhzs/pic-thre.png");
  }
  .right-img2{
    width: 95%;
    height: 149px;
    background: url("/static/img1/lyhzs/pic-fou.png");
  }
  .right-text{
    width: 88%;
    height: 30px;
    margin: 0;
    padding: 0;
    /*margin-left: 7px;*/
    margin-top: 5px;
    background-color: #030e1a;
    border: solid 1px #3d5268;
    font-size: 14px;
    color: #7493b4;
    text-align: center;
    line-height: 30px;
  }
  .fleft{
    padding-left: 5px;
    box-sizing: border-box;
  }
</style>
