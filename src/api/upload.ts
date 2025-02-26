import { request } from '@/utils/http/axios'

export function uploadImage(file: File, imgName: string, flag: number): Promise<Record<string, any>> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('imgName', imgName)
  formData.append('flag', flag.toString())
  return request('/api/upload', formData, 'post')
}

export function getImages(): Promise<string[]> {
  return request('/api/getImages', {}, 'get')
}
