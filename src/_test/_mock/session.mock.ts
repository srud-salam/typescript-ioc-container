export interface IUserSession {
  userId: number;
  sessionId: number;
  expiresAt: Date;
  createdAt: Date;
  updateAt: Date;
}

export class UserSession implements IUserSession {
  constructor(
    public userId: number,
    public sessionId: number,
    public expiresAt: Date,
    public createdAt: Date,
    public updateAt: Date
  ) {}
}
