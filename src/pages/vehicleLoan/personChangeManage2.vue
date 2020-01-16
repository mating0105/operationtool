<template>
    <section>
        <!-- 列表 -->
        <transfer :windowOutHeight='windowOutHeight'/>
    </section>
</template>
<script>
import transfer from '@/components/vehicleLoan/transferCustomers1/index.vue'
export default {
    name: 'personChangeManage1',
    props:['windowOutHeight'],
    components:{
        transfer
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>

</style>