import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  Sparkles
} from "lucide-react";
import { useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
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

export const Route = createFileRoute("/auth/login")({
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
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header Elegante */}
        <div className="text-left flex gap-2 items-center mb-6">
          <div
            className="flex items-center justify-center size-16 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #721FA6 0%, #9333ea 30%, #c084fc 70%, #e879f9 100%)",
              boxShadow:
                "0 20px 40px -10px rgba(114, 31, 166, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
            }}
          >
            <Sparkles className="size-8 text-white drop-shadow-lg" />
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
              }}
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              GlowApp
            </h1>
            
            <div className="text-gray-600">Seu tempo é nossa prioridade</div>
          </div>
        </div>

        {/* Card Principal */}
        <div
          className="rounded-3xl py-8 px-6 backdrop-blur-lg border relative overflow-hidden"
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

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Acesse sua conta
          </h2>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-8 w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 mb-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FcGoogle className="size-6 z-10" />
            <span className="text-gray-700 font-semibold relative z-10">
              Entrar com Google
            </span>
          </button>

          {/* Divisor */}
          <div className="flex items-center mb-6">
            <div className="bg-gray-300 h-px flex-1" />
            <span className="px-4 text-sm font-medium text-gray-500 bg-white">
              ou continue com email
            </span>
            <div className="bg-gray-300 h-px flex-1" />
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
                  <MailIcon
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
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </div>
                )}
                {emailState.hasError && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <AlertCircleIcon className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircleIcon className="w-4 h-4" />
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
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircleIcon className="w-4 h-4" />
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
                "Entrar"
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
          <p className="text-gray-600 text-center my-5">
            Novo por aqui?{" "}
            <Link to="/auth/register">
              <button
                type="button"
                className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"
              >
                Criar conta gratuita
              </button>
            </Link>
          </p>
      </div>
    </div>
  );
}
