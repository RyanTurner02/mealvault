class Instruction {
  private _instructionId: number;
  private _recipeId: number;
  private _instructionText: string;
  private _creationDate: Date;
  private _updatedDate: Date;

  constructor(instructionId: number, recipeId: number, instructionText: string, creationDate: Date, updatedDate: Date) {
    this._instructionId = instructionId;
    this._recipeId = recipeId;
    this._instructionText = instructionText;
    this._creationDate = creationDate;
    this._updatedDate = updatedDate;
  }
}
