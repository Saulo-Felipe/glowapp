import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, Upload, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register-step-1")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    endereco: "",
    horarioInicio: "06:00",
    horarioFim: "17:00",
    diasFuncionamento: [] as string[],
  });

  const diasSemana = [
    { key: "seg", label: "Seg" },
    { key: "ter", label: "Ter" },
    { key: "qua", label: "Qua" },
    { key: "qui", label: "Qui" },
    { key: "sex", label: "Sex" },
    { key: "sab", label: "Sáb" },
    { key: "dom", label: "Dom" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDia = (dia: string) => {
    setFormData((prev) => ({
      ...prev,
      diasFuncionamento: prev.diasFuncionamento.includes(dia)
        ? prev.diasFuncionamento.filter((d) => d !== dia)
        : [...prev.diasFuncionamento, dia],
    }));
  };

  const handleSubmit = () => {
    console.log("Dados do estabelecimento:", formData);
    // Aqui você implementaria a lógica de envio
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Perfil do Estabelecimento
            </h1>
            <p className="text-sm text-gray-600">
              Configure o perfil do seu estabelecimento
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Logo Upload */}
          <Card className="border-2 border-dashed border-gray-200 bg-white hover:border-purple-300 transition-colors shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Adicionar logo</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Toque para selecionar uma imagem
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Nome do Estabelecimento */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-gray-700 font-medium">
                Nome do estabelecimento
              </Label>
              <Input
                id="nome"
                placeholder="Digite o nome do seu salão"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 shadow-sm"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-gray-700 font-medium">
                Descrição do estabelecimento
                <span className="text-gray-400 font-normal"> (Opcional)</span>
              </Label>
              <Textarea
                id="descricao"
                placeholder="Descreva seu salão e especialidades"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 min-h-[80px] shadow-sm"
              />
            </div>

            {/* Endereço */}
            <div className="space-y-2">
              <Label
                htmlFor="endereco"
                className="text-gray-700 font-medium flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Endereço
              </Label>
              <Input
                id="endereco"
                placeholder="Digite o endereço completo"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 shadow-sm"
              />
            </div>

            {/* Horário de Funcionamento */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horário de Funcionamento
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Início</Label>
                  <Input
                    type="time"
                    value={formData.horarioInicio}
                    onChange={(e) =>
                      handleInputChange("horarioInicio", e.target.value)
                    }
                    className="bg-white border-gray-200 focus:border-purple-500 shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Fim</Label>
                  <Input
                    type="time"
                    value={formData.horarioFim}
                    onChange={(e) =>
                      handleInputChange("horarioFim", e.target.value)
                    }
                    className="bg-white border-gray-200 focus:border-purple-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Dias de Funcionamento */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">
                Dias de Funcionamento
              </Label>
              <div className="grid grid-cols-7 gap-2">
                {diasSemana.map((dia) => (
                  <Button
                    key={dia.key}
                    variant={
                      formData.diasFuncionamento.includes(dia.key)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => toggleDia(dia.key)}
                    className={`h-10 text-xs font-medium transition-all duration-200 ${
                      formData.diasFuncionamento.includes(dia.key)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-md"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md"
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
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-8"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
