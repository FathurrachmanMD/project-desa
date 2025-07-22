import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        rollupOptions: {
            external: (id) => {
                // Exclude problematic modules from bundling
                return id.includes('react-remove-scroll-bar') || 
                       id.includes('react-remove-scroll/dist/es2015/UI');
            },
            output: {
                globals: {
                    'react-remove-scroll-bar': 'ReactRemoveScrollBar',
                    'react-remove-scroll-bar/constants': 'ReactRemoveScrollBarConstants'
                }
            }
        },
    },
    optimizeDeps: {
        exclude: ['react-remove-scroll-bar', 'react-remove-scroll-bar/constants'],
    },
    ssr: {
        noExternal: ['framer-motion', '@radix-ui/react-dialog'],
    },
});
