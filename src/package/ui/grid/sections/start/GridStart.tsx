import { useGrid } from '@/package/hooks/useGrid';
import GridStartBody from './GridStartBody';
import GridStartHeader from './GridStartHeader';

const GridStart = () => {
  'use no memo';
  const { paneRef3, paneRef4, height, isError, isSplit, table } = useGrid();

  return (
    <>
      {!isError &&
      isSplit &&
      (table.state.columnPinning?.start?.length ?? 0) > 0 ? (
        <div
          style={{
            maxWidth: '220px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '64px',
            }}
          />
          <div
            style={{
              width: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollbarColor: 'transparent transparent',
            }}
            ref={paneRef3}
          >
            <GridStartHeader />
          </div>
          <div
            style={{
              width: '100%',
              overflow: 'scroll',
              height: height,
            }}
            ref={paneRef4}
          >
            <GridStartBody />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GridStart;
