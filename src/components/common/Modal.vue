<!--
 * @Description: 公用弹窗
 * @Author: shenah
 * @Date: 2020-03-10 11:34:04
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-10 11:34:28
 -->

<template>
  <el-dialog
    :visible="visible"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    @close="close"
    @open="open"
  >
    <span slot="title">
      <slot name="head"></slot>
    </span>
    <slot name="body"></slot>
    <span slot="footer">
      <slot name="foot"></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    title: String,
    width: {
      type: String,
      default: '560px',
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: 'custom-dialog',
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('onClosed');
    },
    open() {
      this.$emit('onOpen');
    },
  },
};
</script>
<style lang='less' scoped>
</style>
