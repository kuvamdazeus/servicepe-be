declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    DATABASE_URL: string;
    G_API_KEY: string;
  }
}

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
