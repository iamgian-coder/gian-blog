import crypto from 'crypto'
import randomstring from 'randomstring'
export default function ({ $axios, $config, error }) {
  $axios.onRequest((config) => {
    const genSign = (id, stamp, nonce) => {
      const hmac = crypto.createHmac('sha256', $config.clientSecret + '')
      hmac.update(`${nonce}${id}${stamp}`)
      return hmac.digest('hex')
    }
    const id = $config.clientId
    const stamp = Date.now()
    const nonce = randomstring.generate()
    const common = config.headers.common
    common.id = id
    common.stamp = stamp
    common.nonce = nonce
    common.sign = genSign(id, stamp, nonce)
  })
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    error({ statusCode: code })
  })
}
