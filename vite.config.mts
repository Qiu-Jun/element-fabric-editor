/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 17:34:22
 * @LastEditors: June
 * @LastEditTime: 2024-07-25 10:36:31
 * @FilePath: /element-fabric-editor/vite.config.mts
 */

import { defineConfig } from 'vite'
import { resolve } from 'path'
import dotenv from 'dotenv'
import fs from 'node:fs'
import { createVitePlugins } from './build/plugins'
import { wrapperEnv } from './build/getEnv'
import autoprefixer from 'autoprefixer'
import type { UserConfig, ConfigEnv } from 'vite'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, `${root}/env`)!
  const viteEnv = wrapperEnv(env)
  dotenv.config(env)
  const envPrefix = 'APP_'

  return {
    base: './',
    publicDir: 'resources',
    plugins: createVitePlugins(mode, viteEnv),
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/fontFile': {
          target: 'https://github.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fontFile/, '')
        }
      }
    },
    css: {
      postcss: {
        plugins: [autoprefixer]
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'src/styles/variable.scss')}";`
        }
      }
    },
    envPrefix,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
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
      target: 'es2015',
      outDir: resolve(__dirname, 'dist'),
      assetsDir: 'assets',
      assetsInlineLimit: 8192,
      // sourcemap: !isProd,
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js'
        }
      }
    }
  }
})

function loadEnv(mode: string, envDir: string) {
  const envPath = `${envDir}/.env`
  const localEnvPath = `${envDir}/.env.${mode}`

  const _loadEnv = (envPath) => {
    const env = dotenv.config({ path: envPath })
    if (env.error) {
      throw new Error(`Failed to load env from ${envPath}: ${env.error}`)
    }
    return env.parsed
  }

  const env = [localEnvPath, envPath]
    .filter((path) => fs.existsSync(path))
    .map((path) => _loadEnv(path))

  // 将加载的环境变量合并，并添加到Vite配置中
  return env.reduce((acc, envs) => ({ ...acc, ...envs }), {})
}
