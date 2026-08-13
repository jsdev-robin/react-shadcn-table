'use client';

import { GridContextProvider } from '../contexts/GridContext';
import type { GridProps } from '../types';

const Grid = <T,>({ payload }: GridProps<T>) => {
  'use no memo';
  return <GridContextProvider payload={payload}>d</GridContextProvider>;
};

export { Grid };
