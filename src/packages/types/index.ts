export interface GridProps<T> {
  payload?: {
    data: T[];
    total: number;
  };
}
