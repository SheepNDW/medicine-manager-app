import { request } from '../utils/request';

interface LoginData {
  userName: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  errorMessage: string;
  /** token */
  data: string;
}

/**
 * 管理後台登入 API
 * @param data - login info
 */
export const loginAPI = (data: LoginData): Promise<LoginResponse> =>
  request.post('/auth/admin_login', data);
