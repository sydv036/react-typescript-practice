export {};

declare global {
  interface IUser {
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
    id: string;
  }

  interface IUserTable {
    type: string;
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface IUserInsert {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }
  interface IUserUpdate {
    _id: string;
    fullName: string;
    password: string;
  }
  interface IUserInsertOrUpdate extends IUserInsert {
    _id: string;
  }
}
