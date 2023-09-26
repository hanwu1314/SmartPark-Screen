import { ref } from 'vue'
import { getParkInfoAPI } from '@/services'

function useParkInfo() {
  const parkInfo = ref({})
  async function getUserInfo() {
    const res = await getParkInfoAPI()
    parkInfo.value = res.data
  }
  return {
    parkInfo,
    getUserInfo
  }
}

export { useParkInfo }
