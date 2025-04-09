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

export function getPath(): Promise<Record<string, any>> {
  return request('/auth/path', {}, 'get')
}

export function updateUser(params: Record<string, any>): Promise<Record<string, any>> {
  return request('/admin/update', params, 'post')
}

export function getProductList(params: Record<string, any>): Promise<Record<string, any>> {
  return request('/product/list', params, 'get')
}

export function addProduct(params: Record<string, any>): Promise<Record<string, any>> {
  return request('/product/add', params, 'post')
}

export function deleteProducts(params: Record<string, any>): Promise<Record<string, any>> {
  return request('/product/delete', params, 'post')
}
