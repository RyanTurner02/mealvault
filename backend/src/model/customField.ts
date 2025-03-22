export class CustomField {
  private _fieldId: number;
  private _recipeId: number;
  private _fieldName: string;
  private _fieldType: number;
  private _fieldText: string;

  constructor(fieldId: number, recipeId: number, fieldName: string, fieldType: number, fieldText: string) {
    this._fieldId = fieldId;
    this._recipeId = recipeId;
    this._fieldName = fieldName;
    this._fieldType = fieldType;
    this._fieldText = fieldText;
  }
}
