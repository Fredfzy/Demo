<template>
  <div class="login">
    <!--<div id="zuzenglogin">-->
    <!--&lt;!&ndash;<h2 style="margin: 0 auto;margin-top:200px;width:377px;height: 23px;font-size: 23px;line-height: 22px;color: #afdeff;">&ndash;&gt;-->
    <!--&lt;!&ndash;欢迎登录竹镇智慧农业综合服务平台&ndash;&gt;-->
    <!--&lt;!&ndash;</h2>&ndash;&gt;-->
    <!--</div>-->
    <zuzengHead></zuzengHead>
    <transition mode="out-in" enter-active-class="bounceInDown">
      <div class="zuzenglogin animated" v-show="model">
        <div class="zuzengImg">
          <h2>欢迎登录竹镇智慧农业综合服务平台</h2>
          <div class="text" >
            <div class="text1">
              <img  src="/static/img1/zuzenglogin/icon_user.png" alt="">
              <input type="text" style="outline:none;background-color:transparent !important;color: #afdeff !important;" placeholder="请输入帐号" v-model="userInfo.loginName" @keyup.native.enter="show($event)">
            </div>
            <div class="text1">
              <img src="/static/img1/zuzenglogin/icon_password.png" alt="">
              <input type="password" style="outline:none;background-color:transparent !important;color: #afdeff !important;" placeholder="请输入密码" v-model="userInfo.password" @keyup.native.enter="show($event)">
            </div>
          </div>
          <div class="pig10" @click="check">
            登录
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import zuzengHead from '@/components/zuzengData/zuzengCommon/zuzengHead'
  export default {
    name: 'zuzenglogin1',
    components:{
      zuzengHead
    },
    data () {
      return {
        model:false,
        loading: false,
        userInfo:{
          loginName:'',
          password: '',
        }
      }
    },
    created(){
      if(window.localStorage.getItem('accessToken')){
        // this.$router.push({path:'/zuzenghome'});
        this.$router.push({path:'/usermanagement'});
      }
    },
    mounted:function () {
      this.model=true;
      this.isFullscreen();
    },
    methods: {
      show(event){
        this.check();
      },
      check: function () {
        let date=new Date();
        let timer=date.getTime().toString();
        let obj={};
        obj.loginName=this.userInfo.loginName;
        obj.password=this.userInfo.password;
        // console.log(obj);
        obj=JSON.stringify(obj);
        this.$http.post(this.url+"/api/1.0/system/user/Login",
          obj,
          // alert(this.goUrl.action.login);
          // this.$http.post(this.goUrl.action.login,JSON.stringify(this.userInfo),
          {emulateJSON:true}).then(
          function (res) {
            // 处理成功的结果
            if(res.body.status=="SUCCESS"){
              this.$message({
                type:'success',
                message:'登录成功!'
              });
              this.$store.commit("addUserInfo",JSON.stringify(res.body.data.userInfo)) ;
              this.$store.commit("addToken",res.body.data.token);
              let menu=JSON.stringify(res.body.data.menu);
              this.$store.commit("addMenu",menu);
              if (window.localStorage.getItem('accessToken')) {
                // this.$router.push({path:'/zuzenghome'});
                this.$router.push({path:'/usermanagement'});
                window.localStorage.setItem('isRefresh',"true");
              }
            }
            else{
              this.$message.error(res.body.message);
            }
          },function (res) {
            //处理失败
          }
        )
        // this.$router.push({path:'/zuzenghome'});
        // this.$router.push({path:'/index'});
      },
      isFullscreen:function(){//打开全屏
        // 判断各种浏览器，找到正确的方法
        console.log(111111);
        let requestMethod = document.documentElement.requestFullScreen || //W3C
          document.documentElement.webkitRequestFullScreen || //Chrome等
          document.documentElement.mozRequestFullScreen || //FireFox
          document.documentElement.msRequestFullScreen; //IE11
        if (requestMethod) {
          // requestMethod.call(document.documentElement);
          requestMethod.call(document.documentElement);
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
          let wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys("{F11}");
          }
        }
        console.log(111111);
      }
    },
  }
</script>

<style scoped>
  .login{
    width: 100%;
    height: 100%;
    background:url("/static/img1/zuzenglogin/bg.png") no-repeat ;
    background-size: 100% 100%;
    position: relative;
  }
  .zuzenglogin{
    width: 539px;
    height: 336px;
    background: url("/static/img1/zuzenglogin/login.png") no-repeat;
    background-size:100% 100% ;
    position: absolute;
    top: 30%;
    left: 36%;
  }
  .zuzengImg{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .zuzengImg h2{
    width: 377px;
    height: 23px;
    font-size: 23px;
    color: #afdeff;
    position: absolute;
    top:64px;
    left: 80px;
  }
  .text{
    position: absolute;
    top:110px;
    left: 118px;
  }
  input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
  input{
    /*background:none;*/
    outline:none;
    border:0;
  }
  .text1{
    border-bottom: 2px solid  #5da3d5;
    width: 300px;
    height: 40px;
    line-height: 45px;
    margin-bottom: 10px;
  }
  .text input{
    width: 200px;
    height: 40px;
    font-size: 15px;
    text-decoration:none;
    line-height: 30px;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #afdeff;
    /* placeholder字体大小  */
    font-size: 15px;
    /* placeholder位置  */
  }
  .text img{
    margin-left: 7px;
    margin-top: 11px;
    margin-right: 30px;
  }
  .pig10{
    position: absolute;
    bottom:58px;
    left:194px;
    width: 148px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: url(/static/img1/button.png) no-repeat;
    color: #8ed0ff;
    font-size: 22px;
    cursor: pointer;
  }
  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
  }
  input {
    background-color: transparent;
  }
</style>
