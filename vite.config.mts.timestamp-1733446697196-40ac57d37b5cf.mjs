// vite.config.mts
import autoprefixer from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/autoprefixer@10.4.19_postcss@5.2.18/node_modules/autoprefixer/lib/autoprefixer.js";
import { resolve as resolve2 } from "path";
import { defineConfig } from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1/node_modules/vite/dist/node/index.js";

// build/getEnv.ts
import dotenv from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/main.js";
import fs from "node:fs";
function isProd(mode) {
  return mode === "production";
}
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}
function loadEnv(mode, envDir) {
  const envPath = `${envDir}/.env`;
  const localEnvPath = `${envDir}/.env.${mode}`;
  const _loadEnv = (envPath2) => {
    const env2 = dotenv.config({ path: envPath2 });
    if (env2.error) {
      throw new Error(`Failed to load env from ${envPath2}: ${env2.error}`);
    }
    return env2.parsed;
  };
  const env = [localEnvPath, envPath].filter((path) => fs.existsSync(path)).map((path) => _loadEnv(path));
  return env.reduce((acc, envs) => ({ ...acc, ...envs }), {});
}

// build/optimize.ts
var include = [
  "vue",
  "sass",
  "axios",
  "dayjs",
  "unocss",
  "vue-router",
  "vue-i18n",
  "lodash-es",
  "element-plus",
  "element-plus/es",
  "element-plus/es/locale/lang/zh-cn",
  "element-plus/es/locale/lang/en",
  "element-plus/es/components/backtop/style/css",
  "element-plus/es/components/form/style/css",
  "element-plus/es/components/radio-group/style/css",
  "element-plus/es/components/radio/style/css",
  "element-plus/es/components/checkbox/style/css",
  "element-plus/es/components/checkbox-group/style/css",
  "element-plus/es/components/switch/style/css",
  "element-plus/es/components/time-picker/style/css",
  "element-plus/es/components/date-picker/style/css",
  "element-plus/es/components/descriptions/style/css",
  "element-plus/es/components/descriptions-item/style/css",
  "element-plus/es/components/link/style/css",
  "element-plus/es/components/tooltip/style/css",
  "element-plus/es/components/drawer/style/css",
  "element-plus/es/components/dialog/style/css",
  "element-plus/es/components/checkbox-button/style/css",
  "element-plus/es/components/option-group/style/css",
  "element-plus/es/components/radio-button/style/css",
  "element-plus/es/components/cascader/style/css",
  "element-plus/es/components/color-picker/style/css",
  "element-plus/es/components/input-number/style/css",
  "element-plus/es/components/rate/style/css",
  "element-plus/es/components/select-v2/style/css",
  "element-plus/es/components/tree-select/style/css",
  "element-plus/es/components/slider/style/css",
  "element-plus/es/components/time-select/style/css",
  "element-plus/es/components/autocomplete/style/css",
  "element-plus/es/components/image-viewer/style/css",
  "element-plus/es/components/upload/style/css",
  "element-plus/es/components/col/style/css",
  "element-plus/es/components/form-item/style/css",
  "element-plus/es/components/alert/style/css",
  "element-plus/es/components/breadcrumb/style/css",
  "element-plus/es/components/select/style/css",
  "element-plus/es/components/input/style/css",
  "element-plus/es/components/breadcrumb-item/style/css",
  "element-plus/es/components/tag/style/css",
  "element-plus/es/components/pagination/style/css",
  "element-plus/es/components/table/style/css",
  "element-plus/es/components/table-v2/style/css",
  "element-plus/es/components/table-column/style/css",
  "element-plus/es/components/card/style/css",
  "element-plus/es/components/row/style/css",
  "element-plus/es/components/button/style/css",
  "element-plus/es/components/menu/style/css",
  "element-plus/es/components/sub-menu/style/css",
  "element-plus/es/components/menu-item/style/css",
  "element-plus/es/components/option/style/css",
  "element-plus/es/components/dropdown/style/css",
  "element-plus/es/components/dropdown-menu/style/css",
  "element-plus/es/components/dropdown-item/style/css",
  "element-plus/es/components/skeleton/style/css",
  "element-plus/es/components/skeleton/style/css",
  "element-plus/es/components/backtop/style/css",
  "element-plus/es/components/menu/style/css",
  "element-plus/es/components/sub-menu/style/css",
  "element-plus/es/components/menu-item/style/css",
  "element-plus/es/components/dropdown/style/css",
  "element-plus/es/components/tree/style/css",
  "element-plus/es/components/dropdown-menu/style/css",
  "element-plus/es/components/dropdown-item/style/css",
  "element-plus/es/components/badge/style/css",
  "element-plus/es/components/breadcrumb/style/css",
  "element-plus/es/components/breadcrumb-item/style/css",
  "element-plus/es/components/image/style/css",
  "element-plus/es/components/collapse-transition/style/css",
  "element-plus/es/components/timeline/style/css",
  "element-plus/es/components/timeline-item/style/css",
  "element-plus/es/components/collapse/style/css",
  "element-plus/es/components/collapse-item/style/css",
  "element-plus/es/components/button-group/style/css",
  "element-plus/es/components/text/style/css"
];
var exclude = [];

