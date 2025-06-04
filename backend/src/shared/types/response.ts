export interface SuccessResponse<T> {
  status: "success";
  processedTime: number
  data: T;
}

export interface ErrorResponse {
  status: "failure";
  message: string;
  stack?: string;
  details?: any;
  code?: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;