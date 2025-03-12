export {};

declare global {
  interface ILogin {
    username: string;
    password: string;
  }
  interface IRegister {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }
  interface IUser {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
  }
}
