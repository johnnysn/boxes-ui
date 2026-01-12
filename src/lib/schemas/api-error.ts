export interface ApiErrorDTO {
  message: string;
  timestamp: string;
  status: number;
  error: string;
  fieldErrors?: Record<string, string>;
}
