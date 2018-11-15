<template>
   <!--<垃圾分类兑换点统计-->
  <div id="toursmadd3">
    <p>垃圾分类兑换点统计</p>
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
                         label="地点名称"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="number1"
                         label="垃圾数量"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="number2"
                         label="兑换数量"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="people"
                         label="兑换人"
                         width="100">
        </el-table-column>
        <el-table-column align="center"
                         prop="address"
                         label="兑换点地址"
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
        name: "RubbishnumberManagement",
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
              name:"龙池街道",
              address:"江苏省南京市六合区",
              number1:"10",
              number2:"3",
              people:"张泽",
              remarks:"无"
            },
            {
              id:"2",
              name:"雄州街道",
              address:"江苏省南京市六合区",
              number1:"6",
              number2:"3",
              people:"刘泽",
              remarks:"无"
            },
            {
              id:"3",
              name:"沤肥池1-25",
              address:"江苏省南京市六合区",
              number1:"10",
              number2:"4",
              people:"刘雪莹",
              remarks:"无"
            },
            {
              id:"4",
              name:"金牛湖街道",
              address:"江苏省南京市六合区",
              number1:"4",
              number2:"2",
              people:"徐敏",
              remarks:"无"
            },
            {
              id:"5",
              name:"堆肥场1-3",
              address:"江苏省南京市六合区",
              number1:"9",
              number2:"3",
              people:"吴仁龙",
              remarks:"无"
            },
            {
              id:"6",
              name:"堆肥场1-7",
              address:"江苏省南京市六合区",
              number1:"4",
              number2:"1",
              people:"苏迪曼",
              remarks:"无"
            },
            {
              id:"7",
              name:"程桥街道",
              address:"江苏省南京市六合区",
              number1:"6",
              number2:"4",
              people:"吴磊",
              remarks:"无"
            },
            {
              id:"8",
              name:"横梁街道",
              address:"江苏省南京市六合区",
              number1:"5",
              number2:"2",
              people:"蒋春兰",
              remarks:"无"
            },
            {
              id:"9",
              name:"苏皖农贸市场",
              address:"江苏省南京市六合区",
              number1:"6",
              number2:"3",
              people:"刘世超",
              remarks:"无"
            },
            {
              id:"10",
              name:"龙袍街道",
              address:"江苏省南京市六合区",
              number1:"7",
              number2:"3",
              people:"江琦",
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
    margin-top: 10px;
  }

  .toursmadd-btn {
    width: 110px;
    height: 30px;
    margin-left: 94px;
    margin-top: 20px;
    background-color: #288ef3;
  }
</style>
