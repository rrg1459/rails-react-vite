# React + Vite

# front

## 📄 Descripción

Este es el repositorio del lado del cliente de la aplicación, construido con **React** y **Vite**. Está diseñado como una Single Page Application (SPA) que interactúa con un backend (API) para proporcionar una experiencia de usuario dinámica. Incorpora manejo de estado con **Redux**, enrutamiento con **React Router Dom**, y estilos con **Tailwind CSS**. También incluye funcionalidades de autenticación de Google y reCAPTCHA.

---

## 🚀 Tecnologías Clave

* **Framework:** React (v18.3.1)
* **Gestión de Estado:** Redux Toolkit
* **Construcción/Desarrollo:** Vite (v7.0.4)
* **Estilos:** Tailwind CSS
* **Internacionalización:** i18next
* **Peticiones HTTP:** Axios
* **Autenticación:** Integración con Google OAuth y reCAPTCHA

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado **Node.js** (versión LTS recomendada) y un gestor de paquetes como **npm** (que viene con Node.js) o **Yarn** en tu máquina.

---

## 📦 Instalación

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1.  **Instala las dependencias:**

    ```bash
    yarn install
    ```

2.  **Configura las variables de entorno:**

    Crea un archivo `.env` en la raíz del proyecto y añade las configuraciones necesarias, por ejemplo:

    ```bash
    VITE_GOOGLE_CLIENT_ID="123"
    VITE_API_URL="http://localhost:3000/api/v1"
    VITE_APP_NAME="React Rails Auth App"
    VITE_SITE_KEY_CAPTCHA="123"

    ```

---

## ⚙️ Scripts Disponibles

Este proyecto viene con varios scripts útiles para el desarrollo, construcción y pruebas:

* `yarn validate-locales`:
    * Ejecuta un script personalizado (`validate-locales.js`) para verificar la consistencia y validez de los archivos de localización (idiomas). Es crucial para asegurar que todas las traducciones estén correctas y completas.
* `yarn dev`:
    * Inicia el servidor de desarrollo de Vite. Esto compila y sirve la aplicación en modo desarrollo con recarga en caliente (Hot Module Replacement - HMR), lo que te permite ver los cambios al instante mientras codificas. La aplicación generalmente estará disponible en `http://localhost:5173`.
* `yarn build`:
    * Compila la aplicación para producción. Este comando optimiza y empaqueta todo el código y los activos en una carpeta `dist/` lista para ser desplegada en un servidor.
* `yarn lint`:
    * Ejecuta ESLint para analizar el código en busca de posibles errores, malas prácticas y problemas de estilo. Ayuda a mantener la calidad y consistencia del código.
* `yarn preview`:
    * Sirve la versión de producción (`dist/` folder) localmente. Útil para probar cómo se comportará la aplicación una vez construida para producción.
* `yarn test`:
    * Ejecuta las pruebas unitarias y de integración utilizando **Vitest**. Este es el modo de "watch", lo que significa que las pruebas se volverán a ejecutar automáticamente cuando detecten cambios en los archivos.

    ```bash
    ✓ tests/components/AuthSection.test.jsx (4 tests) 296ms
    ✓ tests/main.test.jsx (1 test) 275ms
    ✓ tests/components/Message.test.jsx (3 tests) 140ms
    ✓ tests/components/UserList.test.jsx (2 tests) 166ms
    ✓ tests/components/SessionSection.test.jsx (2 tests) 57ms
    ✓ tests/App.test.jsx (5 tests) 69ms
    ✓ tests/i18n.test.js (1 test) 12ms

    Test Files  7 passed (7)
          Tests  18 passed (18)
      Start at  11:20:27
      Duration  6.38s (transform 630ms, setup 906ms, collect 2.11s, tests 1.02s, environment 4.85s, prepare 1.53s)

    PASS  Waiting for file changes...
    ```

