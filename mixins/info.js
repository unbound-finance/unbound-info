import { ethers } from 'ethers'
import Axios from 'axios'

import ERC20ABI from '~/constants/abis/ERC20'
import UnboundDollarABI from '~/constants/abis/UnboundDollar'
import UnboundLLCABI from '~/constants/abis/UnboundLLCABI'
import UniswapLPTABI from '~/constants/abis/UniswapLPTABI'

import { getDecimals } from '~/mixins/ERC20'

import { getProvider } from '~/plugins/web3provider'

const getBalanceOfToken = async (
  tokenAddress,
  web3ModalProvider = window.ethereum
) => {
  const {provider, signer} = getProvider()
  const contract = await new ethers.Contract(tokenAddress, ERC20ABI, signer)
  const userAddress = signer.getAddress()
  const getBalance = await contract.balanceOf(userAddress)
  const balance = ethers.utils.formatEther(getBalance.toString())
  const formattedBalance = parseFloat(balance).toFixed(4).slice(0, -1)
  return formattedBalance
}

const checkLoan = async (
  LLCAddress,
  uTokenAddress,
  web3ModalProvider = window.ethereum
) => {
  const {provider, signer} = getProvider()
  const contract = await new ethers.Contract(
    uTokenAddress,
    UnboundDollarABI,
    signer
  )
  const userAddress = signer.getAddress()
  const getBalance = await contract.checkLoan(userAddress, LLCAddress)
  const balance = ethers.utils.formatEther(getBalance.toString())
  const formattedBalance = parseFloat(balance).toFixed(4).slice(0, -1)
  return { formattedBalance, rawBalance: getBalance }
}

const getLockedLPT = async (
  LLCAddress,
  web3ModalProvider = window.ethereum
) => {
  try {
    const {provider, signer} = getProvider()
    const contract = new ethers.Contract(LLCAddress, UnboundLLCABI, signer)
    const userAddress = signer.getAddress()
    const getLocked = await contract.tokensLocked(userAddress)
    const locked = ethers.utils.formatEther(getLocked.toString())
    return {
      formatted: locked,
      raw: getLocked,
    }
  } catch (error) {
    console.log(error)
  }
}

const getCR = async (LLCAddress, web3ModalProvider = window.ethereum) => {
  try {
    const {provider, signer} = getProvider()
    const contract = new ethers.Contract(LLCAddress, UnboundLLCABI, signer)
    const getCR = await contract.CREnd()
    return getCR
  } catch (error) {
    console.log(error)
  }
}

const getTotalLockedLPT = async (
  LPTAddress,
  LLCAddress,
  web3ModalProvider = window.ethereum
) => {
  const {provider, signer} = getProvider()
  try {
    const contract = await new ethers.Contract(
      LPTAddress,
      UniswapLPTABI,
      signer
    )
    const getLocked = await contract.balanceOf(LLCAddress)
    const locked = ethers.utils.formatEther(getLocked)
    const formatted = parseFloat(locked).toFixed(4).slice(0, -1)
    return formatted
  } catch (error) {
    console.log(error)
  }
}

const getLPTPrice = async (poolToken, web3ModalProvider = window.ethereum) => {
  const {provider, signer} = getProvider()
  const contract = await new ethers.Contract(
    poolToken.address,
    UniswapLPTABI,
    signer
  )

  const reserve = await contract.getReserves()
  const LPTTotalSupply = await contract.totalSupply()
  const token0 = await contract.token0()
  const token1 = await contract.token1()

  if (token0.toLowerCase() === poolToken.stablecoin.toLowerCase()) {
    const stablecoinDecimal = await getDecimals(token0, web3ModalProvider)
    let difference
    let totalValue

    totalValue = reserve[0].toString() * 2
    // first case: tokenDecimal is smaller than 18
    // for stablecoins with less than 18 decimals
    if (stablecoinDecimal < '18' && stablecoinDecimal >= '0') {
      // calculate amount of decimals under 18
      difference = 18 - stablecoinDecimal
      totalValue = totalValue * 10 ** difference
    } else if (stablecoinDecimal > '18') {
      // caclulate amount of decimals over 18
      difference = stablecoinDecimal - 18
      // removes decimals to match 18
      totalValue = totalValue / 10 ** difference
    }

    if (poolToken.uToken.symbol === 'uETH') {
      const ethPrice = await getEthPrice()
      return (totalValue / LPTTotalSupply).toFixed(4).slice(0, -1) * ethPrice
    } else {
      return (totalValue / LPTTotalSupply).toFixed(4).slice(0, -1)
    }
  } else {
    const stablecoinDecimal = await getDecimals(token1, web3ModalProvider)
    let difference
    let totalValue

    totalValue = reserve[1].toString() * 2
    // first case: tokenDecimal is smaller than 18
    // for stablecoins with less than 18 decimals
    if (stablecoinDecimal < '18' && stablecoinDecimal >= '0') {
      // calculate amount of decimals under 18
      difference = 18 - stablecoinDecimal
      totalValue = totalValue * 10 ** difference
    } else if (stablecoinDecimal > '18') {
      // caclulate amount of decimals over 18
      difference = stablecoinDecimal - 18
      // removes decimals to match 18
      totalValue = totalValue / 10 ** difference
    }

    if (poolToken.uToken.symbol === 'uETH') {
      const ethPrice = await getEthPrice()
      return (totalValue / LPTTotalSupply).toFixed(4).slice(0, -1) * ethPrice
    } else {
      return (totalValue / LPTTotalSupply).toFixed(4).slice(0, -1)
    }
  }
}

