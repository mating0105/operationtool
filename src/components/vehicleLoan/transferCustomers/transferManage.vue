<template>
    <div id="personTransfer">
        <el-tabs v-model="activeName" @tab-click="init">
                <el-tab-pane label="客户批量移交管理" name="first">
                    <template>
                        <common ref="myChildOne" class="commonBox" @fromChild="getChild"></common>
                        <div class="buttonbox clear">
                            <el-button :loading="buttonLoading" @click="clickMoveCustomer" type="primary" style="float:right;">移交客户</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="在途流程管理" name="second">
                    <div  class="commonBox">
                        <common ref="myChildTwo" @fromChild="getChild"></common>
                        <el-form :model='filters' :inline="true" style="margin-top:10px;">
                            <el-form-item label="移交的流程类型：">
                                <template>
                                    <el-select v-model="filters.businessType" placeholder="请选择">
                                        <el-option
                                        v-for="item in businessTypeList"
                                        :key="item.businessType"
                                        :label="item.businessName"
                                        :value="item.businessType">
                                        <span style="float: left">{{ item.businessName }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.businessNum }}</span>
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="buttonbox clear">
                        <span style="color:red;">{{msg}}</span>
                        <el-button :loading="btnLoading" :disabled="btndisabled" @click="clickMoveFlowpath" type="primary" style="float:right;">移交流程</el-button>
                    </div>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import common from './common'
import { findByLoginName,moveCustomer,moveFlowpath,businessCount } from './service.js'
export default {
    name:'transferManage',
    props:{
      rowData: Object,
      closeDialog: Function,
    },
    components:{
        common
    },
    data(){
        return {
            //--------tab:first-----
            activeName: 'first',
            formData:{},
            buttonLoading:false,
            //--------tab:second-----
            btnLoading:false,
            btndisabled:false,
            msg:'',
            filters:{
                businessType:''
            },
            businessTypeList: [],
        }
    },
    methods:{
        init(){
            if(this.activeName=='first'){
                setTimeout(()=>{
                    this.$refs.myChildOne.init();
                },300)
            }else{
                this.filters.businessType='';
                this.getbusinessCount();
                setTimeout(()=>{
                    this.$refs.myChildTwo.init();
                },300)
            }
        },
        getChild(formData){
            this.formData=formData;
        },
        //----tab:first-------------
        //点击客户移交
        clickMoveCustomer(){
            this.$confirm('是否确认移交客户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.moveCustomer();
            })
        },
        //客户移交
        async moveCustomer(){
            try{
                let para={
                    oldId:this.rowData.id,
                    newId:this.formData.id,
                }
                this.buttonLoading=true;
                const data=await moveCustomer(para)
                if(data.data.status){
                    this.$message({
                        type:'success',
                        message:data.data.msg
                    })
                    this.closeDialog();
                }else{
                    this.$message({
                        type:'error',
                        message:data.data.msg
                    })
                }
                this.buttonLoading=false;
            }catch(err){
                console.log(err)
                this.buttonLoading=false;
            }
        },
        //点击流程移交
        clickMoveFlowpath(){
            this.$confirm('是否确认移交流程？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.moveFlowpath();
            })
        },
        //流程移交
        async moveFlowpath(){
            try{
                let para={
                    oldId:this.rowData.id,
                    newId:this.formData.id,
                    businessType:this.filters.businessType,
                }
                this.btnLoading=true;
                const data=await moveFlowpath(para)
                if(data.data.status){
                    this.$message({
                        type:'success',
                        message:data.data.msg
                    })
                    this.closeDialog();
                }else{
                    this.$message({
                        type:'error',
                        message:data.data.msg
                    })
                }
                this.btnLoading=false;
            }catch(err){
                console.log(err)
                this.btnLoading=false;
            }
        },
        //统计流程数量
        async getbusinessCount(){
            try{
                let para={
                    oldId:this.rowData.id,
                }
                const data=await businessCount(para);
                if(data.data.status){
                    this.businessTypeList=data.data.data;
                    if(this.businessTypeList.length>0){
                        this.msg='';
                        this.btndisabled=false;
                    }else{
                        this.msg='暂无可移交的流程！';
                        this.btndisabled=true;
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
        }
    },
    mounted(){
    }
    
}
</script>
<style lang="less" scoped>
.buttonbox{
    margin: 15px 0 0 0;
}
#personTransfer .el-tabs__header{
    margin: 0;
}
.commonBox{
    min-height: 300px;
}
</style>