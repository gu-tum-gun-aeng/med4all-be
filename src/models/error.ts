export interface AppError {
  id: number;
  message: string;
}

export interface ErrorGroup {
  [id: string]: AppError;
}
