export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginSuccess {
  accessToken: string;
  expiresIn: number;
}
