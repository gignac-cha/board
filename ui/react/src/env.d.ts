interface ImportMetaEnv {
  VITE_READ_SERVER_URL: string;
  VITE_WRITE_SERVER_URL: string;

  VITE_OAUTH2_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
