import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRightIcon, TagIcon } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/auth/sign-up/categories/page')({
  component: RouteComponent,
})

interface Category {
  id: string
  name: string
  icon: string
  emoji: string
}

function RouteComponent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories: Category[] = [
    {
      id: 'maquiagem',
      name: 'Maquiagem',
      icon: '💄',
      emoji: '💄',
    },
    {
      id: 'cabelo',
      name: 'Cabelo',
      icon: '👩‍🦱',
      emoji: '👩‍🦱',
    },
    {
      id: 'unhas',
      name: 'Unhas',
      icon: '💅',
      emoji: '💅',
    },
    {
      id: 'massagem',
      name: 'Massagem',
      icon: '💆‍♀️',
      emoji: '💆‍♀️',
    },
    {
      id: 'sobrancelha',
      name: 'Sobrancelha',
      icon: '🤨',
      emoji: '🤨',
    },
    {
      id: 'depilacao',
      name: 'Depilação',
      icon: '🪒',
      emoji: '🪒',
    },
  ]

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleContinue = () => {
    console.log('Categorias selecionadas:', selectedCategories)
    // Aqui você implementaria a navegação para a próxima tela
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
            <TagIcon className="h-5 w-5 text-white" />
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
        <div className="mx-auto max-w-md">
          {/* Categories Grid */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCategories.includes(category.id)
                    ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md ring-2 ring-purple-500'
                    : 'border-gray-200 bg-white shadow-sm hover:border-gray-300'
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <CardContent className="flex flex-col items-center space-y-3 p-6 text-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl transition-all duration-200 ${
                      selectedCategories.includes(category.id)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gray-100'
                    }`}
                  >
                    {selectedCategories.includes(category.id) ? (
                      <span className="text-3xl text-white drop-shadow-sm filter">
                        {category.emoji}
                      </span>
                    ) : (
                      <span className="text-2xl opacity-70">{category.emoji}</span>
                    )}
                  </div>
                  <p
                    className={`font-semibold transition-colors ${
                      selectedCategories.includes(category.id) ? 'text-purple-700' : 'text-gray-900'
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
            className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500 disabled:shadow-sm"
          >
            Continuar
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>

          {/* Selected Counter */}
          {selectedCategories.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {selectedCategories.length} categoria
                {selectedCategories.length > 1 ? 's' : ''} selecionada
                {selectedCategories.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
