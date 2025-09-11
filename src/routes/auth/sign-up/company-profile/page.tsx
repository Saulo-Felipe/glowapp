import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Building2, Clock, MapPin, Upload } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/auth/sign-up/company-profile/page')({
  component: RouteComponent,
})

const diasSemana = [
  { key: 'seg', label: 'Seg' },
  { key: 'ter', label: 'Ter' },
  { key: 'qua', label: 'Qua' },
  { key: 'qui', label: 'Qui' },
  { key: 'sex', label: 'Sex' },
  { key: 'sab', label: 'Sáb' },
  { key: 'dom', label: 'Dom' },
]

function RouteComponent() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    endereco: '',
    horarioInicio: '06:00',
    horarioFim: '17:00',
    diasFuncionamento: [] as string[],
  })
  const navigate = useNavigate()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleDia = (dia: string) => {
    setFormData((prev) => ({
      ...prev,
      diasFuncionamento: prev.diasFuncionamento.includes(dia)
        ? prev.diasFuncionamento.filter((d) => d !== dia)
        : [...prev.diasFuncionamento, dia],
    }))
  }

  const handleSubmit = () => {
    console.log('Dados do estabelecimento:', formData)
    navigate({ to: '/auth/sign-up/categories/page' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Perfil do Estabelecimento</h1>
            <p className="text-sm text-gray-600">Configure o perfil do seu estabelecimento</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 pb-8">
        <div className="mx-auto max-w-md space-y-6">
          {/* Logo Upload */}
          <Card className="border-2 border-dashed border-gray-200 bg-white shadow-sm transition-colors hover:border-purple-300">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Adicionar logo</p>
                  <p className="mt-1 text-sm text-gray-500">Toque para selecionar uma imagem</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Nome do Estabelecimento */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-medium text-gray-700">
                Nome do estabelecimento
              </Label>
              <Input
                id="nome"
                placeholder="Digite o nome do seu salão"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="border-gray-200 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="font-medium text-gray-700">
                Descrição do estabelecimento
                <span className="font-normal text-gray-400"> (Opcional)</span>
              </Label>
              <Textarea
                id="descricao"
                placeholder="Descreva seu salão e especialidades"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                className="min-h-[80px] border-gray-200 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>

            {/* Endereço */}
            <div className="space-y-2">
              <Label
                htmlFor="endereco"
                className="flex items-center gap-2 font-medium text-gray-700"
              >
                <MapPin className="h-4 w-4" />
                Endereço
              </Label>
              <Input
                id="endereco"
                placeholder="Digite o endereço completo"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                className="border-gray-200 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>

            {/* Horário de Funcionamento */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 font-medium text-gray-700">
                <Clock className="h-4 w-4" />
                Horário de Funcionamento
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Início</Label>
                  <Input
                    type="time"
                    value={formData.horarioInicio}
                    onChange={(e) => handleInputChange('horarioInicio', e.target.value)}
                    className="border-gray-200 bg-white shadow-sm focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Fim</Label>
                  <Input
                    type="time"
                    value={formData.horarioFim}
                    onChange={(e) => handleInputChange('horarioFim', e.target.value)}
                    className="border-gray-200 bg-white shadow-sm focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Dias de Funcionamento */}
            <div className="space-y-3">
              <Label className="font-medium text-gray-700">Dias de Funcionamento</Label>
              <div className="grid grid-cols-7 gap-2">
                {diasSemana.map((dia) => (
                  <Button
                    key={dia.key}
                    variant={formData.diasFuncionamento.includes(dia.key) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDia(dia.key)}
                    className={`h-10 text-xs font-medium transition-all duration-200 ${
                      formData.diasFuncionamento.includes(dia.key)
                        ? 'border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:from-purple-600 hover:to-pink-600'
                        : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    {dia.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleSubmit}
            className="mt-8 h-12 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
