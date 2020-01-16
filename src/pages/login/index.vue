<template>
    <section id="login_wrapper" class="bgimage">
        <div class="loginform">
            <el-form ref="form" :model="form" :rules="ruleForm">
                <el-form-item>
                    <h2>欢迎登录{{$store.state.SystemName}}</h2>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input 
                    placeholder="请输入用户名" 
                    v-model.trim="form.username" 
                    autofocus="autofocus"
                    clearable
                    @blur="checkMoblie" 
                    @keyup.native.13="handleLogin('form')"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input 
                    placeholder="请输入密码" 
                    :type="passwordType" 
                    v-model.trim="form.password"
                    @keyup.native.13="handleLogin('form')">
                        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                    </el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button :loading="loading" type="primary" @click="handleLogin('form')">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import storage from '@/utils/storage'
import { getloginData } from '@/api/common.js'
export default {
    name: 'login',
    data() {
        return {
            form: {
                username: storage.get('loginUser').username || '',
                password: storage.get('loginUser').password || '',
            },
            ruleForm:{
                username:[{required: true, message: '请输入用户名', trigger: 'blur'}],
                password:[{required: true, message: '请输入密码', trigger: 'blur'}],
            },
            passwordType:'password',
            loading:false,
            loginData:[],
            lang: this.$store.state.language,
        }
    },
    methods: {
      handleLogin(formName) {
        this.$refs[formName].validate(async valid => {
            if(valid){
                this.loading=true;
                this.loginData.forEach((item,index)=>{
                    if(item.username===this.form.username){
                        if(item.password===this.form.password){
                            this.$message({
                                type:'success',
                                message:'登录成功'
                            })
                            this.$store.dispatch('loginByUser', item.role);
                            sessionStorage.setItem('userData', JSON.stringify(item));
                            this.$notify.closeAll();
                            this.$router.push({path:'/'});
                            this.loading = false;
                        }else{
                            this.$message({
                                type:'error',
                                message:'登录失败：密码错误！'
                            })
                            this.loading = false;
                        }
                    }
                })
            }else{
                this.$message({
                    type:'error',
                    message:'请先完善信息！'
                })

            }
        })
      },
      //检查用户是否存在
      checkMoblie () {
        if (this.form.username.length > 0) {
            var result = this.loginData.some(item=>{
                if(item.username===this.form.username){
                    return true
                }
            })
            if(!result){
                this.$message({
                    type:'error',
                    message:'此系统中不存在此账号'
                })
            }
        }
      },
      showPassword(){
          this.passwordType=this.passwordType=='password'?'':'password'
      }
    },
    mounted () {
        this.loginData = getloginData();
        this.$notify({
            title: '登陆提示',
            dangerouslyUseHTMLString: true,
            message: '<strong style="color:#409EFF;">欢迎登录运维管理系统！</strong><br/><span>用户名为您注册时使用的账号</span>',
            position: 'top-right',
            duration: 0
        })
    },
}
</script>
<style lang='less' scoped>
#login-wrapper {
    width: 100%;
    height: 100%;
}
.bgimage{
    width: 100%;
    height: 100%;
    background:url(../../assets/image/background.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginform{
    width: 400px;
    height: 300px;
    border:1px solid #ccc;
    border-radius: 10px;
    box-shadow:2px 5px 10px #666;
    background-color: rgba(64,158,255,0.1);
    
}
.loginform>.el-form{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-form-item,.btn{
        width:80%;
        .el-button--medium{
            width: 100%;
            margin-top:20px;
        }
    }
}

</style>
