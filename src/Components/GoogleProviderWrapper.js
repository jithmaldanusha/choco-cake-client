// src/GoogleOAuthProvider.js
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// const clientId = '901945686765-8mf59femqu5gmc20ilf6fiiipn2nl4nf.apps.googleusercontent.com'; // Replace with your Google Client ID

const clientId ='376414240573-3f70qqee6c0o454onp8e6q3n4okonuv0.apps.googleusercontent.com';

const GoogleProviderWrapper = ({ children }) => (
  <GoogleOAuthProvider clientId={clientId}>
    {children}
  </GoogleOAuthProvider>
);

export default GoogleProviderWrapper;