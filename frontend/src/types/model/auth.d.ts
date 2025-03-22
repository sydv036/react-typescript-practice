export {};

declare global {
  interface ILogin {
    username: string;
    password: string;
  }
  interface IResLogin<T> {
    access_token: string;
    user: T;
  }
}
