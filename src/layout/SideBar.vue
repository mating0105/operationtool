<template>
  <section>
    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      active-text-color="#409eff"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      collapse-transition
      text-color="#fff"
      unique-opened
    >
      <sidebar-item :menuList="menuList"></sidebar-item>
    </el-menu>
  </section>
</template>
<script>
import SidebarItem from "./SidebarItem";
export default {
  name: "sideBar",
  components: {
    SidebarItem
  },
  data() {
    return {
      menuList: [
        {
          path: "/dashboard",
          name: "首页",
          icon: "iconhomepage",
          hidden: false,
          children: []
        },
        {
          path: "",
          name: "车贷系统",
          icon: "iconchedai",
          hidden: false,
          children: [
            {
              path: "personChangeManage",
              name: "人员异动管理",
              hidden: false,
              icon: "iconyidongguanli"
            },
            {
              path: "t0CarAdd",
              name: "T+0车型管理",
              hidden: false,
              icon: "icontcar"
            },
            {
              path: "customerManage",
              name: "客户信息管理",
              hidden: false,
              icon: "el-icon-s-custom"
            }
          ]
        }
      ]
    };
  },
  computed: {
    isCollapse() {
      if (this.$store.state.sidebar.sliderState === "full") {
        return false;
      }
      return true;
    }
  },
  methods: {},
  mounted() {
  }
};
</script>
<style lang="less" scoped>
</style>