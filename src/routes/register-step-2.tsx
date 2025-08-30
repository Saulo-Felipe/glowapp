import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, TagIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register-step-2")({
  component: RouteComponent,
});

interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
}

function RouteComponent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: Category[] = [
    {
      id: "maquiagem",
      name: "Maquiagem",
      icon: "💄",
      emoji: "💄",
    },
    {
      id: "cabelo",
      name: "Cabelo",
      icon: "👩‍🦱",
      emoji: "👩‍🦱",
    },
    {
      id: "unhas",
      name: "Unhas",
      icon: "💅",
      emoji: "💅",
    },
    {
      id: "massagem",
      name: "Massagem",
      icon: "💆‍♀️",
      emoji: "💆‍♀️",
    },
    {
      id: "sobrancelha",
      name: "Sobrancelha",
      icon: "🤨",
      emoji: "🤨",
    },
    {
      id: "depilacao",
      name: "Depilação",
      icon: "🪒",
      emoji: "🪒",
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    console.log("Categorias selecionadas:", selectedCategories);
    // Aqui você implementaria a navegação para a próxima tela
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <TagIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Categorias</h1>
            <p className="text-sm text-gray-600">
              Selecione as categorias que representam seu negócio
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCategories.includes(category.id)
                    ? "ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md"
                    : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
                      selectedCategories.includes(category.id)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gray-100"
                    }`}
                  >
                    {selectedCategories.includes(category.id) ? (
                      <span className="text-white text-3xl filter drop-shadow-sm">
                        {category.emoji}
                      </span>
                    ) : (
                      <span className="text-2xl opacity-70">
                        {category.emoji}
                      </span>
                    )}
                  </div>
                  <p
                    className={`font-semibold transition-colors ${
                      selectedCategories.includes(category.id)
                        ? "text-purple-700"
                        : "text-gray-900"
                    }`}
                  >
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={selectedCategories.length === 0}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-sm transition-all duration-200"
          >
            Continuar
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>

          {/* Selected Counter */}
          {selectedCategories.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {selectedCategories.length} categoria
                {selectedCategories.length > 1 ? "s" : ""} selecionada
                {selectedCategories.length > 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
