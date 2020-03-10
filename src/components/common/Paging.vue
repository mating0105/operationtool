<!--
 * @Description: 公用的分页组件
 * @Author: shenah
 * @Date: 2020-03-10 11:23:11
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-10 11:31:35
 -->

<template>
  <el-pagination
    :small="small"
    :background="background"
    :page-size="pageSize"
    :total="total"
    :page-count="pageCount"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next"
    @size-change="sizeChange"
    @current-change="currentChange"
    @prev-click="prevClick"
    @next-click="nextClick"
  ></el-pagination>
</template>

<script>
export default {
  name: 'Paging',
  components: {},
  data() {
    return {
      currentPage: 1, // 当前选中的页码
    };
  },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean,
      default: false,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageCount: {
      type: Number,
      default: 100,
    },
    pageSizes: {
      type: Array,
      default: () => [15, 30, 45, 60],
    },
  },
  mounted() {},
  methods: {
    sizeChange(val) {
      // 每页显示多少条数据
      this.currentPage = 1;
      this.$emit('pageChange', { pageSize: val, pageIndex: 1 });
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
      this.currentPage = val;
      this.$emit('pageChange', { pageIndex: val });
    },
  },
};
</script>
<style lang='less' scoped>
</style>
