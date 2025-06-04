export interface User {
  userId: string;
  username: string;
  password: string;
  name: string;
  email: string | null;
  profileImgName: string | null;
  role: 'ADMIN' | 'USER';
  updateAt: Date;
  createAt: Date;
}