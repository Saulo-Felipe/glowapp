import { toast } from 'sonner'

interface ApiProps {
  pathname: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, any>
}

interface ApiResponse<T> {
  error?: boolean
  warning?: boolean
  success?: boolean
  message?: string
  data?: T
}

export async function api<T>({ pathname, method, body }: ApiProps): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`http://localhost:3000${pathname}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data: ApiResponse<T> = await response.json()

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
