<template>
  <div  id="qiye-lvyoutuisong" class="container">
    旅游推送
  </div>
</template>

<script>
  export default {
  data () {
    return {
      userInfo: {},
      value:'',
    }
  },


  methods: {
    bindViewTap () {
      // const url = '../logs/main'
      // wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    onChange(event) {
      console.log(event.detail);
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style >

</style>
