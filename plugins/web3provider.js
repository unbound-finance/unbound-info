import { ethers } from 'ethers'
import config from '~/globalConfig'

export function getProvider() {
  try {
    const PROVIDER = new ethers.providers.JsonRpcProvider(config.infura_url)
    const SIGNER = PROVIDER.getSigner()
    return { PROVIDER, SIGNER }
  } catch (error) {
    console.warn(error)
    return {}
  }
}

export default function (_, inject) {
  inject('getProvider', getProvider)
}