// build/plugins.ts
import Vue from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/@vitejs+plugin-vue@5.1.0_vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1__vue@3.4.33_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueJsx from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1__vue@3.4.33_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
import UnoCSS from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/unocss@0.58.9_postcss@5.2.18_rollup@4.19.0_vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/unplugin-auto-import@0.16.7_@vueuse+core@10.11.0_vue@3.4.33_typescript@5.5.4___rollup@4.19.0/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/unplugin-vue-components@0.27.3_@babel+parser@7.25.7_rollup@4.19.0_vue@3.4.33_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/unplugin-vue-components@0.27.3_@babel+parser@7.25.7_rollup@4.19.0_vue@3.4.33_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { createHtmlPlugin } from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1_/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import viteCompression from "file:///E:/github/element-fabric-editor/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.3.4_@types+node@20.14.12_sass@1.77.8_terser@5.34.1_/node_modules/vite-plugin-compression/dist/index.mjs";
var createVitePlugins = (mode, viteEnv) => {
  const _isProd = isProd(mode);
  const { APP_TITLE } = viteEnv;
  return [
    Vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith("wc-") }
      }
    }),
    UnoCSS(),
    // vue 可以使用 jsx/tsx 语法
    VueJsx(),
    // 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue"],
      dts: "./typings/auto-imports.d.ts",
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ["src/components"],
      dts: "./typings/components.d.ts"
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    }),
    createHtmlPlugin({
      minify: _isProd,
      inject: {
        data: {
          title: APP_TITLE
        }
      }
    }),
    viteCompression({
      verbose: true,
      // 是否在控制台输出压缩结果
      disable: false,
      // 是否禁用 isDev(mode)
      deleteOriginFile: false,
      // 压缩后是否删除源文件
      threshold: 5120,
      // 体积大于 threshold 才会被压缩,单位 b
      algorithm: "gzip",
      // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: ".gz"
      // 生成的压缩包后缀
    })
  ];
};

