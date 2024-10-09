/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 17:38:29
 * @LastEditors: June
 * @LastEditTime: 2024-10-09 20:58:53
 * @FilePath: \element-fabric-editor\build\plugins.ts
 */
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { isProd } from './getEnv'
import topLevelAwait from 'vite-plugin-top-level-await'
import viteCompression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
import { isDev } from './getEnv'
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (
  mode: string,
  viteEnv: ViteEnv
): (PluginOption | PluginOption[])[] => {
  const _isProd = isProd(mode)
  const { APP_TITLE } = viteEnv

  return [
    Vue(),
    UnoCSS(),
    // vue 可以使用 jsx/tsx 语法
    VueJsx(),
    // 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue'],
      dts: './typings/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'],
      dts: './typings/components.d.ts'
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    createHtmlPlugin({
      minify: _isProd,
      inject: {
        data: {
          title: APP_TITLE
        }
      }
    }),
    topLevelAwait(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用 isDev(mode)
      deleteOriginFile: false, // 压缩后是否删除源文件
      threshold: 5120, // 体积大于 threshold 才会被压缩,单位 b
      algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz' // 生成的压缩包后缀
    })
  ]
}
