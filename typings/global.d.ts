/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 17:59:22
 * @LastEditors: June
 * @LastEditTime: 2024-07-24 18:12:02
 * @FilePath: /element-fabric-editor/typings/global.d.ts
 */
/* Vite */
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  readonly APP_FLAG: string
  readonly APP_TITLE: string
  readonly APP_BASE_PATH: string
  readonly APP_APIHOST: string
  readonly APP_ADMINAPIHOST: string
}
