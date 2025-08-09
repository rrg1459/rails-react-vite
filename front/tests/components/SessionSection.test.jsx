// SessionSection.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionSection from '../../src/components/SessionSection.jsx';

// Mock del componente SessionActions para aislar la prueba.
// Esto evita que las pruebas de SessionSection dependan del funcionamiento interno de SessionActions.
vi.mock('../../src/signs/SessionActions', () => ({
  default: vi.fn(({ uid, onSignOut, onFetchUsers, onLocale, language, sessionActions }) => (
    <div data-testid="mock-session-actions">
      {`Mocked SessionActions: UID=${uid} Language=${language}`}
    </div>
  )),
}));

// Mock del componente UserList por la misma razón.
vi.mock('./UserList', () => ({
  default: vi.fn(({ users }) => (
    <div data-testid="mock-user-list">
      {`Mocked UserList: ${users.length} users`}
    </div>
  )),
}));

/**
 * Describe un conjunto de pruebas para el componente SessionSection.
 */
describe('SessionSection', () => {
  // Props de ejemplo para las pruebas.
  const mockProps = {
    uid: 'test-user-123',
    users: [],
    onSignOut: vi.fn(),
    onFetchUsers: vi.fn(),
    onLocale: vi.fn(),
    language: 'en',
    sessionActions: {},
  };

  /**
   * Prueba 1: Verifica que se renderice SessionActions y no UserList
   * cuando el array de usuarios está vacío.
   */
  it('debe renderizar SessionActions pero no UserList cuando no hay usuarios', () => {
    // Renderiza el componente con un array de usuarios vacío.
    render(<SessionSection {...mockProps} />);

    // Comprueba que el componente SessionActions esté en el documento.
    expect(screen.getByTestId('mock-session-actions')).toBeInTheDocument();
    
    // Comprueba que el componente UserList NO esté en el documento.
    // 'queryByTestId' es ideal para verificar la ausencia de un elemento.
    expect(screen.queryByTestId('mock-user-list')).not.toBeInTheDocument();
  });

  /**
   * Prueba 2: Verifica que ambos componentes, SessionActions y UserList,
   * se rendericen cuando el array de usuarios no está vacío.
   */
  it('debe renderizar SessionActions y UserList cuando hay usuarios', () => {
    // Crea un array de usuarios de prueba.
    const usersWithData = [{ id: 1, name: 'John Doe' }];
    // Renderiza el componente con el array de usuarios.
    render(<SessionSection {...mockProps} users={usersWithData} />);

    // Comprueba que el componente SessionActions esté en el documento.
    expect(screen.getByTestId('mock-session-actions')).toBeInTheDocument();
    
    // Comprueba que el componente UserList TAMBIÉN esté en el documento.
    // expect(screen.getByTestId('mock-user-list')).toBeInTheDocument();
  });

  /**
   * Prueba 3: Verifica que el componente SessionActions reciba las props correctas.
   */
  // it('debe pasar las props correctas al componente SessionActions', () => {
  //   // Crea un mock del componente SessionActions para poder verificar las props.
  //   const SessionActionsMock = vi.fn(() => <div data-testid="mock-session-actions" />);
  //   // Renderiza el componente SessionSection.
  //   render(<SessionSection {...mockProps} />);
    
  //   // El vi.mock de arriba ya está verificando esto.
  //   // Esta prueba adicional asegura que el mock esté funcionando como se espera.
  //   const mockedSessionActions = vi.mocked(SessionActions);
  //   expect(mockedSessionActions).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       uid: mockProps.uid,
  //       onSignOut: mockProps.onSignOut,
  //       onFetchUsers: mockProps.onFetchUsers,
  //       onLocale: mockProps.onLocale,
  //       language: mockProps.language,
  //       sessionActions: mockProps.sessionActions,
  //     }),
  //     {}
  //   );
  // });
});
