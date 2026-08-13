import TBody from './TBody';
import THeader from './THeader';

const TMain = () => {
  return (
    <div>
      <div
        style={{
          width: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollbarColor: 'transparent transparent',
        }}
      >
        <THeader />
      </div>
      <div
        style={{
          width: '100%',
          height: '65vh',
        }}
      >
        <TBody />
      </div>
    </div>
  );
};

export default TMain;
