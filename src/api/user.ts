import { request } from '@/utils/http/axios'

export function getUserList(): Promise<Record<string, any>> {
  return request('/user/list', {}, 'get')
}
