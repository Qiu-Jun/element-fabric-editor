/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 17:38:29
 * @LastEditors: June
 * @LastEditTime: 2024-07-24 19:57:43
 * @FilePath: /element-fabric-editor/build/plugins.ts
 */
import { resolve } from 'path'
import { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
import { isProd } from './getEnv'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
    })
  ]
}
