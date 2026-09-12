import type { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from './components/ui/button';
import { dummyVehicles, type Vehicle } from './data/dummyData';
import { Grid } from './package/core';
import type { GridFeatures } from './package/features';
import { useGridState } from './package/hooks/useGridState';

const App = () => {
  'use no memo';
  const columns = useMemo<ColumnDef<GridFeatures, Vehicle, unknown>[]>(
    () => [
      {
        accessorFn: (_row, index) => index + 1,
        id: 'rowNumber',
        header: '#',
        cell: ({ row }) => {
          const pageIndex = state.pagination?.pageIndex ?? 0;
          const pageSize = state.pagination?.pageSize ?? 10;

          return pageIndex * pageSize + row.index + 1;
        },
        size: 36,
        maxSize: 36,
        enableColumnFilter: false,
        enableSorting: false,
        enableHiding: false,
        meta: {
          fixedSize: true,
        },
      },
      {
        id: 'actions',
        header: () => <div>Actions</div>,
        cell: () => <Button size="xs">Action</Button>,
        size: 74,
        maxSize: 74,
        enableColumnFilter: false,
        enableCellSelection: false,
        meta: {
          fixedSize: true,
        },
      },
      {
        id: 'id',
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: () => <div>ID</div>,
        meta: {
          filterVariant: 'text',
        },
        enableHiding: false,
      },
    ],
    [],
  );

  const { state, handlers } = useGridState();

  console.log(state);

  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefetch = useCallback(() => {
    setIsFetching(true);
    setTimeout(() => setIsFetching(false), 3000);
  }, []);
  return (
    <section className="space-y-10">
      <div
        style={{
          padding: '10px',
        }}
      >
        <Grid
          payload={{
            data: dummyVehicles,
            total: 40,
          }}
          columns={columns}
          name="Fleet"
          state={state}
          {...handlers}
          // manualFiltering
          // manualPagination
          // manualSorting={true}
          height="60vh"
          isLoading={isLoading}
          isFetching={isFetching}
          isError={false}
          refetch={handleRefetch}
          topRightSlot={
            <div>
              <Button>Custom Slot</Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default App;
