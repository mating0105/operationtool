<!--
 * @Description: T+0车辆车型添加
 * @Author: shenah
 * @Date: 2020-03-10 10:19:04
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-12 11:39:11
 -->

<template>
  <div class="t0CarAdd">
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
            placeholder="请输入车辆\车型\车系等关键字"
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
      <div class="oper-btns">
        <el-button
          @click="operation(null,'addCar')"
          size="small"
          type="primary"
        >新增车辆</el-button>
      </div>
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
          label="品牌名称"
          prop="bendNm"
        ></el-table-column>
        <el-table-column
          align="center"
          label="车系名称"
          prop="carSeries"
        ></el-table-column>
        <el-table-column
          align="center"
          label="年份"
          prop="chYear"
        ></el-table-column>
        <el-table-column
          align="center"
          label="车价"
          prop="chPrice"
        ></el-table-column>
        <el-table-column
          align="center"
          label="状态"
        >
          <template slot-scope="scope">
            <div
              :class="{'operate-able':scope.row.enable,'operate-disable':!scope.row.enable}"
            >{{scope.row.enable?'开启':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="300"
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
              <el-button
                @click.native.prevent="operation(scope.row,'del')"
                class="operate-disable"
                size="small"
                type="text"
              >
                <i
                  class="el-icon-close"
                  title="删除"
                ></i>
                删除
              </el-button>
              <el-button
                :class="{'operate-able':!scope.row.enable,'operate-disable':scope.row.enable}"
                @click.native.prevent="operation(scope.row,'ableOrDis')"
                size="small"
                type="text"
              >{{scope.row.enable ?'禁用':'启用'}}</el-button>
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
      <!-- 新增弹出框 -->
      <AddorEditCarDialog
        :row="row"
        @modalChange="modalChange"
        ref="AddorEditCarDialog"
        v-if="addorEditCarModalVisible"
        v-model="addorEditCarModalVisible"
      ></AddorEditCarDialog>
    </div>
  </div>
</template>

<script>
import Api from "@api";
import MessageMixins from "@/mixins/common/message";
import AddorEditCarDialog from "@/components/t0Car/AddorEditCarDialog.vue";
import Paging from "@/components/common/Paging.vue";
export default {
  name: "t0CarAdd",
  components: { Paging, AddorEditCarDialog },
  mixins: [MessageMixins],
  data() {
    return {
      addorEditCarModalVisible: false,
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
      if (type === "add") {
        this.requestParams.pageIndex = 1;
        this.requestParams.keyWords = "";
      }
      this.queryList();
      this.addorEditCarModalVisible = false;
    },
    operation(row, type) {
      this.row = row;
      if (type === "addCar") {
        // 新增车辆
        this.addorEditCarModalVisible = true;
        this.row = null;
      } else if (type === "edit") {
        // 编辑
        this.addorEditCarModalVisible = true;
      } else if (type === "del") {
        this.confirmWarning({
          content: `是否删除${row.bendNm}?`
        }).then(() => {
          Api.deleteTcar({
            id: row.id
          }).then(res => {
            this.showSuccessMsg(res.msg);
            this.queryList();
          });
        });
      } else if (type === "ableOrDis") {
        Api.enableTCar({
          id: row.id,
          enable: !row.enable
        }).then(res => {
          this.showSuccessMsg(res.msg);
          this.queryList();
        });
      }
    },
    queryList() {
      this.loading = true;
      Api.queryTList(this.requestParams)
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
.t0CarAdd {
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