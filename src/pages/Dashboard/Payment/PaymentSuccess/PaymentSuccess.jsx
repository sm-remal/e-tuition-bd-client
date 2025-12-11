import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get('success');
  const txn = searchParams.get('txn');

  useEffect(() => {
    if (success !== 'true') {
      navigate('/dashboard/apply-tutors');
    }
  }, [success, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="card bg-base-100 shadow-2xl p-10 text-center max-w-md animate-[fadeIn_0.5s_ease-in]">
        
        {/* Success Icon with Animation */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-[bounce_1s_ease-in-out_2]">
            <svg 
              className="w-12 h-12 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your tutor has been approved successfully. The payment has been processed and other pending applications have been rejected.
        </p>

        {/* Transaction Details */}
        {txn && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-gray-700 break-all">{txn}</p>
          </div>
        )}

        {/* Checkmarks */}
        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center gap-3 text-green-600">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">Payment processed successfully</span>
          </div>
          <div className="flex items-center gap-3 text-green-600">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">Tutor application approved</span>
          </div>
          <div className="flex items-center gap-3 text-green-600">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">Other applications rejected</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/dashboard/apply-tutors')}
            className="btn btn-success text-white w-full"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Applications
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/my-tuitions')}
            className="btn btn-outline btn-success w-full"
          >
            View My Tuitions
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            You can now start coordinating with your approved tutor. Check your email for payment receipt.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;