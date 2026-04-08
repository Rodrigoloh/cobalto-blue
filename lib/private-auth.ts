export const AUTH_COOKIE_NAME = 'cb_private_session'

const AUTH_NAMESPACE = 'cobalto.blue/private-reports'

function getPasswordValue() {
  return process.env.REPORT_ACCESS_PASSWORD?.trim() ?? ''
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
}

export function isPrivateAuthConfigured() {
  return getPasswordValue().length > 0
}

export function validatePrivatePassword(candidate: string) {
  const password = getPasswordValue()
  return Boolean(password) && candidate === password
}

export async function createPrivateSessionToken() {
  const password = getPasswordValue()

  if (!password) {
    return ''
  }

  const payload = new TextEncoder().encode(`${AUTH_NAMESPACE}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', payload)

  return toHex(digest)
}
