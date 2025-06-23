export interface AuthRequest extends Request {
  auth: () => { userId: string };
}
