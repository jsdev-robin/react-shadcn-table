import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
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
      },
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={(checked) =>
              table.toggleAllPageRowsSelected(checked === true)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={(checked) => row.toggleSelected(checked === true)}
            aria-label="Select row"
          />
        ),
        size: 48,
        maxSize: 48,
        enableColumnFilter: false,
        enableSorting: false,
        enableCellSelection: false,
      },
      {
        id: 'pin',
        accessorKey: 'pin',
        header: () => 'Pin',
        size: 100,
        maxSize: 100,
        enableColumnFilter: false,
        enableCellSelection: false,
        cell: ({ row }) =>
          row.getIsPinned() ? (
            <button onClick={() => row.pin(false)}>❌</button>
          ) : (
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => row.pin('top')}>⬆️</button>
              <button onClick={() => row.pin('bottom')}>⬇️</button>
            </div>
          ),
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
      {
        id: 'fleetGroup',
        accessorKey: 'fleetGroup',
        cell: (info) => info.getValue(),
        header: () => <div>Fleet Group</div>,
        meta: {
          filterVariant: 'text',
        },
        // spanRows: true,
      },
      {
        id: 'driver',
        accessorKey: 'driver',
        cell: (info) => info.getValue(),
        header: () => <div>Driver</div>,
        meta: {
          filterVariant: 'select',
        },
      },
      {
        id: 'vehicle',
        accessorKey: 'vehicle',
        cell: (info) => info.getValue(),
        header: () => <div>Vehicle</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'vin',
        accessorKey: 'vin',
        cell: (info) => info.getValue(),
        header: () => <div>VIN</div>,
        meta: {
          filterVariant: 'range',
        },
      },
      {
        id: 'type',
        accessorKey: 'type',
        cell: (info) => info.getValue(),
        header: () => <div>Type</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'status',
        accessorKey: 'status',
        cell: (info) => info.getValue(),
        header: () => <div>Status</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'currentMeter',
        accessorKey: 'currentMeter',
        cell: (info) => info.getValue(),
        header: () => <div>Current Meter</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'fuel',
        accessorKey: 'fuel',
        cell: (info) => info.getValue(),
        header: () => <div>Fuel</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'drivingTime',
        accessorKey: 'drivingTime',
        cell: (info) => info.getValue(),
        header: () => <div>Driving Time</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'license',
        accessorKey: 'license',
        cell: (info) => info.getValue(),
        header: () => <div>License</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'odometer',
        accessorKey: 'odometer',
        cell: (info) => info.getValue(),
        header: () => <div>Odometer</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'year',
        accessorKey: 'year',
        cell: (info) => info.getValue(),
        header: () => <div>Year</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'make',
        accessorKey: 'make',
        cell: (info) => info.getValue(),
        header: () => <div>Make</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'model',
        accessorKey: 'model',
        cell: (info) => info.getValue(),
        header: () => <div>Model</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'color',
        accessorKey: 'color',
        cell: (info) => info.getValue(),
        header: () => <div>Color</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'assignedDate',
        accessorKey: 'assignedDate',
        cell: (info) => info.getValue(),
        header: () => <div>Assigned Date</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'lastMaintenanceDate',
        accessorKey: 'lastMaintenanceDate',
        cell: (info) => info.getValue(),
        header: () => <div>Last Maintenance</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'nextMaintenanceDate',
        accessorKey: 'nextMaintenanceDate',
        cell: (info) => info.getValue(),
        header: () => <div>Next Maintenance</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'insuranceProvider',
        accessorKey: 'insuranceProvider',
        cell: (info) => info.getValue(),
        header: () => <div>Insurance Provider</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'insurancePolicyNumber',
        accessorKey: 'insurancePolicyNumber',
        cell: (info) => info.getValue(),
        header: () => <div>Policy Number</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'registrationExpiry',
        accessorKey: 'registrationExpiry',
        cell: (info) => info.getValue(),
        header: () => <div>Registration Expiry</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'fuelType',
        accessorKey: 'fuelType',
        cell: (info) => info.getValue(),
        header: () => <div>Fuel Type</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'transmission',
        accessorKey: 'transmission',
        cell: (info) => info.getValue(),
        header: () => <div>Transmission</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'engineCapacity',
        accessorKey: 'engineCapacity',
        cell: (info) => info.getValue(),
        header: () => <div>Engine Capacity</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'seatingCapacity',
        accessorKey: 'seatingCapacity',
        cell: (info) => info.getValue(),
        header: () => <div>Seating Capacity</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'cargoCapacity',
        accessorKey: 'cargoCapacity',
        cell: (info) => info.getValue(),
        header: () => <div>Cargo Capacity</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'gpsTrackingId',
        accessorKey: 'gpsTrackingId',
        cell: (info) => info.getValue(),
        header: () => <div>GPS ID</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'costPerMile',
        accessorKey: 'costPerMile',
        cell: (info) => info.getValue(),
        header: () => <div>Cost Per Mile</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'totalMiles',
        accessorKey: 'totalMiles',
        cell: (info) => info.getValue(),
        header: () => <div>Total Miles</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'notes',
        accessorKey: 'notes',
        cell: (info) => info.getValue(),
        header: () => <div>Notes</div>,
        meta: {
          filterVariant: 'text',
        },
      },
    ],
    [],
  );

  const { state, handlers } = useGridState();

  console.log(state);

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
          isLoading={false}
          isError={false}
          topRightSlot={
            <div>
              <Button>Add</Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default App;