* `yarn coverage`:
    * Ejecuta las pruebas y genera un reporte de **cobertura de código**. Esto te muestra qué porcentaje de tu código está cubierto por las pruebas, ayudando a identificar áreas con falta de testing.

  ```
  % Coverage report from v8
  ```

  File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
  -------------------------|---------|----------|---------|---------|-------------------
  All files                |   35.39 |      100 |   46.42 |   35.39 |                   
  src                     |     100 |      100 |     100 |     100 |                   
    App.jsx                |     100 |      100 |     100 |     100 |                   
    i18n.js                |     100 |      100 |     100 |     100 |                   
    main.jsx               |     100 |      100 |     100 |     100 |                   
  src/components          |   96.26 |      100 |    92.3 |   96.26 |                   
    AuthSection.jsx        |   93.75 |      100 |      90 |   93.75 | 77-81             
    Message.jsx            |     100 |      100 |     100 |     100 |                   
    SessionSection.jsx     |     100 |      100 |     100 |     100 |                   
    UserList.jsx           |     100 |      100 |     100 |     100 |                   
  src/constants           |     100 |      100 |     100 |     100 |                   
    storageKeys.js         |     100 |      100 |     100 |     100 |                   
  src/pages               |    7.69 |      100 |       0 |    7.69 |                   
    ConfirmEmailPage.jsx   |   16.66 |      100 |       0 |   16.66 | 6-35              
    HomePage.jsx           |    6.37 |      100 |       0 |    6.37 | 14-222            
  src/redux               |    91.3 |      100 |       0 |    91.3 |                   
    authSlice.js           |   88.88 |      100 |       0 |   88.88 | 12,15             
    store.js               |     100 |      100 |     100 |     100 |                   
    usersSlice.js          |   88.88 |      100 |       0 |   88.88 | 12,15             
  src/signs               |   10.19 |      100 |       0 |   10.19 |                   
    ForgotPasswordForm.jsx |    13.2 |      100 |       0 |    13.2 | 9-63              
    GoogleLoginButton.jsx  |   14.89 |      100 |       0 |   14.89 | 11-56             
    ResetPasswordForm.jsx  |    6.73 |      100 |       0 |    6.73 | 9-126             
    SessionActions.jsx     |   22.22 |      100 |       0 |   22.22 | 2-8               
    SignInForm.jsx         |   13.04 |      100 |       0 |   13.04 | 7-53              
    SignUpForm.jsx         |    4.44 |      100 |       0 |    4.44 | 3-49              
  src/system              |     100 |      100 |     100 |     100 |                   
    Config.js              |     100 |      100 |     100 |     100 |                   
  src/utils               |      25 |      100 |       0 |      25 |                   
    storage.js             |      25 |      100 |       0 |      25 | 3-9,12-19         

  Done in 7.41s.


---

## 🤝 Dependencias Detalladas

Aquí se explica el propósito de las principales dependencias utilizadas en este proyecto:

### **Núcleo de la Aplicación**

* `react`: La librería fundamental para construir la interfaz de usuario.
* `react-dom`: Proporciona los métodos específicos de la web para la interacción con el DOM de React.
* `react-router-dom`: Permite la navegación entre diferentes vistas o "páginas" dentro de tu aplicación de una sola página, sin recargar la página completa.
* `axios`: Un cliente HTTP basado en promesas que se utiliza para hacer solicitudes a la API de tu backend de forma sencilla y eficiente.
* `tailwindcss`: Un framework CSS "utility-first" que te permite construir rápidamente diseños complejos aplicando clases directamente en tu HTML/JSX.

### **Gestión de Estado**

* `@reduxjs/toolkit`: La forma recomendada de escribir lógica Redux. Simplifica enormemente la configuración y el boilerplate de Redux, facilitando la gestión del estado global de tu aplicación.
* `react-redux`: Los bindings oficiales de React para Redux, permitiendo que tus componentes de React se conecten al store de Redux y reaccionen a los cambios de estado.

### **Internacionalización (i18n)**

* `i18next`: El framework principal para la internacionalización de la aplicación, permitiendo que se soporte múltiples idiomas.
* `react-i18next`: La integración de `i18next` con React, facilitando la traducción de texto dentro de tus componentes.

### **Autenticación y Seguridad**

* `@react-oauth/google`: Un componente de React que facilita la implementación del inicio de sesión con Google (Google Sign-In) usando OAuth.
* `react-google-recaptcha`: Un componente de React para integrar Google reCAPTCHA, ayudando a proteger tu aplicación de spam y abusos automatizados.

---

## 🧪 Pruebas y Herramientas de Desarrollo

* **Vitest**: Un framework de pruebas rápido y ligero que se integra perfectamente con Vite.
* **@testing-library/react**: Conjunto de utilidades para probar componentes de React de una manera que se asemeja más a cómo los usuarios interactuarían con ellos.
* **ESLint**: La herramienta de linting para mantener un código JavaScript/JSX limpio y consistente.
* **Vite**: El bundler y servidor de desarrollo que ofrece una experiencia de desarrollo extremadamente rápida.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor, sigue las pautas de contribución y crea una pull request.