'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/common/Header'
import { CategoryCard } from '@/components/category/CategoryCard'
import { categories } from '@/lib/data/mock'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="section-spacing">
        {/* ヒーローセクション */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="content-spacing container mx-auto max-w-4xl px-6 text-center"
        >
          <h1 className="text-hero mb-8 text-balance">
            先人から後輩へ、
            <br />
            生のアドバイスを贈る
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            人生の先輩が経験した悩みと、その乗り越え方。
            <br className="hidden md:block" />
            あなたと同じ道を歩んだ誰かの、本音の声を。
          </p>
        </motion.div>

        {/* セクション区切り */}
        <div className="container mx-auto mb-16 mt-24 max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
          />
        </div>

        {/* カテゴリーセクション */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="container mx-auto max-w-2xl px-6"
        >
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight md:text-3xl">
            あなたの悩みを選んでください
          </h2>
          <div className="space-y-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <CategoryCard category={category} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
