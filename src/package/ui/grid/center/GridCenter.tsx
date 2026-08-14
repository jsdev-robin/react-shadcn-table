import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import TopToolbar from '../../toolbar/top';
import GridCenterBody from './GridCenterBody';
import GridCenterHeader from './GridCenterHeader';

const GridCenter = () => {
  const { paneRef1, paneRef2, height } = useGrid();

  return (
    <React.Fragment>
      <TopToolbar />
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
      >
        <GridCenterBody />
      </div>
    </React.Fragment>
  );
};

export default GridCenter;
