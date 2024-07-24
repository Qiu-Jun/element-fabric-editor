/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 18:10:10
 * @LastEditors: June
 * @LastEditTime: 2024-07-24 18:21:50
 * @FilePath: /element-fabric-editor/build/getEnv.ts
 */
import path from 'path'

export function isDev(mode: string): boolean {
  return mode === 'development'
}

export function isProd(mode: string): boolean {
  return mode === 'production'
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.VITE_REPORT === 'true'
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT') realName = Number(realName)
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {}
    }
    ret[envName] = realName
  }
  return ret
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
