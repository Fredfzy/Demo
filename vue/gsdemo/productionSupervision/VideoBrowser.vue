<template>
  <div id="videoBro">
    <!--<el-row>-->
    <!--<el-col :span="8" v-for="(item, index) in videosdata"  :offset="index > 0 ? 2 : 0">-->
    <!--<el-card :body-style="{ padding: '0px' }">-->
    <!--<video id="myvideo" :src=item.videoSrc :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" height="414" width="720"></video>-->
    <!--<span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()"></span>-->
    <!--<span class="ico ico-skip"></span>-->
    <!--<span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span>-->
    <!--<div style="padding: 14px;">-->
    <!--<span>名称:</span>-->
    <!--<span>{{item.name}}</span>-->
    <!--<div class="bottom clearfix">-->
    <!--<p>-->
    <!--<span>时间:</span>-->
    <!--<time class="time">{{ currentDate|dateformat('YYYY-MM-DD HH:mm:ss') }}</time>-->
    <!--</p>-->
    <!--<p style="margin-top: 13px;">-->
    <!--<span>所属园区</span>-->
    <!--<span>{{item.yq}}</span>-->
    <!--</p>-->
    <!--<el-button type="text" class="button">操作按钮</el-button>-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-card>-->
    <!--</el-col>-->
    <!--</el-row>-->
     <!--条件查询-->
     <el-form :inline="true"  :model="formdata" class="demo-form-inline form-search-inline" size="mini">
       <el-form-item label="摄像头名称">
         <el-input  v-model="formdata.name" placeholder="摄像头名称"></el-input>
       </el-form-item>
       <!--<el-form-item label="监管区域">-->
         <!--<el-select  v-model="formdata.jgqy" placeholder="监管区域">-->
           <!--<el-option label="全部" value="0"></el-option>-->
           <!--<el-option label="区域一" value="shanghai"></el-option>-->
           <!--<el-option label="区域二" value="beijing"></el-option>-->
         <!--</el-select>-->
       <!--</el-form-item>-->
       <!--<el-form-item label="隶属园区">-->
         <!--<el-select v-model="formdata.lsyq" placeholder="隶属园区">-->
           <!--<el-option label="全部" value="0"></el-option>-->
           <!--<el-option label="园区一" value="shanghai"></el-option>-->
           <!--<el-option label="园区二" value="beijing"></el-option>-->
         <!--</el-select>-->
       <!--</el-form-item>-->
       <!--<el-form-item label="状态">-->
         <!--<el-select v-model="formdata.zt" placeholder="状态">-->
            <!--<el-option label="全部" value="0"></el-option>-->
            <!--<el-option label="开启" value="open"></el-option>-->
            <!--<el-option label="关闭" value="close"></el-option>-->
         <!--</el-select>-->
       <!--</el-form-item>-->
       <el-form-item>
         <el-button type="primary" >查询</el-button>
       </el-form-item>
     </el-form>
     <!--表格数据-->
     <el-table
       :data="videosdata"
       border
       size="mini"
       style="width: 100%">
       <!--<el-table-column align="center" type="selection" width="65"></el-table-column>-->
       <el-table-column align="center"
                        prop="id"
                        label="ID"
                        width="100">
       </el-table-column>
       <el-table-column align="center"
                        prop="name"
                        label="名称"
                        width="300">
       </el-table-column>
       <el-table-column align="center"
                        prop="zt"
                        label="状态"
                        width="100">
       </el-table-column>
       <el-table-column align="center"
                        prop="lsyq"
                        label="隶属园区"
                        width="300">
       </el-table-column>
       <el-table-column align="center"
                        prop="jgqy"
                        label="监管区域"
                        width="393">
       </el-table-column>

       <!--<el-table-column align="center"-->
                        <!--prop="videoSrc"-->
                        <!--label="视频地址"-->
                        <!--width="600">-->
         <!--<template slot-scope="scope">-->
           <!--<a target="_blank" :href="scope.row.videoSrc"><el-button type="text"  size="small">{{scope.row.videoSrc}}</el-button></a>-->
         <!--</template>-->
       <!--</el-table-column>-->
       <el-table-column
         label="操作"
         align="center"
         width="160">
         <template slot-scope="scope">
           <el-button @click="ylsp" type="text" size="small">预览</el-button>
           <el-button  @click="lshf" type="text" size="small">历史</el-button>
         </template>
       </el-table-column>
     </el-table>
    <!--分页-->
    <!--<div class="block">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage4"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="100"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="8">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <div class="pageContent" id="pageContent">
     <el-pagination
       :model="pageData"
       background
       @current-change="handleCurrentChange"
       :current-page="pageData.currentPage"
       :page-size="pageData.pageSize"
       layout="total, prev, pager, next, jumper"
       :total="pageData.total">
     </el-pagination>
   </div>
    <!--模态框-->
    <el-dialog :visible.sync="yulanState" title="预览视频" width="800px" >
      <el-form :model="videosdata1"ref="videosdata1" label-width="100px" class="demo-ruleForm" >
        <el-form-item class="modal-footer my-modal-footer" style="margin-left: 38px">
          <div v-html="ylspHtml">{{ylspHtml}}</div>
          <el-button type="primary" @click="closeSp">退出</el-button>
          <el-button @click="closeSp">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="lishiState" title="历史回放" width="800px" >
      <el-form :model="videosdata1" ref="videosdata1" label-width="100px" class="demo-ruleForm" >
        <div v-html="ylspHtml">{{ylspHtml}}</div>
        <el-form-item class="modal-footer my-modal-footer" style="margin-left: 38px" >
          <el-button type="primary" @click="closeSp">退出</el-button>
          <el-button @click="closeSp">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

   </div>
