import { ethers } from 'ethers'
// import { formatBigNumber } from './'
import { ORACLE_ABI } from '~/constants'
import { getProvider } from '~/plugins/web3provider'

export async function fetchLPTPrice(oracleAddress) {
  const { SIGNER } = getProvider()
  const contract = new ethers.Contract(oracleAddress, ORACLE_ABI, SIGNER)
  const price = await contract.latestAnswer()
  return price
}
