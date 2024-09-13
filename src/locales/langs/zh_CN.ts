/*
 * @Author: June
 * @Description:
 * @Date: 2024-08-30 12:15:37
 * @LastEditTime: 2024-08-30 13:54:47
 * @LastEditors: June
 * @FilePath: \ai-desing\src\locales\lang\zh_CN.ts
 */
import { genMessage } from '../helper'

const modulesFiles = import.meta.glob<Recordable>('./zh-CN/**/*.json', {
  eager: true
})

export default {
  message: {
    ...genMessage(modulesFiles, 'zh-CN')
  }
}
