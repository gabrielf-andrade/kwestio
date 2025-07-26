export interface BetterAuthActionError {
  code?: string | undefined;
  message?: string | undefined;
  status: number;
  statusText: string;
}
