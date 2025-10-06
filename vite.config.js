import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "192.168.1.10",
    proxy: {
      // Proxy tất cả các yêu cầu bắt đầu bằng /api
      '/img': {
        target: 'http://localhost:4000/upload/', // Địa chỉ server backend
        // target: 'http://192.168.1.10:4000/upload/', // Địa chỉ server backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, ''), // bỏ qua /api khi gửi request tới server backend
      },
    },
  },
})

