import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

let argv = process.argv;
if (argv) {
  const length = argv.length;
  if (!process.env.VITE_VUE_APP_APPKEY) {
    process.env.VITE_VUE_APP_APPKEY = argv[length-1]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
})
