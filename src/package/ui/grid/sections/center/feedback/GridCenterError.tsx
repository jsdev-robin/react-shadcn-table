'use client';
import GridCenterErrorMessage from './GridCenterErrorMessage';

const GridCenterError = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <GridCenterErrorMessage />
    </div>
  );
};
export default GridCenterError;
