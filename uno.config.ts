/*
 * @Author: June
 * @Description:
 * @Date: 2024-08-19 12:53:30
 * @LastEditTime: 2024-10-03 11:17:28
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\uno.config.ts
 */
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives
} from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class' // 将一组类编译为一个类

export default defineConfig({
   content: {
    pipeline: {
      exclude: ["node_modules", "dist", ".git", ".husky", ".vscode", "public", "build"]
    }
  },
  transformers: [transformerDirectives(), transformerCompileClass()],
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    { 'wh-full': 'w-full h-full' },
    { 'f-center': 'flex justify-center items-center' },
    { 'text-over-1': 'overflow-hidden text-ellipsis whitespace-nowrap' }
  ]
})
