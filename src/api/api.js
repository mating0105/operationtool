/*
 * @Description: 所有接口的汇总
 * @Author: shenah
 * @Date: 2020-03-10 15:28:09
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-11 14:11:55
 */

import post, { get } from "./server";

export default {
  /** 查询字典 */
  queryDictionaries: params =>
    post({
      params,
      url: "/operation/dict/getDictByTypes",
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    }),
  /** 车辆 */
  // 获取t+0的车辆列表
  queryTList: params => get({ params, url: "/operation/car/list" }),
  // 新增或者编辑t+0车辆
  addOrEdiTcar: params =>
    post({
      params,
      url: "/operation/car/save"
    }),
  // 删除t+0车辆
  deleteTcar: params =>
    get({
      params,
      url: "/operation/car/delete"
    }),
  // 禁用或者启用t+0
  enableTCar: params =>
    get({
      params,
      url: "/operation/car/enable"
    }),
  /** 客户信息 */
  // 获取客户信息列表
  queryCustomerList: params =>
    get({ params, url: "/operation/personal/listData" }),
  // 编辑客户信息
  editCustomerInfo: params => post({ params, url: "/operation/personal/save" })
};
