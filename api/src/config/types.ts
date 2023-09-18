import { LogFormat, LogLevel } from '@src/logger/types';

export interface Config {
  env: string;
  timeout: ConfigTimeout;
  http: ConfigHttp;
  logger: ConfigLogger;
  database: ConfigDatabase;
}

export interface ConfigTimeout {
  shutdownSeconds: number;
}

export interface ConfigHttp {
  host: string;
  port: number;
}

export interface ConfigLogger {
  level: LogLevel;
  format: LogFormat;
}

export interface ConfigDatabase {
  host: string;
  port: number;
  user: string;
  password: string;
}
