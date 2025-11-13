'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/common/Header'
import { CategoryCard } from '@/components/category/CategoryCard'
import { categories } from '@/lib/data/mock'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* ロゴとメインメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
            senjin
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            あなたの悩みを
            <br className="md:hidden" />
            選んでください
          </p>
        </motion.div>

        {/* カテゴリーカード */}
        <div className="mx-auto max-w-md space-y-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
