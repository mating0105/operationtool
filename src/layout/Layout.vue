<template>
    <section id="entryPage">
        <el-header>
            <nav-bar />
        </el-header>
        <el-container>
            <el-aside :width="asideWidth">
                <side-bar class="sidebar-container" />
            </el-aside>
            <el-main>
                <app-main />
            </el-main> 
        </el-container>
    </section>
</template>
<script>
import NavBar from './Navbar'
import SideBar from './SideBar'
import AppMain from './AppMain'
export default{
    name:"layout",
    components:{
        NavBar,
        SideBar,
        AppMain
    },
    computed: {
        asideWidth() {
            return this.$store.getters.getSliderStateWidth
        }
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
#entryPage{
    height:100%;
}
#entryPage .el-main{
    padding: 0;
}
</style>