import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
const path = require('path')
const fs = require('fs')

function getComponentEntries(dir) {
  const absPath = path.resolve(__dirname, dir);
  let files = fs.readdirSync(absPath);
  const componentEntries = files.reduce((ret, item) => {
      const itemPath = path.join(absPath, item)
      const isDir = fs.statSync(itemPath).isDirectory();
      if (isDir) {
          ret[item] = path.join(itemPath, 'index.ts');
      } else {
          const [name] = item.split('.')
          ret[name] = path.join(absPath, 'index.ts');
      }
      return ret
  }, {})
  return componentEntries
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'unreal-ui-next',
          resolveStyle: (name) => {
            return `unreal-ui-next/lib/${name}/style.css`;
          },
        }
      ]
    })
  ],
  build: {
    lib: {
      entry: '',
      formats: ['es'],  // 必须，否则不是以default导出
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      input: {
        ...getComponentEntries('packages')
      },
      external: ['vue'],
      output: {
        entryFileNames: 'ur-[name]/index.js',
        assetFileNames: 'ur-[name]/style.css',
        chunkFileNames: 'utils/[name].js',
        globals: {
          vue: 'Vue'
        },
      },
    },
    cssCodeSplit: true,
    outDir: 'lib',
    assetsDir: '',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('./')
    }
  }
})
