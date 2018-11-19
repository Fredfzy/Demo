<template>
   <div>
     <!--条件查询-->
     <el-form :inline="true"  :model="formdata" class="demo-form-inline form-search-inline" size="mini">
       <el-form-item label="设备名称">
         <el-input  v-model="formdata.sensorName" placeholder="设备名称"></el-input>
       </el-form-item>
       <el-form-item label="监管区域">
         <el-select  v-model="formdata.mapName" placeholder="监管区域">
           <el-option label="全部" value=""></el-option>
           <el-option
             v-for="item in this.mapNameData"
             :value="item.mapName" >
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="隶属园区">
         <el-select v-model="formdata.proName" placeholder="隶属园区">
           <el-option label="全部" value=""></el-option>
           <el-option
             v-for="item in this.proNameData"
             :value="item.mapName" >
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="类型">
         <el-select v-model="formdata.sensorType" placeholder="类型">
           <el-option label="全部" value=""></el-option>
           <el-option
             v-for="item in this.tabledata"
             :value="item.sensorType" >
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="getInfo">查询</el-button>
       </el-form-item>
     </el-form>
     <!--表格数据-->
     <el-table
       :data="tabledata"
       border
       size="mini"
       height="65vh"
       style="width: 100%">
       <!--<el-table-column align="center" type="selection" width="65"></el-table-column>-->
       <el-table-column
         align="center"
         prop="id"
         fixed
         label="ID"
         width="80">
       </el-table-column>
       <el-table-column
         align="center"
         fixed
         label="图标"
         width="120">
         <template scope="scope">
           <img :src="thisUrl +scope.row.sensorIcon" width="46" height="46" class="head_pic"/>


         </template>
       </el-table-column>
       <el-table-column
         align="center"
         prop="sensorName"
         fixed
         label="设备名称"
         width="200">
       </el-table-column>
       <el-table-column
         align="center"
         prop="proName"
         label="隶属园区"
         width="270">
       </el-table-column>
       <el-table-column
         align="center"
         prop="mapName"
         label="设备区域"
         width="270">
       </el-table-column>

       <el-table-column
         align="center"
         prop="sensorRange"
         label="当前参数">
       </el-table-column>
       <el-table-column
         align="center"
         prop="remarks"
         label="监控信息"
       width="1000">
       </el-table-column>
       <el-table-column
         align="center"
         prop="sensorParameterUnit"
         label="参数单位"
       width="120">
       </el-table-column>

       <el-table-column
         align="center"
         prop="sensorDesc"
         label="备注"
       width="300">
       </el-table-column>
     </el-table>
     <!--分页-->
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
       <!--<el-button  type="primary" size="mini" class="orgaOk">确定</el-button>-->
     </div>
   </div>
</template>

<script>
    export default {
        name: "EquipmentDetection",
        created(){
          this.getInfo();
          this.searchproNameData(2);
          this.searchproNameData(3);
          this.getTypeName();
        },
        data(){
          return{
            thisUrl:this.url + "/",
            typeNameData:[],//查询所有类型名称
            proNameData:[],//查询隶属园区名称
            mapNameData:[],//查询设备区域名称
            // form表单数据
            formdata:{
              sensorName :'',//传感器名称
              proName:'',//隶属园区名称
              mapName: '',//设备区域名称
              sensorType:''//传感器类型
            },
            // table数据
            tabledata:[],
            //分页
            pageData:{
              pageSize:10,
              pageNum:1,
              total:1,
              currentPage:1,
            },
            }
          },
         methods:{
           handleCurrentChange(val){
             this.pageData.pageNum=val;
             this.getInfo();
           },
           getInfo(){
             //获取table数据
             this.$http.post(this.url+"/api/1.0/iot/sensor/list"+'/'+this.pageData.pageNum+'/'+this.pageData.pageSize,JSON.stringify(this.formdata),
               {emulateJSON:true}).then(
               function (res) {
                 // 处理成功的结果
                 this.tabledata=res.body.data.list;
                 this.pageData.total = res.body.data.total;
                 // console.log(res.body);
                 // console.log(this.tableData);
               },function (res) {
                 //处理失败
               }
             )
           },
           searchproNameData(num){
             //查询所有隶属园区和设备区域名称
             if(num==2){
               let obj={
                 mapLevel:num
               }
               this.$http.post(this.url+"/api/1.0/iot/map/list/0/0",JSON.stringify(obj),
                 {emulateJSON:true}).then(
                 function (res) {
                   // 处理成功的结果
                   this.proNameData=res.body.data.list;
                   // console.log(this.proNameData);

                   // console.log(res.body);
                   // console.log(this.tableData);
                 },function (res) {
                   //处理失败
                 }
               )
             }
             else if(num==3){
               let obj={
                 mapLevel:num
               }
               this.$http.post(this.url+"/api/1.0/iot/map/list/0/0",JSON.stringify(obj),
                 {emulateJSON:true}).then(
                 function (res) {
                   // 处理成功的结果
                   this.mapNameData=res.body.data.list;
                   // console.log(this.mapNameData);
                   // console.log(res.body);
                   // console.log(this.tableData);
                 },function (res) {
                   //处理失败
                 }
               )
             }
           },
           getTypeName(){
             let obj={
               parentId :1
             }
             this.$http.post(this.url+"/api/1.0/iot/map/list/0/0",JSON.stringify(obj),
               {emulateJSON:true}).then(
               function (res) {
                 // 处理成功的结果
                 this.typeNameData=res.body.data.list;
                 // console.log(this.mapNameData);
                 // console.log(res.body);
                 // console.log(this.tableData);
               },function (res) {
                 //处理失败
               }
             )
           }
        }
    }
</script>

<style scoped>

</style>
