<template>
  <section class="wrap">
    <section class="searchIpt clearFix">
      <section class="clearFix">
        <input type="text" class="keyWord" :value="val"  @click="selectShow=!selectShow"/>
        <!--<input type="button"  :value="btnValue"/>-->
        <span></span>
      </section>
      <custom_list v-show="selectShow" :list="list"  @receive="changeValueHandle"></custom_list>
    </section>
  </section>
</template>

<script>
  import custom_list from '@/components/zuzengData/zuzengCommon/custom-list'
    export default {
      name: "custom-select",
      components:{
        custom_list
      },
      data(){
        return {
          selectShow: false,
          val: ""
        }
      },
      props: ["btnValue", "list"],
      methods: {
        changeValueHandle(value) {
          this.val = value;  //将选中的值赋给指定的input
          this.selectShow = false;  //隐藏下拉框
        }
      }
    }
</script>

<style scoped>
.clearFix input{
  width: 257px;
  height: 60px;
  border-radius: 4px;
  border: solid 2px #293745;
}
</style>
