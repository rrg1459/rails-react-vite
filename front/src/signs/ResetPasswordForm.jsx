// components/ResetPasswordForm.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Asegúrate de tener React Router
import axios from 'axios';
import Message from '../components/Message';
import { config } from '../system/Config';

const ResetPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uid, setUid] = useState('');
  const [client, setClient] = useState('');
  const [accessToken, setAccessToken] = useState(''); // Renombrado de 'token' para evitar confusión
  const [api_base_url] = useState(config.URL_API);
  const [app_name] = useState(config.APP_NAME);

  useEffect(() => {
    // Parsear los parámetros de la URL
    const params = new URLSearchParams(location.search);
    const receivedUid = params.get('uid');
    const receivedClient = params.get('client_id');
    const receivedAccessToken = params.get('token'); // El parámetro es 'token'

    setUid(receivedUid || ''); // Asegura que sea string vacío si no existe
    setClient(receivedClient || ''); // Asegura que sea string vacío si no existe
    setAccessToken(receivedAccessToken || ''); // Asegura que sea string vacío si no existe

    // Opcional: Validar aquí mismo para una respuesta más inmediata si es posible
    if (!receivedUid || !receivedClient || !receivedAccessToken) {
      setMessage('');
      setError('Enlace de restablecimiento de contraseña inválido....');
    } else if (uid && client && accessToken) {
      setError(null);
    }
  }, [location, accessToken, client, uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!uid || !client || !accessToken) {
      setError('Parámetros de restablecimiento de contraseña inválidos o faltantes.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.put(`${api_base_url}/auth/password`, {
        password: password,
        password_confirmation: passwordConfirmation,
        uid: uid,
        client: client,
        access_token: accessToken // Devise Token Auth espera 'access-token' en el header,
                                  // pero en el body de la petición PUT para password reset,
                                  // es 'access_token' para que se valide correctamente.
                                  // Aunque el nombre del parámetro en la URL es 'token'.
      }, {
        headers: {
          'uid': uid,
          'client': client,
          'access-token': accessToken // Headers para autenticar la petición PUT
        }
      });
      setMessage(response.data.message || 'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión.');
      setPassword('');
      setPasswordConfirmation('');
      // Opcional: Redirigir al usuario a la página de inicio de sesión
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error('Error al restablecer contraseña:', err.response || err);
      setError(err.response?.data?.errors?.[0] || 'Ocurrió un error al restablecer tu contraseña. El enlace podría ser inválido o haber expirado.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">{app_name}</h1>

      <Message message={message} error={error}/>

      <div className="border p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Restablecer Contraseña</h2>
          <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="forgotpassword-email" className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
            />
          </div>
          <div>
            <label htmlFor="forgotpassword-confirmation" className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña:</label>

            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
            />
          </div>
            <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Restablecer Contraseña</button>

          </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;