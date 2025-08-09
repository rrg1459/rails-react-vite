import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // Asumiendo React Router

const ConfirmEmailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Confirmando tu correo...');
  const [error, setError] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const confirmation = queryParams.get('account_confirmation_success');
    if (confirmation === 'true') {
      setMessage('¡Tu cuenta ha sido confirmada exitosamente! Ahora puedes iniciar sesión..');
      // Redirigir al usuario después de un breve retraso
    } else {
      setError('Confirmación de la cuenta fallida.');
      setMessage('');
    }
    const timeoutId = setTimeout(() => {
      navigate('/login'); // O a tu dashboard
    }, 2000); // Redirige después de 3 segundos

    return () => clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta
  }, [location, navigate, dispatch]);

  return (
    <div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConfirmEmailPage;