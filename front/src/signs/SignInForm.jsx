import { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { config } from "../system/Config";

function SignInForm({ email, password, onChangeEmail, onChangePassword, onSubmit }) {

  const { t } = useTranslation();

  const [captchaValue, setCaptchaValue] = useState(null); // Estado para el valor del CAPTCHA
  const [site_key_captcha] = useState(config.SITE_KEY_CAPTCHA);

  const onChange = (value) => {
    setCaptchaValue(value);
  };

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
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${captchaValue === null && "opacity-50 cursor-not-allowed"}`}
        disabled={captchaValue === null}
      >
        {t('sign_in')}
      </button>
      {/* TODO: agregar lógica para el backend */}
      <div className='flex justify-center'>
        <ReCAPTCHA
          sitekey={site_key_captcha}
          onChange={onChange}
        />
      </div>
      <p><Link to="/forgot-password">{t('forgot_password')}</Link></p>
    </form>
  );
}

export default SignInForm;