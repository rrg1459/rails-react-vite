// src/__tests__/main.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx'; // Importamos el App original para validar su renderizado

// Creamos una función mockeada para el método .render() que podemos inspeccionar
const rootRenderMock = vi.fn();

// Creamos un mock del objeto devuelto por createRoot
const rootMock = {
  render: rootRenderMock,
  unmount: vi.fn(),
};

// Creamos una función mockeada para createRoot que podemos inspeccionar
const createRootMock = vi.fn(() => rootMock);

// --- SOLUCIÓN ACTUALIZADA PARA EL ERROR 'default.createRoot is not a function' ---
// Mockeamos el módulo completo de 'react-dom/client' de forma que su
// exportación por defecto sea un objeto que contiene la función createRoot.
// Esto coincide con la forma en que se importa en main.jsx.
vi.mock('react-dom/client', () => {
  return {
    default: { createRoot: createRootMock },
    // Para mayor robustez, también exportamos createRoot como un named export
    // en caso de que otros archivos lo usen de forma diferente.
    createRoot: createRootMock,
  };
});
// ---------------------------------------------------------------------------------

// Mockear el store de Redux para que la prueba sea más rápida y aislada
const mockStore = {
  getState: () => ({}),
  dispatch: vi.fn(),
  subscribe: vi.fn(),
};

vi.mock('../redux/store', () => ({
  default: mockStore,
}));

// Mockear i18n para evitar errores si intenta inicializarse
vi.mock('../src/i18n', () => ({
  default: vi.fn(),
}));

// ---
// Solución al problema "Target container is not a DOM element".
// Se ejecuta antes de cada prueba.
beforeEach(() => {
  // Creamos un elemento div con el id "root" y lo añadimos al body del documento simulado.
  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
});

// Se ejecuta después de cada prueba para limpiar el DOM simulado.
afterEach(() => {
  // Eliminamos el elemento "root" para evitar efectos secundarios en otras pruebas.
  const rootElement = document.getElementById('root');
  if (rootElement) {
    document.body.removeChild(rootElement);
  }
});
// ---

describe('main.jsx', () => {
  it('should render the App component wrapped in Provider and BrowserRouter', async () => {
    // Importamos dinámicamente main.jsx para ejecutar su lógica.
    // Esto debería ahora invocar a createRootMock.
    await import('../src/main.jsx');

    // Verificamos que 'createRoot' fue llamado con el elemento 'root' del DOM
    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById('root')
    );

    // Verificamos que la función 'render' de nuestro mock fue llamada
    expect(rootRenderMock).toHaveBeenCalledTimes(1);

    // Ahora inspeccionamos los argumentos pasados a 'render'.
    const renderCallArgument = rootRenderMock.mock.calls[0][0];

    // Buscamos si el componente Provider está en el árbol de renderizado
    expect(renderCallArgument.type).toBe(Provider);

    // Verificamos que el componente BrowserRouter está dentro del Provider
    const providerChildren = renderCallArgument.props.children;
    expect(providerChildren.type).toBe(BrowserRouter);

    // Finalmente, verificamos que el componente App está dentro de BrowserRouter.
    const routerChildren = providerChildren.props.children;
    expect(routerChildren.type).toBe(App);
  });
});
