export type GetMetricsRequestDto = {
  names: string[];
  from: string;
  to: string;
  intervalUnit: number;
};
