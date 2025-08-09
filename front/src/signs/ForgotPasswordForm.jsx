// components/ForgotPasswordForm.jsx
import { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import { config } from '../system/Config';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [api_base_url] = useState(config.URL_API);
  const [app_name] = useState(config.APP_NAME);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${api_base_url}/auth/password`, {
        email: email,
        redirect_url: 'http://localhost:5173/reset-password' // La URL específica de tu frontend para el restablecimiento
      });
      setMessage(response.data.message || 'Instrucciones de restablecimiento enviadas a tu correo electrónico.');
      setEmail(''); // Limpiar el campo
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Error al solicitar restablecimiento:', err.response || err);
      setError(err.response?.data?.errors?.[0] || 'Ocurrió un error. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">{app_name}</h1>

      <Message message={message} error={error}/>

      <div className="border p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">¿Olvidaste tu Contraseña?</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="forgotpassword-email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Enviar Instrucciones</button>

          </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;