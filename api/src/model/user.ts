class User {
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

  public getId() {
    return this._id;
  }

  public getName() {
    return this._name;
  }

  public getPassword() {
    return this._password;
  }

  public getEmail() {
    return this._email;
  }
}

export default User;