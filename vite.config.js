// vite.config.js
import React from 'react';
import ViteReact from '@vitejs/plugin-react-swc';

export default {
  plugins: [
    ViteReact(),
  ],
  css: {
    modules: true,
  },
};
