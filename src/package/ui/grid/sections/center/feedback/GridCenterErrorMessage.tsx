'use client';
import { Button } from '@/components/ui/button';
import { ServerOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const GridCenterErrorMessage = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  const reload = () => {
    if (isOnline) window.location.reload();
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ServerOff
        size={52}
        style={{ color: 'var(--red-500, #ef4444)', marginBottom: '24px' }}
      />
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--red-600, #dc2626)',
          marginBottom: '12px',
        }}
      >
        Failed to Load Data
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--muted-foreground)',
          marginBottom: '24px',
          textAlign: 'center',
          maxWidth: '448px',
        }}
      >
        {isOnline
          ? 'Something went wrong. Please try refreshing the page.'
          : "You're currently offline. Please check your internet connection."}
      </p>
      <Button onClick={reload} variant="outline" disabled={!isOnline}>
        {isOnline ? 'Refresh Page' : 'No Connection'}
      </Button>
    </div>
  );
};

export default GridCenterErrorMessage;
