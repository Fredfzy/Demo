<template>
    <!--河长制统计报表-->
  <div id="toursmadd3">
    <p>河长制统计报表</p>
    <el-input v-model="input" placeholder="请输入内容" style="width: 200px"></el-input>
    <el-button type="primary" size="small" style="width: 100px; margin-left: 20px;margin-top: 10px;background-color: #288ef3">提交</el-button>
    <div class="toursmadd-table">
      <el-table
        :data="tableData"
        border
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="65"></el-table-column>
        <el-table-column align="center"
                         prop="id"
                         label="ID"
                         width="60">
        </el-table-column>
        <el-table-column align="center"
                         prop="name"
                         label="河道名称"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="time"
                         label="巡查时间"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="content"
                         label="河道污染情况"
                         width="200">
        </el-table-column>
        <el-table-column align="center"
                         prop="people"
                         label="负责人"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="address"
                         label="河道地址"
                         width="200">
        </el-table-column>

        <el-table-column align="center"
                         prop="remarks"
                         label="备注"
        >
        </el-table-column>
        <el-table-column align="center"
                         fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>-->
            <el-button type="text" size="small" @click="handleDelete(scope.row)" style=" color: #f67a78;">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pageContent">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes, prev, pager, next,jumper"
          :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RivercountManagement",
      data() {
        return {
          labelPosition: 'top',
          formData: {
            type: '',
            content: '',
            personNumber: '',
            area: '',
            base: '',
            parcel: '',
            starttime: '',
            endtime: '',
            price: '',
          },
          tableData:[
            {
              id:"1",
              name:"向阳河",
              address:"江苏省南京市六合区",
              people:"张毅",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"2",
              name:"西陵河",
              address:"江苏省南京市六合区",
              people:"刘泽",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"3",
              name:"朝阳河",
              address:"江苏省南京市六合区",
              people:"蒋春兰",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"4",
              name:"耿跳河",
              address:"江苏省南京市六合区",
              people:"刘雪莹",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"5",
              name:"山湖水库",
              address:"江苏省南京市六合区",
              people:"向阳",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"6",
              name:"大泉水库",
              address:"江苏省南京市六合区",
              people:"徐敏",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"7",
              name:"三星水库",
              address:"江苏省南京市六合区",
              people:"徐默",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"8",
              name:"红山水库",
              address:"江苏省南京市六合区",
              people:"刘洋",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"9",
              name:"红阳水库",
              address:"江苏省南京市六合区",
              people:"石磊",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            },
            {
              id:"10",
              name:"乌龙港水库",
              address:"江苏省南京市六合区",
              people:"黄志星",
              time:"2018-10-22",
              content:"良好",
              remarks:"无"
            }
          ],
          options: [{
            value: '选项1',
            label: '果子王仙桃'
          }, {
            value: '选项2',
            label: '大展黄玉梨'
          }, {
            value: '选项3',
            label: '枫彩集团'
          }, {
            value: '选项4',
            label: '兴泉红薯'
          }, {
            value: '选项5',
            label: '智慧温室'
          }],
          options1: [{
            value: '选项1',
            label: '产出'
          }, {
            value: '选项2',
            label: '需求'
          }],
          options2: [{
            value: '选项1',
            label: '秸秆'
          }, {
            value: '选项2',
            label: '污粪'
          }],
        }
      },
      methods: {
        handleSelectionChange() {
        },
        handleDelete() {
        },
        onSubmit() {
        }
      }
    }
</script>

<style scoped>
  .toursmadd-table {
    margin-top: 20px;
  }
  .toursmadd-btn {
    width: 110px;
    height: 30px;
    margin-left: 94px;
    margin-top: 20px;
    background-color: #288ef3;
  }
</style>
