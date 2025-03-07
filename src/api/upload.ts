import { request } from '@/utils/http/axios'

export function uploadImage(file: any, imgName: string, flag: number): Promise<Record<string, any>> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('imgName', imgName)
  formData.append('flag', flag.toString())
  return request('/upload', formData, 'post')
}

export function getImages(): Promise<string[]> {
  return request('/getImages', {}, 'get')
}

export function deleteImages(params: any): Promise<string[]> {
  return request('/deleteImage', params, 'post')
}
