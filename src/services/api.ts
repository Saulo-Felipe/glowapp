import { Preferences } from '@capacitor/preferences'
import { toast } from 'sonner'

interface ApiProps {
  pathname: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, any>
  removeTokenFromHeader?: boolean
}

export interface ApiResponse<T> {
  error?: boolean
  warning?: boolean
  success?: boolean
  message?: string
  data?: T
  status?: number
}

export async function api<T>({
  pathname,
  method,
  body,
  removeTokenFromHeader,
}: ApiProps): Promise<ApiResponse<T>> {
  try {
    const token =
      !removeTokenFromHeader && (await Preferences.get({ key: 'company_auth_token' })).value

    const response = await fetch(`http://localhost:3000${pathname}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data: ApiResponse<T> = await response.json()

    if (data.status === 401) {
      toast.error(data.message)
      await Preferences.remove({ key: 'company_auth_token' })
      return data
    }

    if (data.message) {
      if (data.success) {
        toast.success(data.message)
      } else if (data.error) {
        toast.error(data.message)
      } else if (data.warning) {
        toast.warning(data.message)
      }
    }

    return data
  } catch {
    return { error: true, message: 'Ocorreu um erro ao tentar acessar a API' }
  }
}
