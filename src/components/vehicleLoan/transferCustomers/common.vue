<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="filters" @submit.native.prevent>
                    <el-form-item>
                        <el-input v-model.trim="filters.loginName" @keyup.native.13="findByLoginName" placeholder="请输入用户登录名" clearable @change="searchChange"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="findByLoginName">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <section class="mainBox" v-if="detailsForm.loginName">
            <el-row>
                <el-col :span="12">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>用户登录名：</dt>
                        <dd>{{detailsForm.loginName?detailsForm.loginName:'--'}}</dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>所属部门：</dt>
                        <dd>{{detailsForm.officeName?detailsForm.officeName:'--'}}</dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>用户角色：</dt>
                        <dd v-if="detailsForm.roleList.length>0">
                            <span v-for="(item,index) in detailsForm.roleList" :key="item.id">
                                <span v-if="index<detailsForm.roleList.length-1">{{item.name+','}}</span>
                                <span v-else>{{item.name}}</span>
                            </span>
                        </dd>
                        <dd v-else>--</dd>
                    </dl>
                </el-col>
                <el-col :span="12">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>用户姓名：</dt>
                        <dd>{{detailsForm.name?detailsForm.name:'--'}}</dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>所属机构：</dt>
                        <dd>{{detailsForm.companyName?detailsForm.companyName:'--'}}</dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>大区：</dt>
                        <dd>{{detailsForm.businessGroupName?detailsForm.businessGroupName:'--'}}</dd>
                    </dl>
                </el-col>
            </el-row>
        </section>
    </div>
</template>
<script>
import { findByLoginName } from './service.js'
export default {
    name:'common',
    data(){
        return {
            filters:{
                loginName:'',
            },
            detailsForm:{},
        }

    },
    methods:{
        init(){
            this.filters.loginName='';
            this.detailsForm={};
        },
        searchChange(){
            this.detailsForm={};
        },
        async findByLoginName(){
            try{
                let para={
                    loginName:this.filters.loginName
                }
                const data=await findByLoginName(para)
                if(data.data.status){
                    if(data.data.data){
                        this.detailsForm=data.data.data;
                        this.$emit('fromChild', this.detailsForm)
                    }else{
                        this.$message({
                            type:'error',
                            message:'该用户不存在！'
                        })
                    }
                }else{
                    this.$message({
                        type:'error',
                        message:data.data.msg
                    })
            }
            }catch(err){
                console.log(err)
            }
        },

    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>

</style>