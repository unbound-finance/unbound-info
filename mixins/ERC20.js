import { ethers } from 'ethers'

import { getProvider } from '~/plugins/web3provider'
import ERC20ABI from '~/constants/abis/ERC20'

const getTokenBalance = async (tokenAddress) => {
  const { provider, signer } = getProvider()
  try {
    const userAddress = signer.getAddress()
    const poolTokenContract = await new ethers.Contract(
      tokenAddress,
      ERC20ABI,
      signer
    )
    const raw = await poolTokenContract.balanceOf(userAddress)
    const formatted = ethers.utils.formatEther(raw.toString())
    const toFixed = parseFloat(formatted).toFixed(4).slice(0, -1)

    return {
      raw,
      formatted,
      toFixed,
    }
  } catch (error) {
    throw new Error('Something went wrong!', error)
  }
}

const getDecimals = async (tokenAddress) => {
  const { provider, signer } = getProvider()
  const token = new ethers.Contract(tokenAddress, ERC20ABI, signer)
  const decimals = await token.decimals()
  return decimals.toString()
}

export { getTokenBalance, getDecimals }
