<template>
    <section>
        <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="客户批量移交" name="first">
                    
                </el-tab-pane>
                <el-tab-pane label="在途流程移交" name="second">
                    
                </el-tab-pane>
            </el-tabs>
        </template>
    </section>
</template>
<script>
export default {
    name:'transfer',
    data(){
        return{
            activeName: 'first'

        }
    },
    methods:{
        handleClick(tab, event) {
            
        }
    }
    
}
</script>
<style lang="less" scoped>

</style>