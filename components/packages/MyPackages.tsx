'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MyPackagesProps, UserPackage } from '@/lib/types/packages';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  Award, 
  Download, 
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';

export function MyPackages({ 
  packages, 
  onDownloadCertificate, 
  onBookMentor, 
  onManageSeat, 
  onCompleteCapstone 
}: MyPackagesProps) {
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null);

  const handleDownloadCertificate = async (sku: string) => {
    setDownloadingCert(sku);
    try {
      await onDownloadCertificate(sku);
    } catch (error) {
      console.error('Failed to download certificate:', error);
    } finally {
      setDownloadingCert(null);
    }
  };

  const getStatusColor = (status: UserPackage['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'revoked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: UserPackage['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'revoked':
        return <AlertTriangle className="h-4 w-4" />;
      case 'expired':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatAccessExpiry = (expiresAt?: string) => {
    if (!expiresAt) return 'Lifetime access';
    
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft === 1) return 'Expires tomorrow';
    if (daysLeft <= 7) return `Expires in ${daysLeft} days`;
    
    return `Expires ${expiryDate.toLocaleDateString('en-IN')}`;
  };

  if (packages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-saffron-600" />
            My Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No packages yet</h3>
            <p className="text-slate-500 mb-6">
              Purchase your first package to start your learning journey
            </p>
            <Button 
              className="bg-saffron-600 hover:bg-saffron-700 text-white"
              onClick={() => window.location.href = '/packages'}
            >
              Browse Packages
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-saffron-600" />
          My Packages ({packages.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div 
              key={pkg.sku} 
              className={cn(
                "border rounded-lg p-6 transition-all",
                pkg.status === 'active' 
                  ? "border-slate-200 hover:border-saffron-300 hover:shadow-sm" 
                  : "border-slate-200 bg-slate-50 opacity-75"
              )}
            >
              {/* Package Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{pkg.name}</h3>
                    <Badge className={getStatusColor(pkg.status)}>
                      {getStatusIcon(pkg.status)}
                      <span className="ml-1 capitalize">{pkg.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {formatAccessExpiry(pkg.accessExpiresAt)}
                  </p>
                </div>
                
                {pkg.status === 'revoked' && (
                  <div className="text-right">
                    <p className="text-xs text-red-600 font-medium">Access revoked</p>
                    <p className="text-xs text-red-500">Contact support</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm text-slate-500">{pkg.progress}% complete</span>
                </div>
                <Progress value={pkg.progress} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">
                  {pkg.includedCourses.length} courses included
                </p>
              </div>

              {/* Package Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Next Live Session */}
                {pkg.nextLiveSession && pkg.status === 'active' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Next Session</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-2">{pkg.nextLiveSession.title}</p>
                    <p className="text-xs text-blue-600 mb-2">
                      {new Date(pkg.nextLiveSession.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-blue-600 border-blue-300 hover:bg-blue-100"
                      onClick={() => onManageSeat(pkg.sku, pkg.nextLiveSession!.id)}
                    >
                      Manage Seat
                    </Button>
                  </div>
                )}

                {/* Mentor Hours */}
                {pkg.availableMentorHours > 0 && pkg.status === 'active' && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Mentor Hours</span>
                    </div>
                    <p className="text-xs text-purple-700 mb-2">
                      {pkg.availableMentorHours} hours available
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-purple-600 border-purple-300 hover:bg-purple-100"
                      onClick={() => onBookMentor(pkg.sku)}
                    >
                      Book Mentor
                    </Button>
                  </div>
                )}

                {/* Certificate */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">Certificate</span>
                  </div>
                  {pkg.certificateStatus === 'issued' ? (
                    <>
                      <p className="text-xs text-emerald-700 mb-2">Ready for download</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-emerald-600 border-emerald-300 hover:bg-emerald-100"
                        onClick={() => handleDownloadCertificate(pkg.sku)}
                        disabled={downloadingCert === pkg.sku}
                      >
                        {downloadingCert === pkg.sku ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </>
                        )}
                      </Button>
                    </>
                  ) : pkg.certificateStatus === 'pending' ? (
                    <>
                      <p className="text-xs text-amber-700 mb-2">Complete capstone to earn</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-amber-600 border-amber-300 hover:bg-amber-100"
                        onClick={() => onCompleteCapstone(pkg.sku)}
                      >
                        Complete Capstone
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-slate-600 mb-2">Not available</p>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="w-full text-slate-400 border-slate-300"
                      >
                        Not Available
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Course List */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Included Courses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.includedCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-saffron-600">✓</span>
                        </div>
                        <span className="text-sm text-slate-700">{course.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-saffron-600 hover:text-saffron-700 p-1"
                        onClick={() => window.open(course.link, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
