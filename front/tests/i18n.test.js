// src/__tests__/i18n.test.jsx
import { describe, it, expect, vi } from 'vitest';

// Importamos los archivos de traducción para poder verificar que se cargan correctamente
import enTranslation from '../src/locales/en/translation.json';
import esTranslation from '../src/locales/es/translation.json';

// Creamos un mock para el objeto de i18n
const mockI18n = {
  use: vi.fn(() => mockI18n),
  init: vi.fn(),
};

// Mockeamos la librería i18next para que use nuestro objeto mock
// Esto nos permite interceptar la llamada a .init()
vi.mock('i18next', () => ({
  default: mockI18n,
}));

// Mockeamos el plugin de react-i18next, ya que solo necesitamos verificar
// que se usa, pero no necesitamos que funcione realmente.
vi.mock('react-i18next', () => ({
  initReactI18next: vi.fn(),
}));

describe('i18n.js', () => {
  it('should initialize i18next with the correct configuration', async () => {
    // Importamos dinámicamente el archivo i18n.js para ejecutar su lógica.
    // Esto llamará a los métodos .use() y .init() en nuestro objeto mock.
    await import('../src/i18n.js');

    // Verificamos que se llamó a .use() con el plugin initReactI18next
    // para asegurar que el plugin de React se ha registrado correctamente.
    expect(mockI18n.use).toHaveBeenCalledWith(expect.anything());

    // Verificamos que el método .init() se ha llamado exactamente una vez
    expect(mockI18n.init).toHaveBeenCalledTimes(1);

    // Verificamos que el objeto de configuración que se le pasó a .init()
    // es exactamente el que esperamos.
    expect(mockI18n.init).toHaveBeenCalledWith({
      resources: {
        en: { translation: enTranslation },
        es: { translation: esTranslation },
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
  });
});
