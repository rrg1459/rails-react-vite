// Message.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Message from '../../src/components/Message.jsx';

/**
 * Describe un conjunto de pruebas para el componente Message.
 * Este componente es responsable de mostrar mensajes de éxito o error.
 */
describe('Message', () => {

  /**
   * Prueba 1: Verifica que no se renderice nada si no se pasan las props 'message' ni 'error'.
   */
  it('no debe renderizar nada cuando no se le pasan props', () => {
    // Renderiza el componente sin ninguna prop.
    render(<Message />);
    // Comprueba que no se encuentre ningún elemento con el rol 'status' o 'alert'.
    // El método 'queryBy' devuelve null si no se encuentra el elemento,
    // por lo que es ideal para verificar la ausencia de elementos.
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  /**
   * Prueba 2: Verifica que el mensaje de éxito se renderice correctamente.
   */
  it('debe renderizar el mensaje de éxito cuando se pasa la prop "message"', () => {
    const successMessage = '¡Operación completada con éxito!';
    // Renderiza el componente con la prop 'message'.
    render(<Message message={successMessage} />);
    
    // Busca el elemento que contiene el texto del mensaje de éxito.
    const messageElement = screen.getByText(successMessage);
    
    // Afirma que el elemento está en el documento.
    expect(messageElement).toBeInTheDocument();
    // Afirma que el elemento tiene el color verde (o la clase de Tailwind correspondiente).
    expect(messageElement).toHaveStyle('color: rgb(0, 128, 0)');
    // Afirma que el mensaje de error no se renderiza.
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  /**
   * Prueba 3: Verifica que el mensaje de error se renderice correctamente.
   */
  it('debe renderizar el mensaje de error cuando se pasa la prop "error"', () => {
    const errorMessage = 'Ocurrió un error en la solicitud.';
    // Renderiza el componente con la prop 'error'.
    render(<Message error={errorMessage} />);
    
    // Busca el elemento que contiene el texto del mensaje de error.
    const errorElement = screen.getByText(errorMessage);
    
    // Afirma que el elemento está en el documento.
    expect(errorElement).toBeInTheDocument();
    // Afirma que el elemento tiene el color rojo.
    expect(errorElement).toHaveStyle('color: rgb(255, 0, 0)');
    // Afirma que el mensaje de éxito no se renderiza.
    expect(screen.queryByText(/éxito/i)).not.toBeInTheDocument();
  });

});
