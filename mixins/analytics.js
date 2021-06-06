import { ethers } from 'ethers'
import { UNISWAP_LPT_ABI, UNBOUND_DOLLAR_ABI, contracts } from '~/constants'
import { getEthPrice, getLPTPrice, getTotalLockedLPT } from '~/mixins/info'
import supportedPoolTokens from '~/configs/supportedPoolTokens'

export const getTotalLiquidity = async (
  web3ModalProvider = window.ethereum
) => {
  const provider = new ethers.providers.Web3Provider(web3ModalProvider)
  const signer = provider.getSigner()
  const und = new ethers.Contract(
    contracts.UNDUniswapPool,
    UNISWAP_LPT_ABI,
    signer
  )
  const ueth = new ethers.Contract(
    contracts.uETHUniswapPool,
    UNISWAP_LPT_ABI,
    signer
  )
  const undReserve = await und.getReserves()
  const uethReserve = await ueth.getReserves()

  const undLiquidity = (ethers.BigNumber.from(undReserve[0]) * 2) / 1e18
  const uethLiquidity = (ethers.BigNumber.from(uethReserve[0]) * 2) / 1e18

  const ethPrice = await getEthPrice()
  const uethLiquidityInUsd = Number(uethLiquidity * ethPrice)

  return {
    total: Number(undLiquidity + uethLiquidityInUsd),
    undLiquidity: Number(undLiquidity),
    uethLiquidity: Number(uethLiquidity),
    uethLiquidityInUsd: Number(uethLiquidityInUsd),
  }
}

export const getDailyVolume = async () => {}

export const getMintingFees = async () => {}

export const getCRatio = async (web3ModalProvider = window.ethereum) => {
  const provider = new ethers.providers.Web3Provider(web3ModalProvider)
  const signer = provider.getSigner()
  // Get total UND and uETH minted
  const und = new ethers.Contract(
    contracts.unboundDai,
    UNBOUND_DOLLAR_ABI,
    signer
  )

  const ueth = new ethers.Contract(
    contracts.unboundEth,
    UNBOUND_DOLLAR_ABI,
    signer
  )

  const totalUND = await und.totalSupply()
  const totalUETH = await ueth.totalSupply()
  const ethPrice = await getEthPrice()

  const totalUTokensMinted = totalUND / 1e18 + (totalUETH / 1e18) * ethPrice

  // Get total value of locked LPT's
  const totalLockedLPTValue = (
    await Promise.all(
      supportedPoolTokens.map(async (poolToken) => {
        const LPTPrice = await getLPTPrice(poolToken, web3ModalProvider)
        const lockedLPT = await getTotalLockedLPT(
          poolToken.address,
          poolToken.llcAddress,
          web3ModalProvider
        )
        return Number(LPTPrice * lockedLPT)
      })
    )
  ).reduce((a, b) => a + b || 0, 0)

  // Calculate Collatralization Percentage
  return Number((totalLockedLPTValue / totalUTokensMinted) * 100).toFixed(2)
}

export const getTVL = async (web3ModalProvider = window.ethereum) => {
  // Get total value of locked LPT's
  const totalLockedLPTValue = (
    await Promise.all(
      supportedPoolTokens.map(async (poolToken) => {
        const LPTPrice = await getLPTPrice(poolToken, web3ModalProvider)
        const lockedLPT = await getTotalLockedLPT(
          poolToken.address,
          poolToken.llcAddress,
          web3ModalProvider
        )
        return Number(LPTPrice * lockedLPT)
      })
    )
  ).reduce((a, b) => a + b || 0, 0)

  // Calculate Collatralization Percentage
  return Number(totalLockedLPTValue).toFixed(2)
}

export const getFeesAccrued = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const unboundToken = await new ethers.Contract(
    contracts.unboundDai,
    UNBOUND_DOLLAR_ABI,
    signer
  )

  // get total fee stored in the contract
  const storedFee = await unboundToken.storedFee()

  // get splitting ratio of the storedFee
  const stakeShares = await unboundToken.stakeShares()
  // const safuSharesOfStoredFee = await unboundToken.safuSharesOfStoredFee()

  // split stored fee
  const stakingFees = (storedFee * stakeShares) / 100
  const staking = (stakingFees / 1e18).toFixed(2)

  // const remainingFee = storedFee - stakingFees

  // const safu = ((remainingFee * safuSharesOfStoredFee) / 100 / 1e18).toFixed(2)

  // this.fees.devfund = (
  //   (remainingFee - (remainingFee * safuSharesOfStoredFee) / 100) /
  //   1e18
  // ).toFixed(2)

  // console.log(safuSharesOfStoredFee.toString())
  return {
    staking,
  }
}
