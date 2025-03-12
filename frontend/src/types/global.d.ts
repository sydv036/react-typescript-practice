export {};

declare global {
  interface IProps {
    children: React.ReactNode;
  }
  interface IBackendRes<T> {
    error?: string | string[];
    message?: string;
    statusCode: number | string;
    data?: T;
  }
  interface IResRegister {
    _id: string;
    email: string;
    fullName: string;
  }
  interface IResLogin {
    access_token: string;
    user: IUser;
  }
}