const getEthPrice = async () => {
  try {
    const data = JSON.stringify({
      query: `
          query($id: String!) {
            pair(id: $id) {
              token1Price
            }
          }
        `,
      variables: {
        id: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
      },
    })
    const config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const { data } = await Axios(config)
      if (!data.data) {
        return 0
      }
      return Number(data.data.pair.token1Price).toFixed(2)
    } catch (e) {
      return 0
    }
  } catch (error) {
    throw new Error('Something went wrong', error)
  }
}

const getUniswapTvl = async (address) => {
  try {
    const data = JSON.stringify({
      query: `
          query($id: String!) {
            pair(id: $id) {
              token0 {
                symbol
                name
              }
            token1 {
                symbol
                name
            }
            reserve0
            reserve1
            reserveUSD
            }
          }
        `,
      variables: {
        id: address,
      },
    })
    const config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const { data } = await Axios(config)
      if (!data.data.pair) {
        return 0
      }
      return data.data.pair.reserveUSD
    } catch (e) {
      return 0
    }
  } catch (error) {
    throw new Error('Something went wrong', error)
  }
}

const getTotalVolume = async () => {
  try {
    const data = JSON.stringify({
      query: `
          query {
              alls {
               lockUSD
               unlockUSD
              }
          }
        `,
    })
    const config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/furuta/und-kovan',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const { data } = await Axios(config)
      if (!data.data) {
        return 0
      }
      return (
        Number(data.data.alls[0].lockUSD) + Number(data.data.alls[0].unlockUSD)
      )
    } catch (e) {
      return 0
    }
  } catch (error) {
    throw new Error('Something went wrong', error)
  }
}

const getDailyVolume = async () => {
  try {
    const data = JSON.stringify({
      query: `
          query {
            dailies(first: ${1}, orderBy: ${'date'}, orderDirection: ${'desc'}) {
              date
              lockUSD
              unlockUSD
            }
          }
        `,
    })
    const config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/furuta/und-kovan',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const { data } = await Axios(config)
      if (!data.data) {
        return 0
      }
      return (
        Number(data.data.dailies[0].lockUSD) +
        Number(data.data.dailies[0].unlockUSD)
      )
    } catch (e) {
      return 0
    }
  } catch (error) {
    throw new Error('Something went wrong', error)
  }
}

const getTransactions = async (web3ModalProvider = window.ethereum) => {
  try {
    const {provider, signer} = getProvider()
    const address = await provider.getSigner().getAddress()

    const data = JSON.stringify({
      query: `
          query($id: String!) {
            user(id: $id) {
              transactions(first: ${20}, orderBy: ${'blockTime'}, orderDirection: ${'desc'}){
                id
                blockTime
                uTokenAddress
                uTokenAmount
                type
              }
            }
          }
        `,
      variables: {
        id: address.toLocaleLowerCase(),
      },
    })
    const config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/furuta/und-kovan',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const { data } = await Axios(config)
      if (!data.data) {
        return []
      }
      return data.data.user.transactions
    } catch (e) {
      return []
    }
  } catch (error) {
    throw new Error('Something went wrong', error)
  }
}

export {
  getBalanceOfToken,
  checkLoan,
  getLockedLPT,
  getTotalLockedLPT,
  getEthPrice,
  getLPTPrice,
  getUniswapTvl,
  getTotalVolume,
  getDailyVolume,
  getTransactions,
  getCR,
}
