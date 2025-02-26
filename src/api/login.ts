import { request } from '@/utils/http/axios'

export function doLogin(params: Record<string, any>): Promise<Record<string, any>> {
  return request('/api/auth/login', params, 'post')
}

export function getUserInfo(): Promise<Record<string, any>> {
  return request('/api/auth/user-info', {}, 'get')
}
