export default {
  methods: {
    confirmWarning({
      title = '删除提示',
      content = '是否删除该项',
      confirmButtonText = '确定',
      cancelButtonText = '取消',
      showConfirmButton = true,
      showCancelButton = true,
      customClass = 'custom-message-box',
      type = 'warning',
      confirmButtonClass = 'el-button--danger confirm',
    }) {
      return this.$confirm(content, title, {
        showConfirmButton,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        customClass,
        type,
        confirmButtonClass,
      });
    },

    showErrorMsg(message) {
      this.$message({
        message,
        type: 'error',
      });
    },

    showWarningMsg(message, onClose) {
      this.$message({ message, onClose, type: 'warning' });
    },

    showWarningBox(message) {
      this.$alert(message, {
        confirmButtonText: '确定',
        title: '警告',
        closeOnClickModal: true,
        type: 'warning',
      });
    },

    showSuccessMsg(msg) {
      this.$message({
        message: msg,
        type: 'success',
      });
    },
    showInfoMsg(msg) {
      this.$message({
        message: msg,
        type: 'info',
      });
    },
  },
};
