<!--
 * @Description: 添加或者修改T+0车辆车系
 * @Author: shenah
 * @Date: 2020-03-10 11:35:42
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-10 13:51:31
 -->
<template>
  <Modal
    :visible="isShown"
    @onClosed="doClose"
    width="540px"
  >
    <div slot="head">{{row?'编辑':'新增'}}T+0车辆</div>
    <el-form
      :model="form"
      :rules="rules"
      label-width="140px"
      ref="form"
      slot="body"
    >
      <el-form-item
        label="品牌名称: "
        prop="bendNm"
      >
        <el-input
          placeholder="请输入品牌名称"
          size="small"
          v-model.trim="form.bendNm"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="车系名称"
        prop="carSeries"
      >
        <el-input
          placeholder="请输入车系名称"
          size="small"
          v-model.trim="form.carSeries"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="年份"
        prop="carYear"
      >
        <el-date-picker
          class="wid100"
          placeholder="请选择年份"
          type="year"
          v-model="form.carYear"
          value-format="yyyy"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="车价"
        prop="chPrice"
      >
        <el-input
          placeholder="请输入车价"
          size="small"
          v-model.trim="form.chPrice"
        >
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="权限"
        prop="chPrice"
      >
        <el-switch v-model="form.isEnable"></el-switch>
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
import Modal from "@/components/common/Modal.vue";
export default {
  name: "AddorEditCarDialog",
  components: { Modal },
  data() {
    return {
      rules: {
        bendNm: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
        ],
        carSeries: [
          { required: true, message: "请输入车系名称", trigger: "blur" }
        ],
        carYear: [{ required: true, message: "请选择年份", trigger: "change" }],
        chPrice: [{ required: true, message: "请输入车价", trigger: "blur" }]
      },
      form: {
        bendNm: "", // 品牌名称
        carSeries: "", // 车系名称
        carYear: "", // 选择的年份
        chPrice: "", // 车价
        isEnable: true // 默认开始,开启禁用
      }
    };
  },
  props: {
    value: Boolean,
    row: Object
  },
  computed: {
    isShown() {
      return this.value;
    }
  },
  mounted() {
    if (this.row) {
      this.form = { ...this.form, ...this.row };
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(111, this.form);
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