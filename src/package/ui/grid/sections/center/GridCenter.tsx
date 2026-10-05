import { useGrid } from '@/package/hooks/useGrid';
import { useWheelPagination } from '@/package/hooks/useWheelPagination';
import React from 'react';
import GridCenterBody from './GridCenterBody';
import GridCenterHeader from './GridCenterHeader';

const GridCenter = () => {
  'use no memo';
  const {
    paneRef1,
    paneRef2,
    height,
    table,
    isLoading,
    isFetching,
    enableWheelPagination,
  } = useGrid();

  const { onWheel } = useWheelPagination({
    table,
    scrollRef: paneRef2,
    disabled: !enableWheelPagination || isLoading || isFetching,
  });

  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollbarColor: 'transparent transparent',
        }}
        ref={paneRef1}
      >
        <GridCenterHeader />
      </div>
      <div
        style={{
          width: '100%',
          overflow: 'scroll',
          height: height,
        }}
        ref={paneRef2}
        onWheel={onWheel}
      >
        <GridCenterBody />
      </div>
    </React.Fragment>
  );
};

export default GridCenter;
