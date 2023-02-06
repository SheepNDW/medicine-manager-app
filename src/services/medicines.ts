import { request } from '../utils/request';

/**
 * 取得列表
 * @param query
 */
export const loadDataAPI = (query: any = {}) => {
  return request.get('/admin/medicines', query);
};

/**
 * 根據 id 獲取單筆資料
 * @param id - 藥品 id
 */
export const loadDataById = (id: string) => {
  return request.get(`/admin/medicines/${id}`);
};

/**
 * 新增
 * @param data
 */
export const insertAPI = (data: any) => {
  return request.post('/admin/medicines', data);
};

/**
 * 根據 id 修改
 * @param id - 藥品 id
 * @param data
 */
export const updateByIdAPI = (id: string, data: any) => {
  return request.patch(`/admin/medicines/${id}`, data);
};

/**
 * 根據 id 刪除
 * @param id
 */
export const delByIdAPI = (id: string) => {
  return request.delete(`/admin/medicines/${id}`);
};

/**
 * 根據多個 id 一次刪除多個
 * @param ids - 多個 id 用 "," 分隔
 */
export const delManyByIdsAPI = (ids: string) => {
  request.delete(`/admin/medicines/remove_many?ids=${ids}`);
};
