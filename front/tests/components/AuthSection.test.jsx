// src/components/AuthSection.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthSection from '../../src/components/AuthSection.jsx';

// --- Mocks de componentes y hooks ---

// Mock del hook useTranslation para aislar la prueba de traducciones reales.
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// Mocks de los componentes reales.
// Las fábricas de mock ahora se definen directamente en la llamada a vi.mock
vi.mock('../../src/signs/SignUpForm', () => {
  const MockSignUpForm = vi.fn(({ email, password, passwordConfirmation, onChangeEmail, onChangePassword, onChangePasswordConfirmation, onSubmit }) => (
    <form onSubmit={onSubmit} data-testid="mock-signup-form">
      <input data-testid="signup-email" value={email} onChange={onChangeEmail} />
      <input data-testid="signup-password" value={password} onChange={onChangePassword} />
      <input data-testid="signup-password-confirmation" value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
      <button type="submit" data-testid="signup-submit-button"></button>
    </form>
  ));
  return { default: MockSignUpForm };
});

vi.mock('../../src/signs/SignInForm', () => {
  const MockSignInForm = vi.fn(({ email, password, onChangeEmail, onChangePassword, onSubmit }) => (
    <form onSubmit={onSubmit} data-testid="mock-signin-form">
      <input data-testid="signin-email" value={email} onChange={onChangeEmail} />
      <input data-testid="signin-password" value={password} onChange={onChangePassword} />
      <button type="submit" data-testid="signin-submit-button"></button>
    </form>
  ));
  return { default: MockSignInForm };
});

vi.mock('../../src/signs/GoogleLoginButton', () => {
  const MockGoogleLoginButton = vi.fn(() => (
    <button data-testid="mock-google-login">Mocked Google Login</button>
  ));
  return { default: MockGoogleLoginButton };
});

/**
 * Describe el conjunto de pruebas para el componente AuthSection.
 */
describe('AuthSection', () => {

  // Props de ejemplo para las pruebas. Usamos vi.fn() para poder espiar las llamadas.
  const mockOnSignUp = vi.fn(() => Promise.resolve({ success: true }));
  const mockOnSignIn = vi.fn(() => Promise.resolve({ success: true }));
  const mockProps = {
    onSignUp: mockOnSignUp,
    onSignIn: mockOnSignIn,
  };

  /**
   * Prueba 1: Verifica el estado inicial del componente.
   * Debe mostrar el formulario de inicio de sesión por defecto.
   */
  it('debe renderizar el formulario de inicio de sesión inicialmente', () => {
    render(<AuthSection {...mockProps} />);
    // El formulario de inicio de sesión debe estar en el documento.
    expect(screen.getByTestId('mock-signin-form')).toBeInTheDocument();
    // El formulario de registro no debe estar.
    expect(screen.queryByTestId('mock-signup-form')).not.toBeInTheDocument();
    // El botón para ir a registro debe estar.
    expect(screen.getByRole('button', { name: 'register_sign_up' })).toBeInTheDocument();
    // El botón de Google debe estar siempre presente.
    expect(screen.getByTestId('mock-google-login')).toBeInTheDocument();
  });

  /**
   * Prueba 2: Verifica la funcionalidad del botón de cambio de formulario.
   * Al hacer clic en el botón de registro, el componente debe mostrar el formulario de registro.
   */
  it('debe cambiar al formulario de registro al hacer clic en el botón de registro', () => {
    render(<AuthSection {...mockProps} />);
    
    // Simula un clic en el botón de "register_sign_up".
    fireEvent.click(screen.getByRole('button', { name: 'register_sign_up' }));
    
    // Ahora, el formulario de registro debe estar visible.
    expect(screen.getByTestId('mock-signup-form')).toBeInTheDocument();
    // El formulario de inicio de sesión ya no debe estar.
    expect(screen.queryByTestId('mock-signin-form')).not.toBeInTheDocument();
    // El botón de Google debe seguir presente.
    expect(screen.getByTestId('mock-google-login')).toBeInTheDocument();
    // El botón para volver a inicio de sesión debe aparecer.
    expect(screen.getByRole('button', { name: 'register_sign_in' })).toBeInTheDocument();
  });

  /**
   * Prueba 3: Verifica la funcionalidad de envío del formulario de inicio de sesión.
   */
  it('debe llamar a onSignIn y limpiar el estado al enviar el formulario de inicio de sesión', async () => {
    render(<AuthSection {...mockProps} />);

    // Simula la entrada de datos en los campos.
    fireEvent.change(screen.getByTestId('signin-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('signin-password'), { target: { value: 'password123' } });
    
    // Simula el envío del formulario.
    fireEvent.submit(screen.getByTestId('mock-signin-form'));
    
    // Verifica que la función onSignIn haya sido llamada con los datos correctos.
    expect(mockOnSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  /**
   * Prueba 4: Verifica la funcionalidad de envío del formulario de registro.
   */
  it('debe llamar a onSignUp y limpiar el estado al enviar el formulario de registro', async () => {
    render(<AuthSection {...mockProps} />);
    
    // Primero, cambiamos al formulario de registro.
    fireEvent.click(screen.getByRole('button', { name: 'register_sign_up' }));
    
    // Simula la entrada de datos.
    fireEvent.change(screen.getByTestId('signup-email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByTestId('signup-password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByTestId('signup-password-confirmation'), { target: { value: 'newpassword123' } });

    // Simula el envío del formulario.
    fireEvent.submit(screen.getByTestId('mock-signup-form'));
    
    // Verifica que la función onSignUp haya sido llamada con los datos correctos.
    expect(mockOnSignUp).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      password: 'newpassword123',
      passwordConfirmation: 'newpassword123',
    });
  });
});
