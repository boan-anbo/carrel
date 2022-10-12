import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // For all styled components:
    // create classnames from fileName and displayName in development
    react(),
  ]
})
