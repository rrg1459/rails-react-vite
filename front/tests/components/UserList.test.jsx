// UserList.test.jsx
// UserList.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserList from '../../src/components/UserList.jsx';

// Mock del módulo 'react-i18next'
// Esto evita que las pruebas fallen porque no haya un proveedor de traducciones real.
// La función 't' simplemente devolverá la clave que se le pasa.
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

/**
 * Describe un conjunto de pruebas para el componente UserList.
 */
describe('UserList', () => {

  // Datos de usuarios de ejemplo para las pruebas.
  const mockUsers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      img: 'https://placehold.co/100x100'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      img: null
    },
  ];

  /**
   * Prueba 1: Verifica que el encabezado de la lista se renderice correctamente.
   */
  it('debe renderizar el encabezado de la lista', () => {
    // Renderiza el componente con los datos de ejemplo.
    render(<UserList users={mockUsers} />);

    // Busca el encabezado. Gracias al mock, el texto será la clave 'users_list'.
    const heading = screen.getByRole('heading', { name: 'users_list' });
    expect(heading).toBeInTheDocument();
  });

  /**
   * Prueba 2: Verifica que la lista renderice la cantidad correcta de usuarios.
   */
  it('debe renderizar la cantidad correcta de usuarios', () => {
    render(<UserList users={mockUsers} />);

    // Busca todos los elementos de la lista por el rol 'listitem' (etiqueta <li>).
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(mockUsers.length);
  });

});
