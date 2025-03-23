export class CustomField {
  private _fieldId: number;
  private _recipeId: number;
  private _fieldName: string;
  private _fieldType: number;
  private _fieldText: string;
  private _creationDate: Date;
  private _updatedDate: Date;

  constructor(fieldId: number, recipeId: number, fieldName: string, fieldType: number, fieldText: string, creationDate: Date, updatedDate: Date) {
    this._fieldId = fieldId;
    this._recipeId = recipeId;
    this._fieldName = fieldName;
    this._fieldType = fieldType;
    this._fieldText = fieldText;
    this._creationDate = creationDate;
    this._updatedDate = updatedDate;
  }

  public get recipeId() {
    return this._recipeId;
  }

  public get fieldName() {
    return this._fieldName;
  }

  public get fieldType() {
    return this._fieldType;
  }

  public get fieldText() {
    return this._fieldText;
  }

  public get creationDate(): Date {
    return this._creationDate;
  }

  public get updatedDate(): Date {
    return this._updatedDate;
  }
}
