export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type Optional<T> = T | null | undefined;
export type Id = number;

export interface Option {
  label: string;
  id: Id;
}

export interface inputOption {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}
