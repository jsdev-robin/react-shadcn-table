import { Input } from '@/components/ui/input';
import type { GridFeatures } from '@/package/features';
import type { Header, RowData } from '@tanstack/react-table';

const HeaderFilter = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  return (
    <div
      style={{
        padding: '4px',
        width: '100%',
        borderTop: '1px solid var(--border)',
      }}
    >
      <Input className="h-7" />
    </div>
  );
};

export default HeaderFilter;
