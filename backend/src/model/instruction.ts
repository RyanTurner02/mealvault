export class Instruction {
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

  public get recipeId() {
    return this._recipeId;
  }

  public get instructionText() {
    return this._instructionText;
  }

  public get creationDate(): Date {
    return this._creationDate;
  }

  public get updatedDate(): Date {
    return this._updatedDate;
  }
}
