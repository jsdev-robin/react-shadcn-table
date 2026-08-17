// import babel from '@rolldown/plugin-babel';
// import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // babel({ presets: [reactCompilerPreset()] }),
    // tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'react-shadcn-table',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@dnd-kit/core',
        '@dnd-kit/sortable',
        '@dnd-kit/modifiers',
        '@dnd-kit/utilities',
        '@tanstack/react-hotkeys',
        '@tanstack/react-pacer',
        '@tanstack/react-store',
        '@tanstack/react-table',
        'jspdf',
        'jspdf-autotable',
        'xlsx',
        'radix-ui',
        'lucide-react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
