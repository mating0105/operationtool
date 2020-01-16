<template>
    <section>
        <!-- 列表 -->
        <transfer-customers :windowOutHeight='windowOutHeight'/>
    </section>
</template>
<script>
import TransferCustomers from '@/components/vehicleLoan/transferCustomers/index.vue'
export default {
    name: 'personChangeManage',
    props:['windowOutHeight'],
    components:{
        TransferCustomers
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