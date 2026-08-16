'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useGrid } from '@/package/hooks/useGrid';
import { Expand, Shrink } from 'lucide-react';
import { useEffect, useState } from 'react';

const ToolbarRightSettings = () => {
  'use no memo';
  const { table, setIsSplit, gridWrapperRef, isFetching, refetch } = useGrid();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement === gridWrapperRef.current);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [gridWrapperRef]);

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all settings to default?',
    );
    if (!confirmed) return;
    table.resetColumnPinning();
    table.resetRowPinning();
    table.resetColumnVisibility();
    table.resetColumnOrder();
    table.resetColumnSizing();
    setIsSplit(false);
    window.alert('Settings have been reset to default.');
  };

  const handleToggleFullscreen = () => {
    if (!gridWrapperRef.current) return;
    if (!document.fullscreenElement) {
      gridWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBlock: '8px',
        gap: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '8px',
          paddingBottom: '8px',
          height: '36px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1
          style={{
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Settings
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingInline: '8px',
          flex: 1,
          gap: '8px',
        }}
      >
        <Button variant="outline" onClick={handleToggleFullscreen}>
          {isFullscreen ? <Shrink /> : <Expand />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
        <Button
          variant="outline"
          onClick={() => refetch?.()}
          disabled={isFetching}
        >
          {isFetching && <Spinner />}
          {isFetching ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default ToolbarRightSettings;