</template>

<script>

  // import  moment from  'moment'
    export default {
      name: "VideoBrowser",
      data() {
        return {
          //分页

          pageData:{
            pageSize:10,
            pageNum:1,
            total:1,
            currentPage:1,
          },
          ylspHtml:"",
          videosdata1:{},
          yulanState:false,
          lishiState:false,
          // currentDate: new Date(),
          // 视频table数据
          videosdata: [
            {
              id: 1,
              name: "海康威视",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "开启",
              sl: 12,
            },
            {
              id: 2,
              name: "海康威视",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "关闭",
              sl: 22,
            },
            {
              id: 1,
              name: "海康威视",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "开启",
              sl: 12,
            },
            {
              id: 2,
              name: "佳能",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "关闭",
              sl: 22,
            },
            {
              id: 1,
              name: "佳能",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "开启",
              sl: 12,
            },
            {
              id: 2,
              name: "海康威视",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "关闭",
              sl: 22,
            },
            {
              id: 1,
              name: "海康威视",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "开启",
              sl: 12,
            },
            {
              id: 2,
              name: "海康威视",
              yqid: "1",
              jgqy: "办公区",
              lsyq: "智慧农业基地",
              videoSrc: "http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
              bz: "",
              zt: "关闭",
              sl: 22,
            }],
          // 查询form数据
          formdata: {
            name: "",
            jgqy: "",
            lsyq: "",
            zt: "",
          }
          // _dom:"",
          // videoSrc:"http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ",
          // videoImg:'http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg',
          // playStatus:'',
          // muteStatus:'',
          // isMute:true,
          // isPlay:false
        }
    },
    methods:{
      closeSp(){
        this.lishiState=false;
        this.yulanState=false;
        this.ylspHtml="";
      },
        ylsp(){
          window.localStorage.setItem('chnid',"16");
          this.yulanState=true;
          // let ylsp = document.getElementById("ylsp");

          this.ylspHtml="";
          this.ylspHtml="<iframe src='../../../static/html/video1.html' style='width: 100%;height: 200px'></iframe>"
        },
        lshf(){
          window.localStorage.setItem('chnid',"14");
          this.lishiState=true;
          this.ylspHtml="";
          this.ylspHtml="<iframe src='../../../static/html/video1.html' style='width: 100%;height: 200px'></iframe>"

        },
      // playClick(){
      //   this.isPlay = !this.isPlay;
      //   this.playStatus= 'autoplay';
      // },
      // closeSoundClick(){
      //   this.isMute = !this.isMute;
      //   if(this.isMute){
      //     this.muteStatus = '';
      //   }else{
      //     this.muteStatus = 'muted';
      //   }
      // }

      handleCurrentChange(val){
        this.pageData.pageNum=val;
        this.initUser();
      },
    }
  }
</script>

<style scoped>
  /*视频卡片*/
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  /*视频卡片*/

</style>
