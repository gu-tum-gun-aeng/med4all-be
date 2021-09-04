interface AppError {
  id: number;
  message: string;
}

interface ErrorGroup {
  [id: string]: AppError;
}
