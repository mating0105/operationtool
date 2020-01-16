<template>
    <section>
        <el-col :span="24" class="toolBox" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input @keyup.native.13="getListData" placeholder="请输入用户姓名/用户登录名" v-model.trim="filters.keyWords" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getListData" icon="el-icon-search">搜索</el-button>
				</el-form-item>
				<el-form-item label="所属机构">
					<el-select @change="changeSelect('crop')" clearable v-model="filters.cropId" placeholder="请选择所属机构">
                        <el-option
                        v-for="item in cropList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="所属部门">
					<el-select @change="changeSelect('department')"  clearable v-model="filters.departmentId" placeholder="请选择所属部门">
                        <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="大区">
					<el-select @change="changeSelect('area')" clearable v-model="filters.areaId" placeholder="请选择">
                        <el-option
                        v-for="item in areaList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="用户角色">
					<el-select @change="changeSelect('role')" clearable v-model="filters.roleId" placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-button type="danger" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <div class="tabelBox">
            <el-table
            :data="tableData"
            style="width: 100%"
            :max-height="windowOutHeight-187"
            v-loading='listLoading'
            border>
                <el-table-column type="index" label="#" width="50" align="center">
                </el-table-column>
                <el-table-column prop="loginName" label="用户登录名" width="150" align="center">
                </el-table-column>
                <el-table-column prop="name" label="用户姓名" width="150" align="center">
                </el-table-column>
                <el-table-column prop="companyName" label="所属机构" align="center">
                </el-table-column>
                <el-table-column prop="roleName" label="用户角色" width="360" align="center">
                </el-table-column>
                <el-table-column prop="createdStamp" label="创建时间" align="center" width="300">
                    <template slot-scope="scope">
                        {{scope.row.createdStamp?dayjs(scope.row.createdStamp).format('YYYY-MM-DD HH:mm:ss'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="isEnable" label="状态" width="180" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isEnable==0?'':'danger'">{{scope.row.isEnable==0?'启用':'未启用'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="operation(scope.$index, scope.row)"
                        type="text"
                        size="small">
                            <i class="iconfont iconrenyuanyidong" title="人员异动管理"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[15, 50, 100, 200]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>

        <!-- 人员异动管理 -->
        <el-dialog title="人员异动管理" :visible.sync="dialogTableVisible" width="50%" :close-on-click-modal='false' @close='closeDialog'>
            <transfer-manage :closeDialog='closeDialog' :rowData='rowData' ref="childData"></transfer-manage>
        </el-dialog>
    </section>
</template>
<script src='./index.js'></script>
<style lang="less" scoped>
.toolBox{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 0 10px 0;
}
.tabelBox .el-button--text{
    padding: 0;
}
.paging{
    text-align: right;
    margin: 10px 0;
}
</style>