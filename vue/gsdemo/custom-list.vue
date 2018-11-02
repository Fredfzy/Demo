<template>
  <ul class="list">
    <li v-for="item in list" @click="selectValueHandle(item)">{{item}}</li>
  </ul>
</template>

<script>
    export default {
      name: "custom-list",
      props: ["list"],
      methods: {
        selectValueHandle(item) {
          //在子组件中触发，需要一个自定义事件
          // Key值 是父级的自定义事件
          this.$emit("receive", item);
        }
      }
    }
</script>

<style scoped>

</style>
