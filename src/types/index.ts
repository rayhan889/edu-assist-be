export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface GoogleProfile {
  id: string;
  email: string;
  displayName: string;
  photos?: { value: string }[];
}

// Extend Express Request to include authenticated user
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
    }
  }
}
