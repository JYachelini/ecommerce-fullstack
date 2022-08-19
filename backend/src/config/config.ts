import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    PORT: process.env.PORT || 8080,
    FRONTEND_PORT: process.env.FRONTEND_PORT || 5173,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  };
});
