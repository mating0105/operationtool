
import axios from "axios";
//执行记录
export const getList = params => {
    return axios.get(`operation/user/list`, {
        params: params
    });
};
//获取公司
export const getCropList = params => {
    return axios.get(`operation/user/office/company`,{params})

}
//获取部门
export const getDepartmentList = params => {
    return axios.get(`operation/user/office/office`,{params})

}
//获取大区
export const getAreaList = params => {
    return axios.get(`operation/user/office/group`,{params})

}
//获取角色列表
export const getRoleList = params => {
    return axios.get(`operation/user/role/list`,{params})
}
//查询用户
export const findByLoginName = params => {
    return axios.get(`operation/user/findByLoginName`,{params})
}
//移交客户
export const moveCustomer = params => {
    return axios.get(`operation/personal/moveCustomer`,{params})
}
//移交流程
export const moveFlowpath = params => {
    return axios.get(`operation/personal/moveBusiness`,{params})
}
//统计流程数量
export const businessCount = params => {
    return axios.get(`operation/personal/businessCount`,{params})
}