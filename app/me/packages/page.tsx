'use client';

import React from 'react';
import { MyPackages } from '@/components/packages/MyPackages';
import { useUserPackages } from '@/lib/hooks/usePackages';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyPackagesPage() {
  // In a real app, you'd get the user ID from auth context
  const userId = 'current-user-id'; // This would come from your auth system
  
  const { packages, loading, error } = useUserPackages(userId);

  const handleDownloadCertificate = async (sku: string) => {
    try {
      // This would make an API call to download the certificate
      const response = await fetch(`/api/user/${userId}/packages/${sku}/certificate`);
      
      if (!response.ok) {
        throw new Error('Failed to download certificate');
      }
      
      // Create a blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${sku}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show success toast
      console.log('Certificate downloaded successfully');
    } catch (error) {
      console.error('Failed to download certificate:', error);
      // Show error toast
    }
  };

  const handleBookMentor = (sku: string) => {
    // Navigate to mentor booking page or open booking modal
    console.log('Book mentor for package:', sku);
    // This would open a mentor booking interface
  };

  const handleManageSeat = (sku: string, sessionId: string) => {
    // Navigate to seat management page or open management modal
    console.log('Manage seat for package:', sku, 'session:', sessionId);
    // This would open a seat management interface
  };

  const handleCompleteCapstone = (sku: string) => {
    // Navigate to capstone completion page
    console.log('Complete capstone for package:', sku);
    // This would navigate to the capstone project page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-saffron-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-parchment-ivory flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-600 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-semibold">Failed to load packages</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">My Learning Packages</h1>
              <p className="text-slate-600 mt-2">
                Manage your purchased packages, track progress, and access your resources
              </p>
            </div>
            <Button 
              className="bg-saffron-600 hover:bg-saffron-700 text-white"
              onClick={() => window.location.href = '/packages'}
            >
              Browse More Packages
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Packages List */}
          <div className="lg:col-span-3">
            <MyPackages
              packages={packages}
              onDownloadCertificate={handleDownloadCertificate}
              onBookMentor={handleBookMentor}
              onManageSeat={handleManageSeat}
              onCompleteCapstone={handleCompleteCapstone}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Packages</span>
                  <span className="font-semibold text-slate-800">{packages.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Packages</span>
                  <span className="font-semibold text-emerald-600">
                    {packages.filter(p => p.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Certificates Earned</span>
                  <span className="font-semibold text-saffron-600">
                    {packages.filter(p => p.certificateStatus === 'issued').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Average Progress</span>
                  <span className="font-semibold text-blue-600">
                    {packages.length > 0 
                      ? Math.round(packages.reduce((sum, p) => sum + p.progress, 0) / packages.length)
                      : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/packages'}
                >
                  Browse Packages
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/courses'}
                >
                  View All Courses
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/support'}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Having trouble with your packages or need assistance?
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/support'}
                >
                  Get Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
