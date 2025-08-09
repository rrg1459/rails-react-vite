import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Configura el entorno de pruebas
    setupFiles: ['./src/setupTests.js'], // Archivo de configuración global
    globals: true, // Habilita las APIs globales de Vitest sin importar
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8', // o 'istanbul'
      // Aquí viene la clave: le dices a vitest dónde buscar los archivos de código
      // para los que quieres generar un reporte de cobertura.
      // Esto asegurará que los archivos sin pruebas también se incluyan en el reporte.
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      thresholds: {
        // Fallar si la cobertura total de cualquier archivo cae por debajo de 80%
        // Si tienes la cobertura co-localizada no haría falta
        // pero con un enfoque 2 es muy útil.
        'src/components/**/*.jsx': {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
        // También puedes establecer un umbral global
        // global: {
        //   statements: 80,
        //   branches: 80,
        //   functions: 80,
        //   lines: 80,
        // }
      }
    }
  }
})
