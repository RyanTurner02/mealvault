export class User {
  private _id: number;
  private _name: string;
  private _password: string;
  private _email: string;
  private _creationDate: Date;
  private _updatedDate: Date;

  constructor(id: number, name: string, password: string, email: string, creationDate: Date, updatedDate: Date) {
    this._id = id;
    this._name = name;
    this._password = password;
    this._email = email;
    this._creationDate = creationDate;
    this._updatedDate = updatedDate;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get password(): string {
    return this._password;
  }

  public get email(): string {
    return this._email;
  }

  public get creationDate(): Date {
    return this._creationDate;
  }

  public get updatedDate(): Date {
    return this._updatedDate;
  }
}
