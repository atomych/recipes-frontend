import login from '@/infrastructure/auth/login.ts';
import register from '@/infrastructure/auth/register.ts';
import getByCode from '@/infrastructure/auth/get-by-code.ts';
import getByRefresh from '@/infrastructure/auth/get-by-refresh.ts';

export default {
  login,
  register,
  getByCode,
  getByRefresh,
};
