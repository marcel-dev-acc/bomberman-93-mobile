import ENV from '../../../env'

const post = async (
  url: string,
  payload: {},
  headers?: {},
): Promise<Response | undefined> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    } as any)
    return res
  } catch (err) {
    return undefined
  }
}

interface RequestTokenResponse {
  ok: boolean
  message: string
}

export const requestToken = async (
  email: string,
): Promise<RequestTokenResponse> => {
  const res = await post(ENV.registrationUrl, {email}, {})
  if (!res) {
    return {
      ok: false,
      message: 'Failed to register',
    }
  }
  return JSON.parse(await res.text())
}
