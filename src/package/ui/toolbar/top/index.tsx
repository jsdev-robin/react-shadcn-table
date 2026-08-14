import { Input } from '@/components/ui/input';

const TopToolbar = () => {
  return (
    <div
      style={{
        paddingInline: '16px',
        height: '64px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Input
        style={{
          width: '260px',
        }}
        placeholder="Search by query"
      />
    </div>
  );
};

export default TopToolbar;
