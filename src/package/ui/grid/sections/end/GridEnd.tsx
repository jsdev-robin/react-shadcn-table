import { useGrid } from '@/package/hooks/useGrid';
import GridEndBody from './GridEndBody';
import GridEndHeader from './GridEndHeader';

const GridEnd = () => {
  'use no memo';
  const { paneRef5, paneRef6, height, isError, isSplit, table } = useGrid();

  return (
    <>
      {!isError &&
      isSplit &&
      (table.state.columnPinning?.end?.length ?? 0) > 0 ? (
        <div
          style={{
            maxWidth: '220px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '64px',
              borderBottom: '1px solid var(--border)',
            }}
          />
          <div
            style={{
              width: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollbarColor: 'transparent transparent',
            }}
            ref={paneRef5}
          >
            <GridEndHeader />
          </div>
          <div
            style={{
              width: '100%',
              overflow: 'scroll',
              height: height,
            }}
            ref={paneRef6}
          >
            <GridEndBody />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GridEnd;
