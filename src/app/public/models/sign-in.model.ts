export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  email: string;
  id: string;
  accessToken: string;
}
