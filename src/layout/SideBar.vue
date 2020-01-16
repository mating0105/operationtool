<template>
    <section>
        <el-menu
        :collapse='isCollapse'
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409eff" 
        collapse-transition 
        unique-opened>
            <sidebar-item :menuList="menuList"></sidebar-item>
        </el-menu>
    </section>
</template>
<script>
import SidebarItem from './SidebarItem'
export default{
    name:'sideBar',
    components:{
        SidebarItem
    },
    data(){
        return{
            menuList:[
                {
                    path:'/dashboard',
                    name:'首页',
                    icon:'iconhomepage',
                    hidden:false,
                    children:[]
                },
                {
                    path:'',
                    name:'车贷系统',
                    icon:'iconchedai',
                    hidden:false,
                    children:[
                        {
                            path:'personChangeManage',
                            name:'人员异动管理',
                            hidden:false,
                            icon:'iconyidongguanli'
                        },

                    ]
                },
            ]
        }
    },
    computed:{
        isCollapse () {
            if (this.$store.state.sidebar.sliderState === 'full') {
                return false
            }
            return true
        },

    },
    methods:{
        
    },
    mounted(){
        console.log(this.$route,'router')
    }
}
</script>
<style lang="less" scoped>

</style>