import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  AlertCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  Sparkles,
} from 'lucide-react'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

// Schema de validação com Zod
const authSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Digite um email válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

// Tipos TypeScript
type AuthFormData = z.infer<typeof authSchema>

interface FormFieldState {
  hasError: boolean
  isValid: boolean
  isTouched: boolean
}

export const Route = createFileRoute('/auth/login')({
  component: MainAuthPage,
})

function MainAuthPage(): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Observa os valores dos campos
  const watchedFields = watch()

  // Função para determinar o estado visual dos campos
  const getFieldState = (fieldName: keyof AuthFormData): FormFieldState => {
    const hasError = !!errors[fieldName]
    const isTouched = !!touchedFields[fieldName]
    const hasValue = !!watchedFields[fieldName]
    const isValid = isTouched && !hasError && hasValue

    return {
      hasError,
      isValid,
      isTouched,
    }
  }

  const onSubmit = async (data: AuthFormData): Promise<void> => {
    setIsLoading(true)

    setTimeout(() => {
      console.log('Login:', data)
      setIsLoading(false)
      navigate({ to: '/register-step-1' })
    }, 1500)
  }

  const handleGoogleLogin = (): void => {
    console.log('Google login')
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev)
  }

  // Estados dos campos
  const emailState = getFieldState('email')
  const passwordState = getFieldState('password')

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        background:
          'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header Elegante */}
        <div className="mb-6 flex items-center gap-2 text-left">
          <div
            className="flex size-16 items-center justify-center rounded-full"
            style={{
              background:
                'linear-gradient(135deg, #721FA6 0%, #9333ea 30%, #c084fc 70%, #e879f9 100%)',
              boxShadow:
                '0 20px 40px -10px rgba(114, 31, 166, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            }}
          >
            <Sparkles className="size-8 text-white drop-shadow-lg" />
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background:
                  'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
              }}
            />
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
              GlowApp
            </h1>

            <div className="text-gray-600">Seu tempo é nossa prioridade</div>
          </div>
        </div>

        {/* Card Principal */}
        <div
          className="relative overflow-hidden rounded-3xl border px-6 py-8 backdrop-blur-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(114, 31, 166, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(114, 31, 166, 0.03)',
          }}
        >
          {/* Efeito decorativo */}
          <div
            className="absolute top-0 right-0 left-0 h-1"
            style={{
              background: 'linear-gradient(90deg, #721FA6, #9333ea, #c084fc)',
            }}
          />

          <h2 className="mb-2 text-xl font-bold text-gray-800">Acesse sua conta</h2>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group relative mt-8 mb-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <FcGoogle className="z-10 size-6" />
            <span className="relative z-10 font-semibold text-gray-700">Entrar com Google</span>
          </button>

          {/* Divisor */}
          <div className="mb-6 flex items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="bg-white px-4 text-sm font-medium text-gray-500">
              ou continue com email
            </span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <MailIcon
                    className={`h-5 w-5 transition-colors duration-200 ${
                      emailState.hasError
                        ? 'text-red-400'
                        : emailState.isValid
                          ? 'text-green-500'
                          : 'text-gray-400'
                    }`}
                  />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email')}
                  className={`w-full rounded-2xl border-2 py-4 pr-12 pl-12 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none ${
                    emailState.hasError
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : emailState.isValid
                        ? 'border-green-300 bg-green-50 focus:border-green-500'
                        : 'border-gray-200 bg-white hover:border-gray-300 focus:border-purple-500'
                  }`}
                  style={{ fontSize: '16px' }}
                />
                {emailState.isValid && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {emailState.hasError && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircleIcon className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  {...register('password')}
                  className={`w-full rounded-2xl border-2 py-4 pr-12 pl-4 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none ${
                    passwordState.hasError
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : passwordState.isValid
                        ? 'border-green-300 bg-green-50 focus:border-green-500'
                        : 'border-gray-200 bg-white hover:border-gray-300 focus:border-purple-500'
                  }`}
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircleIcon className="h-4 w-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm font-medium text-purple-600 transition-colors hover:text-purple-700 hover:underline"
              >
                Esqueceu sua senha?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`relative w-full overflow-hidden rounded-2xl py-4 font-semibold text-white transition-all duration-300 ${
                isValid && !isLoading
                  ? 'transform bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 shadow-lg hover:-translate-y-0.5 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 hover:shadow-xl active:scale-95'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs leading-relaxed text-gray-500">
              Ao entrar, você concorda com nossos{' '}
              <a
                href="#"
                className="font-medium text-purple-600 transition-colors hover:text-purple-700 hover:underline"
              >
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a
                href="#"
                className="font-medium text-purple-600 transition-colors hover:text-purple-700 hover:underline"
              >
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="my-5 text-center text-gray-600">
          Novo por aqui?{' '}
          <Link to="/auth/register">
            <button
              type="button"
              className="font-semibold text-purple-600 transition-colors hover:text-purple-700 hover:underline"
            >
              Criar conta gratuita
            </button>
          </Link>
        </p>
      </div>
    </div>
  )
}
