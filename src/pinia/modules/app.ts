import pinia from '@/pinia'
import { DeviceEnum } from '@/enums/DeviceEnum'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  // 设备类型
  const device = useStorage('device', DeviceEnum.DESKTOP)

  // 布局大小
  const size = useStorage('size', 'default')

  // 切换设备
  function toggleDevice(val: string) {
    device.value = val
  }

  /**
   * 改变布局大小
   *
   * @param val 布局大小 default | small
   */
  function changeSize(val: string) {
    size.value = val
  }

  return {
    device,
    size,
    toggleDevice,
    changeSize
  }
})

export default useAppStore
