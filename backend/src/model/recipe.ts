export class Recipe {
  private _recipeId: number;
  private _userId: number;
  private _recipeName: string;
  private _dateCreated: Date;
  private _dateUpdated: Date;

  constructor(recipeId: number, userId: number, recipeName: string, dateCreated: Date, dateUpdated: Date) {
    this._recipeId = recipeId;
    this._userId = userId;
    this._recipeName = recipeName;
    this._dateCreated = dateCreated;
    this._dateUpdated = dateUpdated;
  }
}
