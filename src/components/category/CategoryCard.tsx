'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Category } from '@/lib/data/mock'

type CategoryCardProps = {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/categories/${category.slug}`} className="block">
        <div className="rounded-xl border border-border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{category.emoji}</span>
            <div className="flex-1">
              <h3 className="mb-1 text-xl font-bold text-primary">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
