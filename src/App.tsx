import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { dummyVehicles, type Vehicle } from './data/dummyData';
import type { AppFeatures } from './packages/contexts/GridContext';
import { Grid } from './packages/core';

const App = () => {
  const columns = useMemo<ColumnDef<AppFeatures, Vehicle, unknown>[]>(
    () => [
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
          filterVariant: 'text',
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
        id: 'fleetGroup',
        accessorKey: 'fleetGroup',
        cell: (info) => info.getValue(),
        header: () => <div>Fleet Group</div>,
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

  return (
    <div className="bg-red-600">
      <Grid
        payload={{
          data: dummyVehicles,
          total: 99,
        }}
        columns={columns}
        key="dfdfd"
      />
    </div>
  );
};

export default App;
