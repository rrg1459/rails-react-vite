// src/App.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import App from '../src/App';
// Importa tu rootReducer. Asegúrate de que la ruta sea correcta.
// import rootReducer from '../redux/rootReducer';
import authSlice from '../src/redux/authSlice'; // Asegúrate de que esta ruta sea correcta


// Configura un store de Redux de prueba.
const testStore = configureStore({
  reducer: authSlice,
});

// Mockeamos los componentes de las páginas para que las pruebas sean rápidas y aisladas.
// Esto evita que Vitest tenga que renderizar y probar la lógica de cada componente
// y nos permite enfocarnos solo en si el enrutador funciona correctamente.
vi.mock('../src/pages/HomePage', () => ({ default: () => <div data-testid="home-page" /> }));
vi.mock('../src/pages/ConfirmEmailPage', () => ({ default: () => <div data-testid="confirm-email-page" /> }));
vi.mock('../src/signs/ForgotPasswordForm', () => ({ default: () => <div data-testid="forgot-password-form" /> }));
vi.mock('../src/signs/ResetPasswordForm', () => ({ default: () => <div data-testid="reset-password-form" /> }));

// Helper para renderizar los componentes con todos los 'providers' necesarios.
// Esto evita duplicar código en cada prueba.
const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('App Routing', () => {

  it('renders HomePage for the "/" path', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders HomePage for the "/login" path', () => {
    renderWithProviders(<App />, { route: '/login' });
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders ConfirmEmailPage for the "/confirm-email" path', () => {
    renderWithProviders(<App />, { route: '/confirm-email' });
    expect(screen.getByTestId('confirm-email-page')).toBeInTheDocument();
  });

  it('renders ForgotPasswordForm for the "/forgot-password" path', () => {
    renderWithProviders(<App />, { route: '/forgot-password' });
    expect(screen.getByTestId('forgot-password-form')).toBeInTheDocument();
  });

  it('renders ResetPasswordForm for the "/reset-password" path', () => {
    renderWithProviders(<App />, { route: '/reset-password' });
    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
  });
});