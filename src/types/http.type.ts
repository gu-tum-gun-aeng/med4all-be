export interface HttpRequestTracing {
  userAgent: string;
  target: string;
  clientIp: string;
  host: string;
  route: string;
  scheme: string;
}
