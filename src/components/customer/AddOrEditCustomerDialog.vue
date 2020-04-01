<!--
 * @Description: 客户信息的修改
 * @Author: shenah
 * @Date: 2020-03-11 09:45:37
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-11 14:13:42
 -->

<template>
  <Modal
    :visible="isShown"
    @onClosed="doClose"
    width="540px"
  >
    <div slot="head">{{row?'修改':'新增'}}客户信息</div>
    <el-form
      :model="form"
      :rules="rules"
      label-width="140px"
      ref="form"
      slot="body"
    >
      <el-form-item
        label="客户姓名: "
        prop="customerName"
      >
        <el-input
          placeholder="请输入客户姓名"
          size="small"
          v-model.trim="form.customerName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="certificateNum"
      >
        <el-input
          placeholder="请输入身份证号"
          size="small"
          v-model.trim="form.certificateNum"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="民族: "
        prop="nation"
      >
        <el-select
          class="wid100"
          clearable
          filterable
          placeholder="请选择"
          size="small"
          v-model="form.nation"
        >
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in nation"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="身份证住址: "
        prop="familyAddress"
      >
        <el-input
          placeholder="请输入身份证住址"
          size="small"
          v-model.trim="form.familyAddress"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="签发机关: "
        prop="signOrg"
      >
        <el-input
          placeholder="请输入签发机关"
          size="small"
          v-model.trim="form.signOrg"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="有效期限起始日: "
        prop="startDate"
      >
        <el-date-picker
          :picker-options="tool.pickerOptions('start',new Date())"
          class="wid100"
          placeholder="选择出有效期限起始日"
          size="small"
          type="date"
          v-model="form.startDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="有效期限终止日: "
        prop="endDate"
      >
        <el-row>
          <el-col :span="14">
            <el-date-picker
              :disabled="form.longFlag"
              :picker-options="tool.pickerOptions('end',new Date(new Date().getTime() - 24*60*60*1000))"
              placeholder="选择出有效期限终止日"
              size="small"
              type="date"
              v-model="form.endDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col
            :offset="4"
            :span="6"
          >
            <el-checkbox
              @change="checkChange"
              v-model="form.longFlag"
            >长期有效</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="foot">
      <el-button
        @click="submit()"
        size="small"
        type="primary"
      >确定</el-button>
      <el-button
        @click="cancel()"
        plain
        size="small"
        type="primary"
      >取消</el-button>
    </div>
  </Modal>
</template>

<script>
import Api from "@api";
import tool from "@/utils/tools";
import { mapState } from "vuex";
import Modal from "@/components/common/Modal.vue";
export default {
  name: "AddorEditCarDialog",
  components: { Modal },
  data() {
    return {
      tool,
      rules: {
        customerName: [
          { required: true, message: "请输入客户姓名", trigger: "blur" }
        ],
        certificateNum: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        nation: [{ required: true, message: "请选择民族", trigger: "change" }],
        familyAddress: [
          { required: true, message: "请输入身份证住址", trigger: "blur" }
        ],
        signOrg: [
          { required: true, message: "请输入签发机关", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "请选择年份", trigger: "change" }
        ],
        endDate: [{ required: true, message: "请选择年份", trigger: "change" }]
      },
      form: {
        customerName: "", // 客户姓名
        certificateNum: "", // 身份证号
        nation: "", // 民族
        familyAddress: "", // 身份证住址
        startDate: "", // 有效期限起始日
        endDate: "", // 有效期限终止日
        signOrg: "", // 签发机关
        longFlag: false // 长期有效的控制
      },
      type: "add" // 新增
    };
  },
  props: {
    value: Boolean,
    row: Object
  },
  computed: {
    ...mapState({
      nation: state => state.dictionaries.FAMOUS_RACE
    }),
    isShown() {
      return this.value;
    }
  },
  mounted() {
    if (this.row) {
      this.form = { ...this.form, ...this.row };
      this.type = "edit"; // 编辑
    }
  },
  methods: {
    checkChange(val, e, type) {
      if (val) {
        this.form.endDate = "9999-12-30";
      } else {
        this.form.endDate = "";
      }
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          Api.editCustomerInfo(this.form).then(res => {
            this.$emit("modalChange", {
              type: this.type
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.doClose();
    },
    doClose() {
      this.$emit("input", false);
      this.$emit("onClose");
    }
  }
};
</script>
<style lang='less' scoped>
</style>