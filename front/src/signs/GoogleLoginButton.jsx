import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setAuthHeaders } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../system/Config";

// const GOOGLE_CLIENT_ID = "924820704132-9vsns4b026dvmj9lt83tomk3l040iq4p.apps.googleusercontent.com";

export default function GoogleLoginButton() {

  const authHeaders = useSelector((state) => state.auth.authHeaders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const id_token = credentialResponse.credential; // JWT que genera Google
    try {
      const response = await axios.post("http://localhost:3000/google_oauth2_token", {
        id_token
      });
      if (response.status === 200) {
        const token = await response.data.token;
        const newAuthHeaders = {
          'access-token': token['access-token'],
          'client': token['client'],
          'uid': token['uid'],
          'expiry': token['expiry'],
        };
        dispatch(setAuthHeaders(newAuthHeaders));
      } else {
        console.error("Error autenticando el token en backend");
      }
    } catch (error) {
      console.log('GoogleLoginButton ERROR-->: ', error);
    }
  };

  const handleLoginFailure = () => {
    console.log("Fallo login Google");
  };

  if (authHeaders) {
    navigate('/login');
  }

  return (
    <GoogleOAuthProvider clientId={config.KEY_GOOGLE_LOGIN}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
}
