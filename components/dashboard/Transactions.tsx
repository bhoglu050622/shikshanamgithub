/**
 * Transactions Component
 * Displays recent transactions and payment history
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Clock, 
  XCircle, 
  RefreshCw,
  Receipt
} from 'lucide-react';
import type { GraphyTransaction } from '@/lib/api/graphy-client';

interface TransactionsProps {
  transactions: GraphyTransaction[];
}

export function Transactions({ transactions }: TransactionsProps) {
  const getStatusIcon = (status: GraphyTransaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: GraphyTransaction['status']): string => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'refunded':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  const getStatusText = (status: GraphyTransaction['status']): string => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      case 'refunded':
        return 'Refunded';
      default:
        return 'Unknown';
    }
  };

  const formatAmount = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (transactions.length === 0) {
    return (
      <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CreditCard className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No transactions yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Your transaction history will appear here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="p-6">
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(transaction.status)}`}>
                  {getStatusIcon(transaction.status)}
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      Course Purchase
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(transaction.status)}`}
                    >
                      {getStatusText(transaction.status)}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    <div className="flex items-center space-x-4">
                      <span>{formatDate(transaction.createdAt)}</span>
                      <span>{formatTime(transaction.createdAt)}</span>
                      <span>{transaction.paymentMethod}</span>
                    </div>
                  </div>

                  {transaction.refundedAt && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Refunded on {formatDate(transaction.refundedAt)}
                      {transaction.refundAmount && (
                        <span> - {formatAmount(transaction.refundAmount, transaction.currency)}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount and Actions */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </div>
                  {transaction.status === 'refunded' && transaction.refundAmount && (
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      Refund: {formatAmount(transaction.refundAmount, transaction.currency)}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  {transaction.status === 'completed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        // Handle receipt download
                        console.log('Download receipt for transaction:', transaction.id);
                      }}
                    >
                      <Receipt className="h-3 w-3" />
                    </Button>
                  )}
                  
                  {transaction.status === 'completed' && !transaction.refundedAt && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        // Handle certificate download
                        console.log('Download certificate for transaction:', transaction.id);
                      }}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Transactions */}
        {transactions.length > 5 && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button 
              variant="outline" 
              className="w-full text-sm"
              onClick={() => {
                // Handle view all transactions
                console.log('View all transactions');
              }}
            >
              View All {transactions.length} Transactions
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
