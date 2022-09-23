export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: number;
      PORT: string;
      ACCESS_TOKEN_PRIVATE_KEY: string;
      REFRESH_TOKEN_PRIVATE_KEY: string;
      SALT: number;
    }
  }
}
