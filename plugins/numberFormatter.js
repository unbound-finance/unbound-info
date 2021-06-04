function abbreviateNumber(num, fixed) {
  if (num === null) {
    return null
  } // terminate early
  if (num === 0 || num === '0') {
    return '0'
  } // terminate early

  if (typeof num === 'string') num = Number(num)
  fixed = !fixed || fixed < 0 ? 0 : fixed // number of decimal places to show
  const b = num.toPrecision(2).split('e') // get power
  const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3) // floor at decimals, ceiling at trillions
  const c =
    k < 1
      ? num.toFixed(0 + fixed)
      : (num / Math.pow(10, k * 3)).toFixed(1 + fixed) // divide by power
  const d = c < 0 ? c : Math.abs(c) // enforce -0 is 0
  const e = d + ['', 'K', 'M', 'B', 'T'][k] // append power
  return e
}

export default (_, inject) => {
  inject('numberFormatter', abbreviateNumber)
}
