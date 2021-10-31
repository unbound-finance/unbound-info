export function getIconUrl(name: string): string {
    if (name == 'WETH') name = 'ETH'
    const BASE_URL =
      'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/icon/'
    const result = `${BASE_URL}${name.toLowerCase()}.svg`
  
    return result
}
  