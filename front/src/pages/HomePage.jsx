import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Message from '../components/Message';
import AuthSection from '../components/AuthSection';
import SessionSection from '../components/SessionSection';
import { setAuthHeaders, clearAuthHeaders } from '../redux/authSlice';
import { setUsers, clearUsers } from '../redux/usersSlice';
import { config } from '../system/Config';
import { Storage } from '../utils/storage';
import { KEY } from '../constants/storageKeys';

function HomePage() {
  const authHeaders = useSelector((state) => state.auth.authHeaders);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [message, setMessage] = useState('');
  const [api_base_url] = useState(config.URL_API);
  const [app_name] = useState(config.APP_NAME);
  const [language, setLanguage] = useState('');
  const [locale, setLocale] = useState('');
  const [sessionActions, setSessionActions] = useState({
    active_session: t('session_actions.active_session'),
    uid: t('session_actions.uid'),
    log_out: t('session_actions.log_out'),
    get_users: t('session_actions.get_users'),
  })

  useEffect(() => {
    const temp_locale = Storage.getItem(KEY.Locale);

    if (temp_locale === null || temp_locale === undefined) {
      Storage.setItem(KEY.Locale, 'en');
      setLocale('en');
      setLanguage('Cambiar a español');
    } else {
      setLocale(temp_locale);
      setLanguage(temp_locale === 'en' ? 'Cambiar a español' : 'Change to English');
    }
  }, [locale])

  useEffect(() => {
    if (authHeaders) {
      setMessage('Sesión restaurada. Intenta acceder a los usuarios.');
    }
  }, [authHeaders]);

  const fetchLocale = () => {
    if (locale === 'en') {
      i18n.changeLanguage('es');
      setLocale('es');
      setLanguage('Change to inglés');
      Storage.setItem(KEY.Locale, 'es');
    } else {
      i18n.changeLanguage('en');
      setLocale('en');
      setLanguage('Cambiar a español');
      Storage.setItem(KEY.Locale, 'en');
    }
    setSessionActions({
    active_session: t('session_actions.active_session'),
    uid: t('session_actions.uid'),
    log_out: t('session_actions.log_out'),
    get_users: t('session_actions.get_users'),
  });
  };

  // Helpers
  const saveAuthHeaders = (headers) => {
    const newAuthHeaders = {
      'access-token': headers['access-token'],
      'client': headers['client'],
      'uid': headers['uid'],
      'expiry': headers['expiry'],
    };
    dispatch(setAuthHeaders(newAuthHeaders));
  };

  const handleClearAuthHeaders = () => dispatch(clearAuthHeaders());
  const handleClearUsers = () => dispatch(clearUsers());

  // Auth Handlers
  const handleSignUp = async ({ email, password, passwordConfirmation }) => {
    setMessage('');
    if (password !== passwordConfirmation) {
      setMessage('Las contraseñas no coinciden.');
      return { success: false };
    }
    try {
      const response = await axios.post(`${api_base_url}/auth`, {
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      if (response.status === 200) {
        setMessage('Registro exitoso. Por favor confirme su correo.');
        return { success: true };
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setMessage(
          `Error de registro: ${
            error.response.data.errors.full_messages
              ? error.response.data.errors.full_messages.join(', ')
              : error.response.data.errors.join(', ')
          }`
        );
      } else {
        setMessage(`Error de red o desconocido: ${error.message}`);
      }
    }
    return { success: false };
  };

  const handleSignIn = async ({ email, password }) => {
    setMessage('');
    try {
      const response = await axios.post(`${api_base_url}/auth/sign_in`, {
        email,
        password,
      });
      if (response.status === 200) {
        saveAuthHeaders(response.headers);
        setMessage('Inicio de sesión exitoso.');
        return { success: true };
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setMessage(`Error de inicio de sesión: ${error.response.data.errors.join(', ')}`);
      } else {
        setMessage(`Error de red o desconocido: ${error.message}`);
      }
    }
    return { success: false };
  };

  const handleSignOut = async () => {
    setMessage('');
    if (!authHeaders) {
      setMessage('No hay sesión activa para cerrar.');
      return;
    }
    try {
      const response = await axios.delete(`${api_base_url}/auth/sign_out`, {
        headers: {
          'access-token': authHeaders['access-token'],
          'client': authHeaders['client'],
          'uid': authHeaders['uid'],
        },
      });
      if (response.status === 200) {
        handleClearAuthHeaders();
        handleClearUsers();
        setMessage('Sesión cerrada exitosamente.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setMessage(`Error al cerrar sesión: ${error.response.data.errors.join(', ')}`);
      } else {
        setMessage(`Error de red o desconocido: ${error.message}`);
      }
    }
  };

  // Users
  const fetchUsers = async () => {
    setMessage('');
    if (!authHeaders) {
      setMessage('Necesitas iniciar sesión para ver los usuarios.');
      return;
    }
    try {
      const response = await axios.get(`${api_base_url}/users/index`, {
        headers: {
          'access-token': authHeaders['access-token'],
          'client': authHeaders['client'],
          'uid': authHeaders['uid'],
        },
      });
      if (response.status === 200) {
        dispatch(setUsers(response.data));
        setMessage('Usuarios cargados exitosamente.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setMessage(`Error al cargar usuarios: ${error.response.data.errors.join(', ')}`);
        if (error.response.status === 401) {
          handleClearAuthHeaders();
          setMessage('Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.');
        }
      } else {
        setMessage(`Error de red o desconocido: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">{app_name}</h1>
      <Message message={message} />
      {!authHeaders ? (
        <AuthSection
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
          />
        ) : (
          <SessionSection
          uid={authHeaders.uid}
          users={users}
          onSignOut={handleSignOut}
          onFetchUsers={fetchUsers}
          onLocale={fetchLocale}
          language={language}
          sessionActions={sessionActions}
        />
      )}
    </div>
  );
}

export default HomePage;