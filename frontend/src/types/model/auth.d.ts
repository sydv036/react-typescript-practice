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
  interface IRegister {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }
}
