<template>
  <div class="zuzeng-foot">
    <ul>
      <li :class="{zuzengfootbtn:index==listStyle}" v-for="(item,index) in footlist" @click="change(index,item.path)">
        <a href="#">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "zuzengFoot",
      data(){
        return{
          listStyle:0,
          footlist:[
            {
              name:"首页",
              path:"/zuzenghome"
            },
            {
              name:"园区龙头企业",
              path:"/longtouqiye"
            },
            {
              name:"三产融合",
            },
            {
              name:"农牧循环",
            },
            {
              name:"HACCP农产品溯源",
            },
            {
              name:"河长制",
            },
            {
              name:"垃圾分类",
            },
            {
              name:"全网瞭望",
            },
            {
              name:"节水灌溉",
            },
            {
              name:"水利系统",
            },
          ],
        }
      },
      methods:{
        change(index,path){
          this.listStyle=index;
          this.$router.push({path:path});
        },
      }
    }
</script>

<style scoped>
  /*底部*/
  .zuzeng-foot{
    width: 100%;
    height: 70px;
    position: absolute;
    bottom:0;
    box-sizing:border-box;
    padding-left: 10px;
  }
  .zuzeng-foot ul{
    display: flex;
    flex: 1;
  }
  .zuzeng-foot ul li {
    width: 182px;
    height: 56px;
    list-style: none;
    color: #fff;
    background: url("/static/img1/foot-nav-xz.png") no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    line-height:  56px;
    margin-right: 16px;
    font-size: 14px;
    cursor:pointer;
  }
  .zuzeng-foot ul li a{
    color: #8ed0ff;
    text-decoration:none;
  }
  .zuzeng-foot .zuzengfootbtn{
    width: 220px;
    background: url("/static/img1/foot-nav.png") no-repeat center center;
    background-size: 100% 100%;
    font-size: 20px;
  }
</style>
