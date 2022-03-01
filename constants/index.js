// ABIs
import ERC20_ABI from './abis/ERC20'
import UNBOUND_DOLLAR_ABI from './abis/UnboundDollar'
import UNBOUND_FAUCET_ABI from './abis/UnboundFaucet'
import UNBOUND_LLC_ABI from './abis/UnboundLLCABI'
import UNBOUND_STAKING_ABI from './abis/UnboundStaking'
import UNBOUND_VALUATOR_ABI from './abis/UnboundValuator'
import UNISWAP_LPT_ABI from './abis/UniswapLPTABI'
import UNISWAP_ROUTER_ABI from './abis/UniswapRouter'
import ORACLE_ABI from './abis/Oracle'

export const contracts = {
  dai: '0x9CD539Ac8Dca5757efAc30Cd32da20CD955e0f8B',
  eth: '0x24Cc33eBd310f9cBd12fA3C8E72b56fF138CA434',
  liquidityPoolToken: '0x266480906Fd0aa3edD7fF64f466ea9684b792179',
  unboundDai: '0xa729D5cA5BcE0d275B69728881f5bB86511EA70B',
  unboundEth: '0xC692bF3B0525FdfCD52982075D22269de0BcA609',
  liquidityLock: '0x0097551eBF9224159D4f94CA3Cb03bb7608e1C54',
  unboundStaking: '0x339004Ea6d1F74B94A905a314B52211f0DdeC00F',
  UNDUniswapPool: '0xa5c638db7a286b722406f03eaf5c8a8178927a19',
  uETHUniswapPool: '0x1ab39c83bab36c8ecbafba448748c50f5eb4db2a',
  uniswapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  valuator: '0xCF6d958c738fa2926Ce979671Ad154AbFEB5C61e',
}
export const uToken = {
  UND: '0x17297e6f90D625646D3f5B207B74cEFD66a40732',
}
// Chain ID
export const CHAIN_ID = 42

// SAFU fund address
export const SAFU_FUND = '0xcc729a114aa8f572971d4d85B21e661E265Df20C'

// Dev fund address
export const DEV_FUND = '0xeA6439DdaB48bF67e8e067b124Cf16d5bFBA8CDB'

// Faucet address
export const FAUCET = '0x7FCc135CA31746aeed9a32bC7314347f6ec039C2'

// Etherscan API host (kovan)
// export const ETHERSCAN_HOST = 'https://api-kovan.etherscan.io/api'

export const NETWORK_COLORS = {
  mainnet: 'bg-cyan-500',
  polygon: 'bg-purple-500',
  rinkeby: 'bg-yellow-400',
}

export {
  ERC20_ABI,
  UNBOUND_DOLLAR_ABI,
  UNBOUND_FAUCET_ABI,
  UNBOUND_LLC_ABI,
  UNISWAP_LPT_ABI,
  UNBOUND_STAKING_ABI,
  UNBOUND_VALUATOR_ABI,
  UNISWAP_ROUTER_ABI,
  ORACLE_ABI,
}
