'use client'

import { motion } from 'framer-motion'
import { DollarSign, CreditCard, Calendar, TrendingUp } from 'lucide-react'
import { LearnerExpense } from '@/lib/types/graphy'

interface ExpensesSummaryProps {
  expenses: LearnerExpense[]
  totalAmount: number
  isLoading?: boolean
}

export default function ExpensesSummary({ 
  expenses, 
  totalAmount, 
  isLoading = false 
}: ExpensesSummaryProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="h-4 w-48 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'success':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20'
      case 'pending':
      case 'initiated':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'failed':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20'
      case 'refund':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Expenses Summary</h2>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {(expenses?.length || 0) === 0 ? (
        <div className="text-center py-8">
          <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No expenses yet</h3>
          <p className="text-muted-foreground">
            Your purchase history will appear here once you enroll in courses.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(totalAmount)}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Transactions</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {expenses?.length || 0}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Avg. per Course</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(totalAmount / (expenses?.length || 1))}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            {(expenses || []).slice(0, 5).map((expense, index) => (
              <motion.div
                key={expense.id || expense._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-medium text-foreground">{expense.items?.[0]?.title || expense.description || 'Course Purchase'}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                      {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(expense.createdDate)}</span>
                    </div>
                    {expense.items?.[0]?.id && (
                      <span>Course: {expense.items[0].id}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(expense.TXNAMOUNT || expense.amount || 0, expense.currencyCode || 'INR')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {(expenses?.length || 0) > 5 && (
            <div className="text-center pt-4">
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View all {expenses?.length || 0} transactions
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
