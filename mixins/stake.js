import { ethers } from 'ethers'
import { getProvider } from '~/plugins/web3provider'

import { UNISWAP_LPT_ABI, UNISWAP_ROUTER_ABI, contracts } from '~/constants'
import { toFixed } from '~/utils'

const addLiquidity = async (tokenA, tokenB, amountA, amountB) => {
  const { provider, signer } = getProvider()
  const contract = new ethers.Contract(
    contracts.uniswapRouter,
    UNISWAP_ROUTER_ABI,
    provider
  )
  const formatAmountA = toFixed(amountA * 1e18).toString()
  const formatAmountB = toFixed(amountB * 1e18).toString()

  const amountADesired = formatAmountB
  const amountBDesired = formatAmountB
  const amountAMin = toFixed(
    formatAmountA - (formatAmountA * 10) / 100
  ).toString()
  const amountBMin = toFixed(
    formatAmountB - (formatAmountB * 10) / 100
  ).toString()
  const to = await signer.getAddress()
  const deadline = +new Date() + 5000

  try {
    const transaction = await contract.addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    )
    return transaction
  } catch (error) {
    if (error.code !== 4001) {
      this.$logRocket.captureException(error, {
        tags: {
          function: 'addLiquidity',
        },
        extra: {
          pageName: 'Add Liquidity',
        },
      })
      this.$logRocket.identify(this.$store.state.address)
    }
  }
}

// UETH-ETH
// DAI-UND

// const removeLiquidity = async (
//   tokenA,
//   tokenB,
//   amountA,
//   amountB,
//   LPTAddress
// ) => {
//   console.log('amountA', amountB)
//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//   const signer = provider.getSigner()
//   const userAddress = await signer.getAddress()
//   const nonce = await getNonce(LPTAddress, signer)
//   const deadline = +new Date() + 10000
//   const formatAmountA = toFixed(amountA * 1e18).toString()
//   const formatAmountB = toFixed(amountB * 1e18).toString()

//   const liquidity = toFixed(
//     Math.sqrt(formatAmountA * formatAmountB) - 1 / 1e18
//   ).toString()
//   // console.log('starting liq', liquidity)
//   // liquidity = toFixed(parseInt(liquidity) - 1e18).toString()

//   const amountAMin = toFixed(
//     formatAmountA - (formatAmountA * 10) / 100
//   ).toString()
//   const amountBMin = toFixed(
//     formatAmountB - (formatAmountB * 10) / 100
//   ).toString()

//   const signedData = await getEIP712Signature(
//     LPTAddress,
//     contracts.uniswapRouter,
//     userAddress,
//     liquidity,
//     nonce,
//     deadline
//   )

//   const web3 = new Web3(window.ethereum)
//   const metamaskSigner = await web3.eth.getAccounts()

//   const promise = new Promise(function (resolve, reject) {
//     web3.currentProvider.send(
//       {
//         method: 'eth_signTypedData_v3',
//         params: [metamaskSigner[0], signedData],
//         from: metamaskSigner[0],
//       },
//       async (error, signedData) => {
//         if (error || signedData.error) {
//           if (error.code !== 4001) {
//             this.$logRocket.captureException(error, {
//               tags: {
//                 function: 'removeLiquiditySignature',
//               },
//               extra: {
//                 pageName: 'Remove Liquidity',
//               },
//             })
//             this.$logRocket.identify(this.$store.state.address)
//           }

//           return error
//         }
//         const signature = ethers.utils.splitSignature(signedData.result)
//         const UniswapRouter = await new ethers.Contract(
//           contracts.uniswapRouter,
//           UNISWAP_ROUTER_ABI,
//           signer
//         )
//         try {
//           const removeLiquidity = await UniswapRouter.removeLiquidityWithPermit(
//             tokenA,
//             tokenB,
//             liquidity,
//             amountAMin,
//             amountBMin,
//             userAddress,
//             deadline,
//             false,
//             signature.v,
//             signature.r,
//             signature.s
//           )
//           resolve(removeLiquidity)
//         } catch (error) {
//           if (error.code !== 4001) {
//             this.$logRocket.captureException(error, {
//               tags: {
//                 function: 'removeLiquidity',
//               },
//               extra: {
//                 pageName: 'Remove Liquidity',
//               },
//             })
//             this.$logRocket.identify(this.$store.state.address)
//           }

//           reject(Error('It broke'))
//         }
//       }
//     )
//   })

//   return promise
//   // const signature = ethers.utils.splitSignature(signedData.result)
//   // console.log(signature)
//   // const contract = await new ethers.Contract(
//   //   config.contracts.uniswapRouter,
//   //   UniswapRouterABI,
//   //   signer
//   // )
//   // const formatAmountA = ethers.utils.parseEther(amountA).toString()
//   // const formatAmountB = ethers.utils.parseEther(amountB).toString()

//   // const liquidity = Math.sqrt(formatAmountA * formatAmountB)

//   // const amountAMin = (formatAmountA - (formatAmountA * 10) / 100).toString()
//   // const amountBMin = (formatAmountB - (formatAmountB * 10) / 100).toString()
//   // const to = await signer.getAddress()

//   // console.log({
//   //   tokenA,
//   //   tokenB,
//   //   liquidity,
//   //   amountAMin,
//   //   amountBMin,
//   //   to,
//   //   deadline,
//   // })

//   // const transaction = await contract.removeLiquidity(
//   //   tokenA,
//   //   tokenB,
//   //   liquidity,
//   //   amountAMin,
//   //   amountBMin,
//   //   to,
//   //   deadline
//   // )
// }

const getPoolTokenBalance = async (address) => {
  const { provider, signer } = getProvider()
  const userAddress = signer.getAddress()
  const poolTokenContract = await new ethers.Contract(
    address,
    UNISWAP_LPT_ABI,
    provider
  )
  const balance = poolTokenContract.balanceOf(userAddress)
  return balance
}

const getPoolTokenReserves = async (address) => {
  try {
    const { provider, signer } = getProvider()
    const poolTokenContract = new ethers.Contract(
      address,
      UNISWAP_LPT_ABI,
      provider
    )
    const reserves = await poolTokenContract.getReserves()
    return {
      reserve0: reserves[0].toString(),
      reserve1: reserves[1].toString(),
    }
  } catch (error) {}
}

const getPoolTokenTotalSupply = async (address) => {
  const { provider, signer } = getProvider()
  const poolTokenContract = new ethers.Contract(
    address,
    UNISWAP_LPT_ABI,
    provider
  )
  const totalSupply = await poolTokenContract.totalSupply()
  return totalSupply
}

const getAmountOfLockedTokens = async (address) => {
  try {
    const poolTokenTotalSupply = await getPoolTokenTotalSupply(address)
    const poolTokenBalance = await getPoolTokenBalance(address)
    const poolTokenReserves = await getPoolTokenReserves(address)
    const poolTokenRatio =
      poolTokenBalance.toString() / poolTokenTotalSupply.toString()

    return {
      token0: (poolTokenReserves.reserve0 * poolTokenRatio) / 1e18 || 0,
      token1: (poolTokenReserves.reserve0 * poolTokenRatio) / 1e18 || 0,
      poolShare: poolTokenRatio * 100 || 0,
    }
  } catch (error) {
    throw new Error('Something went wrong!', error)
  }
}

export {
  addLiquidity,
  getPoolTokenBalance,
  getPoolTokenReserves,
  getPoolTokenTotalSupply,
  getAmountOfLockedTokens,
}
