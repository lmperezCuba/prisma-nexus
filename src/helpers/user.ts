export function extractUser(req: any): IUser {
    const user = req.get("user")
    if (user) {
     const reqUser: IUser = {role: 'admin'}
     return reqUser
    }
    return {role: 'invalid'}
  }
  
  export interface IUser {
    role?: string
  }