// vite.config.mts
var __vite_injected_original_dirname = "E:\\github\\element-fabric-editor";
var vite_config_default = defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, `${root}/env`);
  const viteEnv = wrapperEnv(env);
  const envPrefix = "APP_";
  return {
    base: "./",
    publicDir: "public",
    plugins: createVitePlugins(mode, viteEnv),
    server: {
      port: 3e3,
      open: true,
      proxy: {
        "/fontFile": {
          target: "https://github.com/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fontFile/, "")
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
          additionalData: `@import "${resolve2(__vite_injected_original_dirname, "src/styles/variable.scss")}";`
        }
      }
    },
    envPrefix,
    optimizeDeps: { include, exclude },
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      },
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".mjs",
        ".vue",
        ".json",
        ".less",
        ".css",
        ".scss"
      ]
    },
    build: {
      target: "es2015",
      outDir: resolve2(__vite_injected_original_dirname, "dist"),
      assetsDir: "assets",
      assetsInlineLimit: 8192,
      minify: "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      },
      // sourcemap: !isProd,
      emptyOutDir: true,
      rollupOptions: {
        input: resolve2(__vite_injected_original_dirname, "index.html"),
        output: {
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgImJ1aWxkL2dldEVudi50cyIsICJidWlsZC9vcHRpbWl6ZS50cyIsICJidWlsZC9wbHVnaW5zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXGVsZW1lbnQtZmFicmljLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXGVsZW1lbnQtZmFicmljLWVkaXRvclxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi9lbGVtZW50LWZhYnJpYy1lZGl0b3Ivdml0ZS5jb25maWcubXRzXCI7LypcclxuICogQEF1dGhvcjogSnVuZVxyXG4gKiBARGVzY3JpcHRpb246XHJcbiAqIEBEYXRlOiAyMDI0LTA3LTI0IDE3OjM0OjIyXHJcbiAqIEBMYXN0RWRpdG9yczogSnVuZVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDI0LTExLTI5IDEyOjA3OjA0XHJcbiAqIEBGaWxlUGF0aDogL2VsZW1lbnQtZmFicmljLWVkaXRvci92aXRlLmNvbmZpZy5tdHNcclxuICovXHJcblxyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgaXNQcm9kLCBsb2FkRW52LCB3cmFwcGVyRW52IH0gZnJvbSAnLi9idWlsZC9nZXRFbnYnXHJcbmltcG9ydCB7IGV4Y2x1ZGUsIGluY2x1ZGUgfSBmcm9tICcuL2J1aWxkL29wdGltaXplJ1xyXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xyXG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBgJHtyb290fS9lbnZgKSFcclxuICBjb25zdCB2aXRlRW52ID0gd3JhcHBlckVudihlbnYpXHJcbiAgY29uc3QgZW52UHJlZml4ID0gJ0FQUF8nXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiAnLi8nLFxyXG4gICAgcHVibGljRGlyOiAncHVibGljJyxcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKG1vZGUsIHZpdGVFbnYpLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9mb250RmlsZSc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vZ2l0aHViLmNvbS8nLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2ZvbnRGaWxlLywgJycpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyXVxyXG4gICAgICB9LFxyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgbGVzczoge1xyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcy92YXJpYWJsZS5zY3NzJyl9XCI7YFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVudlByZWZpeCxcclxuICAgIG9wdGltaXplRGVwczogeyBpbmNsdWRlLCBleGNsdWRlIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAgICd2dWUtaTE4bic6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcydcclxuICAgICAgfSxcclxuICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICcudHMnLFxyXG4gICAgICAgICcudHN4JyxcclxuICAgICAgICAnLmpzJyxcclxuICAgICAgICAnLm1qcycsXHJcbiAgICAgICAgJy52dWUnLFxyXG4gICAgICAgICcuanNvbicsXHJcbiAgICAgICAgJy5sZXNzJyxcclxuICAgICAgICAnLmNzcycsXHJcbiAgICAgICAgJy5zY3NzJ1xyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcclxuICAgICAgb3V0RGlyOiByZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QnKSxcclxuICAgICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcclxuICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDgxOTIsXHJcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgLy9cdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY1RjZcdTc5RkJcdTk2NjRjb25zb2xlXHJcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvLyBzb3VyY2VtYXA6ICFpc1Byb2QsXHJcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgaW5wdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0uW2hhc2hdLmpzJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLltoYXNoXS5qcydcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXGVsZW1lbnQtZmFicmljLWVkaXRvclxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXGVsZW1lbnQtZmFicmljLWVkaXRvclxcXFxidWlsZFxcXFxnZXRFbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi9lbGVtZW50LWZhYnJpYy1lZGl0b3IvYnVpbGQvZ2V0RW52LnRzXCI7LypcclxuICogQEF1dGhvcjogSnVuZVxyXG4gKiBARGVzY3JpcHRpb246XHJcbiAqIEBEYXRlOiAyMDI0LTA3LTI0IDE4OjEwOjEwXHJcbiAqIEBMYXN0RWRpdG9yczogSnVuZVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDI0LTA3LTI0IDE4OjIxOjUwXHJcbiAqIEBGaWxlUGF0aDogL2VsZW1lbnQtZmFicmljLWVkaXRvci9idWlsZC9nZXRFbnYudHNcclxuICovXHJcbmltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiXHJcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRGV2KG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2QobW9kZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xyXG59XHJcblxyXG4vLyBSZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9XHJcblxyXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xyXG4gICAgbGV0IHJlYWxOYW1lID0gZW52Q29uZltlbnZOYW1lXS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJylcclxuICAgIHJlYWxOYW1lID1cclxuICAgICAgcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWVcclxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QT1JUJykgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUFJPWFknKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmVhbE5hbWUgPSBKU09OLnBhcnNlKHJlYWxOYW1lKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge31cclxuICAgIH1cclxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lXHJcbiAgfVxyXG4gIHJldHVybiByZXRcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB1c2VyIHJvb3QgZGlyZWN0b3J5XHJcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFBhdGgoLi4uZGlyOiBzdHJpbmdbXSkge1xyXG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRFbnYobW9kZTogc3RyaW5nLCBlbnZEaXI6IHN0cmluZykge1xyXG4gIGNvbnN0IGVudlBhdGggPSBgJHtlbnZEaXJ9Ly5lbnZgXHJcbiAgY29uc3QgbG9jYWxFbnZQYXRoID0gYCR7ZW52RGlyfS8uZW52LiR7bW9kZX1gXHJcblxyXG4gIGNvbnN0IF9sb2FkRW52ID0gKGVudlBhdGgpID0+IHtcclxuICAgIGNvbnN0IGVudiA9IGRvdGVudi5jb25maWcoeyBwYXRoOiBlbnZQYXRoIH0pXHJcbiAgICBpZiAoZW52LmVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgZW52IGZyb20gJHtlbnZQYXRofTogJHtlbnYuZXJyb3J9YClcclxuICAgIH1cclxuICAgIHJldHVybiBlbnYucGFyc2VkXHJcbiAgfVxyXG5cclxuICBjb25zdCBlbnYgPSBbbG9jYWxFbnZQYXRoLCBlbnZQYXRoXVxyXG4gICAgLmZpbHRlcigocGF0aCkgPT4gZnMuZXhpc3RzU3luYyhwYXRoKSlcclxuICAgIC5tYXAoKHBhdGgpID0+IF9sb2FkRW52KHBhdGgpKVxyXG5cclxuICAvLyBcdTVDMDZcdTUyQTBcdThGN0RcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTU0MDhcdTVFNzZcdUZGMENcdTVFNzZcdTZERkJcdTUyQTBcdTUyMzBWaXRlXHU5MTREXHU3RjZFXHU0RTJEXHJcbiAgcmV0dXJuIGVudi5yZWR1Y2UoKGFjYywgZW52cykgPT4gKHsgLi4uYWNjLCAuLi5lbnZzIH0pLCB7fSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGdpdGh1YlxcXFxlbGVtZW50LWZhYnJpYy1lZGl0b3JcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGdpdGh1YlxcXFxlbGVtZW50LWZhYnJpYy1lZGl0b3JcXFxcYnVpbGRcXFxcb3B0aW1pemUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi9lbGVtZW50LWZhYnJpYy1lZGl0b3IvYnVpbGQvb3B0aW1pemUudHNcIjtjb25zdCBpbmNsdWRlID0gW1xyXG4gICd2dWUnLFxyXG4gICdzYXNzJyxcclxuICAnYXhpb3MnLFxyXG4gICdkYXlqcycsXHJcbiAgJ3Vub2NzcycsXHJcbiAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICd2dWUtaTE4bicsXHJcbiAgJ2xvZGFzaC1lcycsXHJcbiAgJ2VsZW1lbnQtcGx1cycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9sb2NhbGUvbGFuZy96aC1jbicsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9sb2NhbGUvbGFuZy9lbicsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JhY2t0b3Avc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZm9ybS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYWRpby1ncm91cC9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYWRpby9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC1ncm91cC9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zd2l0Y2gvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGltZS1waWNrZXIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGVzY3JpcHRpb25zL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Rlc2NyaXB0aW9ucy1pdGVtL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2xpbmsvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdG9vbHRpcC9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcmF3ZXIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGlhbG9nL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NoZWNrYm94LWJ1dHRvbi9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9vcHRpb24tZ3JvdXAvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tYnV0dG9uL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Nhc2NhZGVyL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbG9yLXBpY2tlci9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmF0ZS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zZWxlY3QtdjIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS1zZWxlY3Qvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2xpZGVyL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RpbWUtc2VsZWN0L3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbWFnZS12aWV3ZXIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdXBsb2FkL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbC9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9mb3JtLWl0ZW0vc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYWxlcnQvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zZWxlY3Qvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaW5wdXQvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi1pdGVtL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhZy9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9wYWdpbmF0aW9uL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlLXYyL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlLWNvbHVtbi9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jYXJkL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3Jvdy9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9idXR0b24vc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zdWItbWVudS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZW51LWl0ZW0vc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvb3B0aW9uL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duLW1lbnUvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24taXRlbS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9za2VsZXRvbi9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9za2VsZXRvbi9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9iYWNrdG9wL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21lbnUvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3ViLW1lbnUvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS1pdGVtL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24tbWVudS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1pdGVtL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JhZGdlL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JyZWFkY3J1bWIvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi1pdGVtL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2ltYWdlL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbGxhcHNlLXRyYW5zaXRpb24vc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGltZWxpbmUvc3R5bGUvY3NzJyxcclxuICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGltZWxpbmUtaXRlbS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xsYXBzZS9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xsYXBzZS1pdGVtL3N0eWxlL2NzcycsXHJcbiAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2J1dHRvbi1ncm91cC9zdHlsZS9jc3MnLFxyXG4gICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90ZXh0L3N0eWxlL2NzcydcclxuXVxyXG5cclxuY29uc3QgZXhjbHVkZSA9IFtdXHJcblxyXG5leHBvcnQgeyBpbmNsdWRlLCBleGNsdWRlIH1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcZWxlbWVudC1mYWJyaWMtZWRpdG9yXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcZWxlbWVudC1mYWJyaWMtZWRpdG9yXFxcXGJ1aWxkXFxcXHBsdWdpbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi9lbGVtZW50LWZhYnJpYy1lZGl0b3IvYnVpbGQvcGx1Z2lucy50c1wiOy8qXHJcbiAqIEBBdXRob3I6IEp1bmVcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKiBARGF0ZTogMjAyNC0wNy0yNCAxNzozODoyOVxyXG4gKiBATGFzdEVkaXRvcnM6IEp1bmVcclxuICogQExhc3RFZGl0VGltZTogMjAyNC0xMS0xNyAwOToxNjowOVxyXG4gKiBARmlsZVBhdGg6IFxcZWxlbWVudC1mYWJyaWMtZWRpdG9yXFxidWlsZFxccGx1Z2lucy50c1xyXG4gKi9cclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnLi9nZXRFbnYnXHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcbmltcG9ydCB7IGlzRGV2IH0gZnJvbSAnLi9nZXRFbnYnXHJcbi8qKlxyXG4gKiBcdTUyMUJcdTVFRkEgdml0ZSBcdTYzRDJcdTRFRjZcclxuICogQHBhcmFtIHZpdGVFbnZcclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVWaXRlUGx1Z2lucyA9IChcclxuICBtb2RlOiBzdHJpbmcsXHJcbiAgdml0ZUVudjogYW55XHJcbik6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9PiB7XHJcbiAgY29uc3QgX2lzUHJvZCA9IGlzUHJvZChtb2RlKVxyXG4gIGNvbnN0IHsgQVBQX1RJVExFIH0gPSB2aXRlRW52XHJcblxyXG4gIHJldHVybiBbXHJcbiAgICBWdWUoe1xyXG4gICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczogeyBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IHRhZy5zdGFydHNXaXRoKCd3Yy0nKSB9XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgVW5vQ1NTKCksXHJcbiAgICAvLyB2dWUgXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IGpzeC90c3ggXHU4QkVEXHU2Q0Q1XHJcbiAgICBWdWVKc3goKSxcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIGltcG9ydHM6IFsndnVlJ10sXHJcbiAgICAgIGR0czogJy4vdHlwaW5ncy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sXHJcbiAgICAgIGR0czogJy4vdHlwaW5ncy9jb21wb25lbnRzLmQudHMnXHJcbiAgICB9KSxcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmdzJyldLFxyXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxyXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xyXG4gICAgfSksXHJcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgbWluaWZ5OiBfaXNQcm9kLFxyXG4gICAgICBpbmplY3Q6IHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogQVBQX1RJVExFXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgIHZlcmJvc2U6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NTcyOFx1NjNBN1x1NTIzNlx1NTNGMFx1OEY5M1x1NTFGQVx1NTM4Qlx1N0YyOVx1N0VEM1x1Njc5Q1xyXG4gICAgICBkaXNhYmxlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU3OTgxXHU3NTI4IGlzRGV2KG1vZGUpXHJcbiAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLCAvLyBcdTUzOEJcdTdGMjlcdTU0MEVcdTY2MkZcdTU0MjZcdTUyMjBcdTk2NjRcdTZFOTBcdTY1ODdcdTRFRjZcclxuICAgICAgdGhyZXNob2xkOiA1MTIwLCAvLyBcdTRGNTNcdTc5RUZcdTU5MjdcdTRFOEUgdGhyZXNob2xkIFx1NjI0RFx1NEYxQVx1ODhBQlx1NTM4Qlx1N0YyOSxcdTUzNTVcdTRGNEQgYlxyXG4gICAgICBhbGdvcml0aG06ICdnemlwJywgLy8gXHU1MzhCXHU3RjI5XHU3Qjk3XHU2Q0Q1LFx1NTNFRlx1OTAwOSBbICdnemlwJyAsICdicm90bGlDb21wcmVzcycgLCdkZWZsYXRlJyAsICdkZWZsYXRlUmF3J11cclxuICAgICAgZXh0OiAnLmd6JyAvLyBcdTc1MUZcdTYyMTBcdTc2ODRcdTUzOEJcdTdGMjlcdTUzMDVcdTU0MEVcdTdGMDBcclxuICAgIH0pXHJcbiAgXVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFTQSxPQUFPLGtCQUFrQjtBQUN6QixTQUFTLFdBQUFBLGdCQUFlO0FBRXhCLFNBQVMsb0JBQW9COzs7QUNKN0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sUUFBUTtBQU9SLFNBQVMsT0FBTyxNQUF1QjtBQUM1QyxTQUFPLFNBQVM7QUFDbEI7QUFHTyxTQUFTLFdBQVcsU0FBOEI7QUFDdkQsUUFBTSxNQUFXLENBQUM7QUFFbEIsYUFBVyxXQUFXLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFDMUMsUUFBSSxXQUFXLFFBQVEsT0FBTyxFQUFFLFFBQVEsUUFBUSxJQUFJO0FBQ3BELGVBQ0UsYUFBYSxTQUFTLE9BQU8sYUFBYSxVQUFVLFFBQVE7QUFDOUQsUUFBSSxZQUFZLFlBQWEsWUFBVyxPQUFPLFFBQVE7QUFDdkQsUUFBSSxZQUFZLGNBQWM7QUFDNUIsVUFBSTtBQUNGLG1CQUFXLEtBQUssTUFBTSxRQUFRO0FBQUEsTUFDaEMsU0FBUyxPQUFPO0FBQUEsTUFBQztBQUFBLElBQ25CO0FBQ0EsUUFB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QUFNLE9BQU87QUFBQSxJQUN4QyxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxhQUFhO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsZUFBZSxFQUFFO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUyxDQUFDLFlBQVk7QUFBQSxNQUN4QjtBQUFBLE1BQ0EscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osbUJBQW1CO0FBQUEsVUFDbkIsZ0JBQWdCLFlBQVlDLFNBQVEsa0NBQVcsMEJBQTBCLENBQUM7QUFBQSxRQUM1RTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0EsY0FBYyxFQUFFLFNBQVMsUUFBUTtBQUFBLElBQ2pDLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUtBLFNBQVEsa0NBQVcsS0FBSztBQUFBLFFBQzdCLFlBQVk7QUFBQSxNQUNkO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVFBLFNBQVEsa0NBQVcsTUFBTTtBQUFBLE1BQ2pDLFdBQVc7QUFBQSxNQUNYLG1CQUFtQjtBQUFBLE1BQ25CLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQTtBQUFBLFVBRVIsY0FBYztBQUFBLFVBQ2QsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsUUFDYixPQUFPQSxTQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAiZW52UGF0aCIsICJlbnYiLCAicmVzb2x2ZSJdCn0K
