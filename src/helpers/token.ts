export interface Token {
    sub?: string;
    iss?: string;
    aud?: string;
    exp?: number;
    iat?: number;
    name?: string;
    admin?: boolean;
  }
  /*
  export function extractToken(req: any) {
    const Authorization = req.get("Authorization");
    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");
      return verify(token, process.env.TOKEN_SECRET || "") as Token;
    }
  }*/