import { request } from '@/utils/http/axios'

export function doLogin(params: Record<string, any>): Promise<Record<string, any>> {
  return request('/auth/login', params, 'post')
}

export function getUserInfo(): Promise<Record<string, any>> {
  return request('/auth/user-info', {}, 'get')
}

export function clearChat(): Promise<Record<string, any>> {
  return request('/auth/clear-chat-history', {}, 'post')
}

export function logout(): Promise<Record<string, any>> {
  return request('/auth/logout', {}, 'post')
}
