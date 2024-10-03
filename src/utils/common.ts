/*
 * @Author: June
 * @Description: Description
 * @Date: 2024-10-03 11:51:04
 * @LastEditTime: 2024-10-03 11:51:24
 * @LastEditors: June
 */
// 是否https 等开头
export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
