'use client';

import { columnSizingFeature, tableFeatures } from '@tanstack/react-table';

export const features = tableFeatures({
  columnSizingFeature,
});
export type AppFeatures = typeof features;
