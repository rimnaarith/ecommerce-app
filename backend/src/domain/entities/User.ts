type UserRole = 'ADMIN' | 'USER'
export class User {
  constructor(
    public readonly id: string,
    public username: string | null,
    public hashedPassword: string,
    public name: string,
    public email: string | null,
    public profileImgName: string | null,
    public role: UserRole,
    public updateAt: Date,
    public createAt: Date
  ) {

  }

  public verifyPassword(plainPassword: string, comparer: (plain: string, hash: string) => boolean): boolean {
    return comparer(plainPassword, this.hashedPassword);
  }
  public static fromObj(obj: {
    id: string,
    username: string | null,
    hashedPassword: string,
    name: string,
    email: string | null,
    profileImgName: string | null,
    role: UserRole,
    updateAt: Date,
    createAt: Date
  }) {
    return new User(
      obj.id,
      obj.username,
      obj.hashedPassword,
      obj.name,
      obj.email,
      obj.profileImgName,
      obj.role,
      obj.updateAt,
      obj.createAt
    );
  }
}