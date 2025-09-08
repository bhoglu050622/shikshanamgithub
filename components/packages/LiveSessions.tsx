'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LiveSessionsProps, ClaimSeatButtonProps } from '@/lib/types/packages';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';

export function ClaimSeatButton({ 
  session, 
  packageSku, 
  onClaim, 
  disabled = false, 
  disabledReason 
}: ClaimSeatButtonProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const handleClaim = async () => {
    if (disabled || isClaiming) return;
    
    setIsClaiming(true);
    setClaimError(null);
    
    try {
      await onClaim(session.id);
      // Success feedback would be handled by parent component
    } catch (error: any) {
      setClaimError(error.message || 'Failed to claim seat');
    } finally {
      setIsClaiming(false);
    }
  };

  const isSeatsFull = session.seatRemaining === 0;
  const isDisabled = disabled || isSeatsFull || isClaiming;

  return (
    <div className="space-y-2">
      <Button
        size="sm"
        className={cn(
          "w-full",
          isSeatsFull 
            ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed" 
            : "bg-saffron-600 hover:bg-saffron-700 text-white"
        )}
        onClick={handleClaim}
        disabled={isDisabled}
        aria-label={
          isSeatsFull 
            ? "Seats full - join waitlist" 
            : `Claim seat for ${session.title}`
        }
      >
        {isClaiming ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Claiming...
          </>
        ) : isSeatsFull ? (
          'Seats Full'
        ) : (
          'Claim Seat'
        )}
      </Button>
      
      {isSeatsFull && (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-slate-300 text-slate-600 hover:bg-slate-50"
          onClick={() => {
            // Handle waitlist join
            console.log('Join waitlist for session:', session.id);
          }}
        >
          Join Waitlist
        </Button>
      )}
      
      {claimError && (
        <p className="text-xs text-red-600 text-center">{claimError}</p>
      )}
      
      {disabledReason && (
        <p className="text-xs text-amber-600 text-center">{disabledReason}</p>
      )}
    </div>
  );
}

export function LiveSessions({ 
  sessions, 
  packageSku, 
  onClaimSeat, 
  hasPrerequisites = false, 
  quizId 
}: LiveSessionsProps) {
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-saffron-600" />
            Live Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No upcoming live sessions scheduled</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-saffron-600" />
          Upcoming Live Sessions
        </CardTitle>
        <p className="text-sm text-slate-600">
          Limited to 108 seats per session — reserve early.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => {
            const isExpanded = expandedSession === session.id;
            const isSeatsFull = session.seatRemaining === 0;
            const isLowSeats = session.seatRemaining <= 10 && session.seatRemaining > 0;
            const sessionDate = new Date(session.date);
            const isUpcoming = sessionDate > new Date();

            return (
              <div 
                key={session.id} 
                className={cn(
                  "border rounded-lg p-4 transition-all",
                  isSeatsFull 
                    ? "border-slate-200 bg-slate-50" 
                    : "border-slate-200 hover:border-saffron-300 hover:shadow-sm"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-saffron-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-saffron-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{session.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {sessionDate.toLocaleDateString('en-IN', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {session.seatRemaining} of {session.maxSeats} seats
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Seat Status Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      {isSeatsFull ? (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Seats Full
                        </Badge>
                      ) : isLowSeats ? (
                        <Badge variant="destructive" className="text-xs bg-amber-500">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Only {session.seatRemaining} seats left
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Seats Available
                        </Badge>
                      )}
                      
                      {!isUpcoming && (
                        <Badge variant="outline" className="text-xs text-slate-500">
                          Past Session
                        </Badge>
                      )}
                    </div>

                    {/* Session Description */}
                    {session.description && (
                      <div className="mb-3">
                        <button
                          className="text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
                          onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                        >
                          {isExpanded ? 'Hide' : 'Show'} details
                          {isExpanded ? '▲' : '▼'}
                        </button>
                        {isExpanded && (
                          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                            {session.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Prerequisites Warning */}
                    {hasPrerequisites && (
                      <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="font-medium text-amber-800 mb-1">
                              Prerequisites Required
                            </p>
                            <p className="text-amber-700 mb-2">
                              You must complete the qualifying quiz before claiming a seat.
                            </p>
                            {quizId && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-amber-700 border-amber-300 hover:bg-amber-100"
                                onClick={() => window.open(`/quizzes/${quizId}`, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Take Qualifying Quiz
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Claim Button */}
                  <div className="ml-4">
                    {isUpcoming ? (
                      <ClaimSeatButton
                        session={session}
                        packageSku={packageSku}
                        onClaim={onClaimSeat}
                        disabled={hasPrerequisites}
                        disabledReason={hasPrerequisites ? "Complete prerequisites first" : undefined}
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-2">Session completed</p>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="text-slate-400 border-slate-300"
                        >
                          View Recording
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-blue-600">i</span>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Live Session Information</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Sessions are conducted via video conference</li>
                <li>• You'll receive meeting details 24 hours before the session</li>
                <li>• Recordings are available for 30 days after the session</li>
                <li>• Interactive Q&A and group discussions included</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
