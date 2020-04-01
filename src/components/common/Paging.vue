<!--
 * @Description: 公用的分页组件
 * @Author: shenah
 * @Date: 2020-03-10 11:23:11
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-11 09:32:30
 -->

<template>
  <el-pagination
    :background="background"
    :current-page="currentPage"
    :page-count="pageCount"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :small="small"
    :total="total"
    @current-change="currentChange"
    @next-click="nextClick"
    @prev-click="prevClick"
    @size-change="sizeChange"
    layout="total, sizes, prev, pager, next"
  ></el-pagination>
</template>

<script>
export default {
  name: "Paging",
  components: {},
  data() {
    return {};
  },
  props: {
    small: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 100
    },
    pageSizes: {
      type: Array,
      default: () => [15, 30, 45, 60]
    },
    value: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentPage() {
      return this.value;
    }
  },
  methods: {
    sizeChange(val) {
      // 每页显示多少条数据
      this.$emit("pageChange", { pageSize: val, pageIndex: 1 });
    },
    currentChange(val) {
      // 当前点击的页面数
      this.currentPageChange(val);
    },
    prevClick(val) {
      // 用户点击上一页按钮改变当前页后触发
      this.currentPageChange(val);
    },
    nextClick(val) {
      // 用户点击下一页按钮改变当前页后触发
      this.currentPageChange(val);
    },
    currentPageChange(val) {
      // 当前页改变的公用方法
      this.$emit("pageChange", { pageIndex: val });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
