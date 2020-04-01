<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Api from "@api";
export default {
  name: "App",
  mounted() {
    this.queryDics();
  },
  methods: {
    queryDics() {
      Api.queryDictionaries([
        'FAMOUS_RACE', // 民族
      ]).then(res => {
        this.$store.dispatch("queryDics", res.data);
      });
    }
  }
};
</script>
<style lang="less">
@import "../static/css/common.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
