import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SignUpForm from '../signs/SignUpForm';
import SignInForm from '../signs/SignInForm';
import GoogleLoginButton from '../signs/GoogleLoginButton';

function AuthSection({ onSignUp, onSignIn }) {

  const { t } = useTranslation();

  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    onSignIn({ email, password }).then((result) => {
      if (result?.success) {
        setEmail('');
        setPassword('');
      }
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password, passwordConfirmation }).then((result) => {
      if (result?.success) {
        setShowSignUp(false);
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
      }
    });
  };

  return (
    <div className="space-y-6">
      {!showSignUp ? (
        <>
          <SignInForm
            email={email}
            password={password}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            onSubmit={handleSignInSubmit}
          />
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-200 text-blue-600 rounded-md hover:bg-blue-300"
            onClick={() => {
              setShowSignUp(true);
              setEmail('');
              setPassword('');
              setPasswordConfirmation('');
            }}
          >
            {t('register_sign_up')}
          </button>
        </>
      ) : (
        <>
          <SignUpForm
            email={email}
            password={password}
            passwordConfirmation={passwordConfirmation}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            onChangePasswordConfirmation={(e) => setPasswordConfirmation(e.target.value)}
            onSubmit={handleSignUpSubmit}
          />
          <button
            type="button"
            className="w-full px-4 py-2 bg-green-200 text-green-600 rounded-md hover:bg-green-300"
            onClick={() => {
              setShowSignUp(false);
              setEmail('');
              setPassword('');
              setPasswordConfirmation('');
            }}
          >
            {t('register_sign_in')}
          </button>
        </>
      )}
      <GoogleLoginButton />
    </div>
  );
}

export default AuthSection;