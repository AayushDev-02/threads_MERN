declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        MONGO_URI: string;
        JWT_SECRET: string;
        // add more environment variables and their types here
      }
    }
  }