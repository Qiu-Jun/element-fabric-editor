/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 17:34:22
 * @LastEditors: June
 * @LastEditTime: 2024-12-26 14:13:40
 * @FilePath: /element-fabric-editor/vite.config.mts
 */

import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { isProd, loadEnv, wrapperEnv } from './build/getEnv'
import { exclude, include } from './build/optimize'
import { createVitePlugins } from './build/plugins'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, `${root}/env`)!
  const viteEnv = wrapperEnv(env)
  const envPrefix = 'APP_'

  return {
    base: './',
    publicDir: 'public',
    plugins: createVitePlugins(mode, viteEnv),
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/fontFile': {
          target: 'https://github.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fontFile/, '')
        },
        '/api': {
          target: 'https://www.kuaitu.cc/',
          changeOrigin: true
        }
      }
    },
    css: {
      postcss: {
        plugins: [autoprefixer]
      }
    },
    envPrefix,
    optimizeDeps: { include, exclude },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.mjs',
        '.vue',
        '.json',
        '.less',
        '.css',
        '.scss'
      ]
    },
    build: {
      outDir: resolve(__dirname, 'dist'),
      assetsDir: 'assets',
      assetsInlineLimit: 8192,
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境移除 console/debugger
          drop_console: true,
          drop_debugger: true
        }
      },
      // sourcemap: !isProd,
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            // 字体/图片等资源按类型归档到 assets 子目录
            const name = assetInfo.names?.[0] || ''
            if (/\.(ttf|woff2?|eot)$/.test(name)) return 'fonts/[name][extname]'
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(name)) {
              return 'images/[name][extname]'
            }
            return 'assets/[name][extname]'
          },
          // 大依赖分包；PSD/二维码/裁剪等可选库保持独立，供动态 import 懒加载
          // 注意用 node_modules/ 前缀精确匹配，避免项目目录名误命中
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined
            if (
              id.includes('node_modules/@webtoon/') ||
              id.includes('node_modules/qr-code-styling') ||
              id.includes('node_modules/jsbarcode') ||
              id.includes('node_modules/vue-cropper')
            ) {
              return undefined
            }
            if (id.includes('node_modules/fabric')) return 'fabric'
            if (
              id.includes('node_modules/element-plus') ||
              id.includes('node_modules/@element-plus')
            ) {
              return 'element-plus'
            }
            if (id.includes('node_modules/vue')) return 'vue'
            return 'vendor'
          }
        }
      }
    }
  }
})
