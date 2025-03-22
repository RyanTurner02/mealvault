export class Recipe {
  private _recipeId: number;
  private _userId: number;
  private _recipeName: string;
  private _creationDate: Date;
  private _updatedDate: Date;

  constructor(recipeId: number, userId: number, recipeName: string, creationDate: Date, _updatedDate: Date) {
    this._recipeId = recipeId;
    this._userId = userId;
    this._recipeName = recipeName;
    this._creationDate = creationDate;
    this._updatedDate = _updatedDate;
  }

  public get userId() {
    return this._userId;
  }

  public get recipeName() {
    return this._recipeName;
  }

  public get dateCreated() {
    return this._creationDate;
  }

  public get dateUpdated() {
    return this._updatedDate;
  }
}
