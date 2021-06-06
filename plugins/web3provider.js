import { ethers } from 'ethers'
import config from '~/globalConfig'

export function getProvider() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(config.infura_url)
    const signer = provider.getSigner()
    return { provider, signer }
  } catch (error) {
    console.warn(error)
    return {}
  }
}

export default function (_, inject) {
  inject('getProvider', getProvider)
}
