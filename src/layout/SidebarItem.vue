<template>
    <div>
        <template v-for="item in menuList" v-if="!item.hidden && item.children">
            <!-- 单级 -->
            <router-link
                    v-if="item.children&&item.children.length==0"
                    :key="item.name"
                    :to="item.path">
                <el-menu-item :index="item.path">
                    <i class="iconfont" :class="item.icon?item.icon:''"></i>
                    <span slot="title" v-if="item.name">
                        {{item.name}}
                    </span>
                </el-menu-item>
            </router-link>
            <!-- 一级菜单 -->
            <el-submenu
            v-else
            :key="item.name"
            :index="item.name || item.path"
            >
                <template slot="title">
                    <i class="iconfont" :class="item.icon?item.icon:''"></i>
                    <span slot="title" v-if="item.name">
                        {{sliderState === 'full' ? item.name : ''}}
                    </span>
                </template>
                <template v-for="child in item.children" v-if="!child.hidden">
                    <!-- 二级菜单 -->
                    <sidebar-item
                            v-if="child.children && child.children.length > 0"
                            :menuList="[child]"
                            :key="child.path">
                    </sidebar-item>

                    <router-link
                            v-else
                            :to="item.path+'/'+child.path"
                            :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <i class="iconfont" :class="child.icon?child.icon:''"></i>
                            <span slot="title" v-if="child.name">
                                {{child.name}}
                            </span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            menuList: {
                type: Array
            }
        },
        computed: {
            sliderState () {
                return this.$store.state.sidebar.sliderState
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
.el-menu-item i{
    color:#fff;
}
.el-menu-item.is-active i{
    color: #409eff;
}
.el-submenu__title i{
    color:#fff;
}
</style>
