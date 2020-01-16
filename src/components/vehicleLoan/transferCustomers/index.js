import { getList,getCropList,getDepartmentList,getAreaList,getRoleList } from './service'
import TransferManage from './transferManage.vue'
import dayjs from 'dayjs'
export default {
    name: 'TransferCustomers',
    props:['windowOutHeight'],
    components:{
        TransferManage
    },
    data() {
        return {
            dayjs:dayjs,
            //-------tool------
            cropList:[],//所属机构
            departmentList:[],//所属部门
            areaList:[],//大区
            roleList:[],//用户角色
            filters:{
                cropId:'',//所属机构
                departmentId:'',//所属部门
                areaId:'',//大区
                roleId:'',//用户角色
                keyWords:'',//关键词
            },
            //-------table------
            tableData: [],
            rowData:{},//传入弹框的数据
            listLoading:false,
            dialogTableVisible: false,
            //---------分页------
            pageSize:15,
            currentPage:1,
            total:0,
        }
    },
    methods: {
        init(){
            this.getListData();
            this.getCropName();
            this.getRoleList();
        },
        //重置
        reset(){
            this.filters={
                cropId:'',
                departmentId:'',
                areaId:'',
                roleId:'',
                keyWords:'',
            }
            this.currentPage=1;
            this.getListData();
        },
        //获取所属机构
        async getCropName(){
            try{
                const data=await getCropList()
                if(data.data.status){
                    this.cropList=data.data.data
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
        //获取所属部门
        async getDepartmentList(){
            try{
                let para={
                    companyId:this.filters.cropId
                }
                const data=await getDepartmentList(para)
                if(data.data.status){
                    this.departmentList=data.data.data
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
        //获取大区
        async getAreaList(){
            try{
                let para={
                    officeId:this.filters.departmentId
                }
                const data=await getAreaList(para)
                if(data.data.status){
                    this.areaList=data.data.data
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
        //获取用户角色列表
        async getRoleList(){
            try{
                const data=await getRoleList()
                if(data.data.status){
                    this.roleList=data.data.data
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
        //change所属机构--所属部门--所属大区
        changeSelect(name){
            switch(name){
                case 'crop':
                    this.filters.departmentId='';
                    this.filters.areaId='';
                    this.getDepartmentList();
                    break;
                case 'department':
                    this.filters.areaId='';
                    this.getAreaList();
                    break;
                case 'area':
                    break;
                case 'role':
                    break;
            }
            this.getListData();
        },
        //-------------table--------------
        //查询tableList
        async getListData(){
            try{
                let para={
                    name:this.filters.keyWords,
                    companyId:this.filters.cropId,
                    officeId:this.filters.departmentId,
                    geoId:this.filters.areaId,
                    roleId:this.filters.roleId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
                }
                this.listLoading=true;
                const data= await getList(para)
                if(data.data.status){
                    this.tableData=data.data.data.result;
                    this.total=data.data.data.totalCount;
                }else{
                    this.$message({
                        type:'error',
                        message:data.data.msg
                    })
                }
                this.listLoading=false;
            }catch(err){
                console.log(err)
                this.listLoading=false;
            }
        },
        //人员异动管理
        operation(index, row) {
            this.rowData=row;
            this.dialogTableVisible=true;
            setTimeout(()=>{
                this.$refs.childData.init();
            },500)
        },
        //关闭弹框
        closeDialog(){
            this.dialogTableVisible=false;
            this.getListData();
        },
        //-------------分页--------
        handleSizeChange(val) {
            this.pageSize=val;
            this.currentPage=1;
            this.getListData();
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.getListData();
        },
    },
    mounted(){
        this.init();
        
    }
}