import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Sparkles,
} from "lucide-react";
import { useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema de validação com Zod
const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Tipos TypeScript
type AuthFormData = z.infer<typeof authSchema>;

interface FormFieldState {
  hasError: boolean;
  isValid: boolean;
  isTouched: boolean;
}

export const Route = createFileRoute("/home")({
  component: MainAuthPage,
});

function MainAuthPage(): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Observa os valores dos campos
  const watchedFields = watch();

  // Função para determinar o estado visual dos campos
  const getFieldState = (fieldName: keyof AuthFormData): FormFieldState => {
    const hasError = !!errors[fieldName];
    const isTouched = !!touchedFields[fieldName];
    const hasValue = !!watchedFields[fieldName];
    const isValid = isTouched && !hasError && hasValue;

    return {
      hasError,
      isValid,
      isTouched,
    };
  };

  const onSubmit = async (data: AuthFormData): Promise<void> => {
    setIsLoading(true);

    setTimeout(() => {
      console.log("Login:", data);
      setIsLoading(false);
      navigate({ to: "/register-step-1" });
    }, 1500);
  };

  const handleGoogleLogin = (): void => {
    console.log("Google login");
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  // Estados dos campos
  const emailState = getFieldState("email");
  const passwordState = getFieldState("password");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header Elegante */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 relative"
            style={{
              background:
                "linear-gradient(135deg, #721FA6 0%, #9333ea 30%, #c084fc 70%, #e879f9 100%)",
              boxShadow:
                "0 20px 40px -10px rgba(114, 31, 166, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
            }}
          >
            <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
              }}
            />
          </div>

          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            GlowApp
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Sua beleza, nossa paixão
          </p>
        </div>

        {/* Card Principal */}
        <div
          className="rounded-3xl p-8 backdrop-blur-lg border relative overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderColor: "rgba(114, 31, 166, 0.08)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(114, 31, 166, 0.03)",
          }}
        >
          {/* Efeito decorativo */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, #721FA6, #9333ea, #c084fc)",
            }}
          />

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-gray-600">
              Faça login para acessar seus agendamentos
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 mb-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-semibold relative z-10">
              Entrar com Google
            </span>
          </button>

          {/* Divisor */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="px-4 text-sm font-medium text-gray-500 bg-white">
              ou continue com email
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-colors duration-200 ${
                      emailState.hasError
                        ? "text-red-400"
                        : emailState.isValid
                          ? "text-green-500"
                          : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                    emailState.hasError
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : emailState.isValid
                        ? "border-green-300 focus:border-green-500 bg-green-50"
                        : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                  }`}
                  style={{ fontSize: "16px" }}
                />
                {emailState.isValid && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
                {emailState.hasError && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  {...register("password")}
                  className={`w-full pl-4 pr-12 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                    passwordState.hasError
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : passwordState.isValid
                        ? "border-green-300 focus:border-green-500 bg-green-50"
                        : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                  }`}
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                Esqueceu sua senha?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                isValid && !isLoading
                  ? "bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar na conta"
              )}
            </button>
          </form>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Ao entrar, você concorda com nossos{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
              >
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
              >
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Novo por aqui?{" "}
            <button
              type="button"
              className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"
            >
              Criar conta gratuita
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
