<template>
  <div class="visual-header">
    <h1>综合数据可视化面板</h1>
    <div class="showTime">{{ timeString }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeString: "",
      timer: null
    }
  },
  methods: {
    initInterval() {
      this.timer && clearTimeout(this.timer); //清除定时器
      let dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours(); //获取时
      let m = dt.getMinutes(); //获取分
      let s = dt.getSeconds(); //获取秒
      this.timeString = "当前时间："+y+"年"+mt+"月"+day+"-"+h+"时"+m+"分"+s+"秒";
      this.timer = setTimeout(this.initInterval, 1000); //设定定时器，循环运行
    },
    startInterval() {
      this.timer = null;
      this.timer = setTimeout(this.initInterval, 1000);
    }
  },
  mounted() {
    this.startInterval()
  }
};
</script>
<style lang="scss" scoped>

</style>
