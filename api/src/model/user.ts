class User {
  private _id: number;
  private _name: string;
  private _password: string;
  private _email: string;

  constructor(id: number, name: string, password: string, email: string) {
    this._id = id;
    this._name = name;
    this._password = password;
    this._email = email;
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