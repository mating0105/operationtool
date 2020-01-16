<template>
    <section class="nav">
        <div class="navLeft">
            <div>
                <img class="el-header__icon" src="@/assets/image/logo.png" width="34px" height="34px" :alt="$store.state.SystemName" style="margin-right:10px;">
                <span class="title">{{$store.state.SystemName}}</span>
                <span><el-tag class="version" size='mini'>{{$store.state.version}}</el-tag></span>
            </div>
            <div style="margin-left:40px;" @click="handleSwitchNavbar">
                <i class="iconfont iconshouqi" style="font-size:28px;float:left;height:100%;cursor:pointer;" title="折叠菜单"></i>
            </div>
            <div style="margin-left:30px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="(item, index) in list"
                        v-if="item.meta.title"
                        :key="item.path">
                        <span class="no-redirect" v-if="item.redirect === 'noredirect' || index === item.length - 1">
                            {{getTitle(item.meta.title)}}
                        </span>
                        <router-link v-else :to="item.redirect || item.path">
                            {{getTitle(item.meta.title)}}
                        </router-link>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="navRight">
            <el-dropdown trigger="click" @command="dropdownComm" class="info-area__dropdown">
                <el-tag type="primary">
                    <span class="el-dropdown-link">
                    {{name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                </el-tag>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    <!-- <el-dropdown-item divided command="logout">退出登录</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
            <div @click="jumpToProfile" class="avatar">
                <img src="@/assets/image/background.jpg" style="width:100%;height:100%;"/>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name:'navbar',
    data(){
        return{
            list:[],
            name:''
        }
    },
    created() {
        this.getBreadcrumb()
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    methods:{
        //------------left-----------
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            // if (matched[0] && matched[0].name !== 'dashboard') {
            //     matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(
            //     matched
            //     )
            // }
            this.list = matched
        },
        getTitle(title) {
            if (this.$te(`route.${title}`)) {
                return this.$t(`route.${title}`)
            }
            return title
        },
        handleSwitchNavbar(){
            this.$store.dispatch('toggleSideBar');
        },
        //------right-----------
        dropdownComm(command) {
            switch (command) {
                case 'logout':
                    this.logouthandle()
                    break
            }
        },
        //退出登录
        logouthandle(){
            this.$store.dispatch('loginByUser', []);
            sessionStorage.clear();
            this.$router.push({
                path: '/login'
            })
        },
        //点击头像
        jumpToProfile() {
            
        },

    },
    mounted() {
        this.name=JSON.parse(sessionStorage.getItem('userData')).name;
        if (!this.$store.state.sidebar.sliderState) {
            this.$store.dispatch('setSliderState', 'full')
        }
        
    },
    
}
</script>
<style lang="less" scoped>
.nav{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}
.navLeft,.navRight{
    display: flex;
    align-items: center;
}
.title{
    font-weight: bold;
    font-size:20px;
    box-shadow: 4px 4px 4px 6px rgba(64,158,255,.2);
}
.version{
    font-size:12px;
    margin-left: 10px;
}
.avatar{
    width: 40px;
    height:40px;
    border-radius: 50%;
    // border:1px solid #409EFF;
    margin-left: 20px;
    overflow: hidden;
}
</style>