import { ethers } from 'ethers'
import { getProvider } from '~/plugins/web3provider'
import { UNBOUND_VALUATOR_ABI, contracts } from '~/constants'

const getLLC = async (llcAddress) => {
  const {provider, signer} = getProvider()
  // get LLC details like feeRate and LTV
  const valuator = new ethers.Contract(
    contracts.valuator,
    UNBOUND_VALUATOR_ABI,
    signer
  )

  const getLLCStruct = await valuator.getLLCStruct(llcAddress)

  return {
    fee: getLLCStruct.fee.toString(),
    loanRate: getLLCStruct.loanrate.toString(),
  }
}

export { getLLC }
