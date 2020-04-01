<!--
 * @Description: 客户信息管理
 * @Author: shenah
 * @Date: 2020-03-11 09:35:28
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-12 11:39:37
 -->


<template>
  <div class="customer-manage">
    <el-col
      :span="24"
      class="tool-box"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
        :model="requestParams"
      >
        <el-form-item>
          <el-input
            class="large-input"
            clearable
            placeholder="请输入姓名\身份证"
            v-model.trim="requestParams.keyWords"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="search"
            icon="el-icon-search"
            type="primary"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div class="tabel-box">
      <el-table
        :data="listObj.list"
        :max-height="800"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          align="center"
          label="#"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          label="客户姓名"
          prop="customerName"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="身份证号码"
          prop="certificateNum"
          width="180"
        ></el-table-column>
        <el-table-column
          :formatter="(row)=> `${row.nation}族`"
          align="center"
          label="民族"
          prop="nation"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="身份证住址"
          min-width="200"
          prop="familyAddress"
        ></el-table-column>
        <el-table-column
          align="center"
          label="身份证签发机关"
          min-width="200"
          prop="signOrg"
        ></el-table-column>
        <el-table-column
          align="center"
          label="身份证起始日"
          prop="startDate"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          label="身份证截止日"
          prop="endDate"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <div class="single-operate">
              <el-button
                @click.native.prevent="operation(scope.row,'edit')"
                size="small"
                type="text"
              >
                <i
                  class="el-icon-edit"
                  title="编辑"
                ></i>
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Paging
        :total="listObj.total"
        @pageChange="pageChange"
        class="table-page"
        v-model="requestParams.pageIndex"
      />
      <!-- 修改客户信息 -->
      <AddOrEditCustomerDialog
        :row="row"
        @modalChange="modalChange"
        ref="addOrEditCustomerDialog"
        v-if="addOrEditCustomerDialog"
        v-model="addOrEditCustomerDialog"
      ></AddOrEditCustomerDialog>
    </div>
  </div>
</template>

<script>
import Api from "@api";
import MessageMixins from "@/mixins/common/message";
import AddOrEditCustomerDialog from "@/components/customer/AddOrEditCustomerDialog.vue";
import Paging from "@/components/common/Paging.vue";
export default {
  name: "customerManage",
  components: { Paging, AddOrEditCustomerDialog },
  mixins: [MessageMixins],
  data() {
    return {
      addOrEditCustomerDialog: false,
      requestParams: {
        // 请求参数
        keyWords: "",
        pageIndex: 1, // 当前页码
        pageSize: 10 // 每页显示的数据的条数
      },
      listObj: {
        total: 0,
        list: []
      },
      loading: false, // 是否正在加载
      row: null // 当前的点击
    };
  },
  props: {},
  mounted() {
    this.queryList();
  },
  methods: {
    // 页面改变的时候
    pageChange(pageObj) {
      // 调用查询的接口
      this.requestParams = { ...this.requestParams, ...pageObj };
      this.queryList();
    },
    search() {
      this.requestParams.pageIndex = 1;
      this.queryList();
    },
    modalChange({ type }) {
      this.queryList();
      this.addOrEditCustomerDialog = false;
    },
    operation(row, type) {
      this.row = row;
      if (type === "edit") {
        // 编辑
        this.addOrEditCustomerDialog = true;
      }
    },
    queryList() {
      this.loading = true;
      Api.queryCustomerList(this.requestParams)
        .then(res => {
          this.listObj = res.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang='less' scoped>
.customer-manage {
  .tool-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0 10px 0;
  }
  .tabel-box .el-button--text {
    padding: 0;
  }
  .oper-btns {
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>