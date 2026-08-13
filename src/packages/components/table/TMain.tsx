import { useGridContext } from '@/packages/contexts/grid/useGridContext';
import React from 'react';
import TopToolbar from '../toolbar/top';
import TBody from './TBody';
import THeader from './THeader';

const TMain = () => {
  const { paneRef1, paneRef2 } = useGridContext();

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
        <THeader />
      </div>
      <div
        style={{
          width: '100%',
          height: '65vh',
          overflow: 'scroll',
        }}
        ref={paneRef2}
      >
        <TBody />
      </div>
    </React.Fragment>
  );
};

export default TMain;
