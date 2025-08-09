import { useTranslation } from 'react-i18next';

function SignUpForm({
  email,
  password,
  passwordConfirmation,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirmation,
  onSubmit,
}) {

  const { t } = useTranslation();

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder={t('email')}
        className="w-full px-4 py-2 border rounded-md"
        value={email}
        onChange={onChangeEmail}
        required
      />
      <input
        type="password"
        placeholder={t('password')}
        className="w-full px-4 py-2 border rounded-md"
        value={password}
        onChange={onChangePassword}
        required
      />
      <input
        type="password"
        placeholder={t('confirm_password')}
        className="w-full px-4 py-2 border rounded-md"
        value={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        {t('register')}
      </button>
    </form>
  );
}

export default SignUpForm;