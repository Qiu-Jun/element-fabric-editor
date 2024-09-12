/*
 * @Author: June
 * @Description:
 * @Date: 2024-08-19 12:53:30
 * @LastEditTime: 2024-09-12 10:39:32
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\uno.config.ts
 */
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class' // 将一组类编译为一个类

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    { 'wh-full': 'w-full h-full' },
    { 'f-center': 'flex justify-center items-center' }
  ]
})
