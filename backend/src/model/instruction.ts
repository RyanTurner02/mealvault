export class Instruction {
  private _instructionId: number;
  private _recipeId: number;
  private _instructionText: string;

  constructor(instructionId: number, recipeId: number, instructionText: string) {
    this._instructionId = instructionId;
    this._recipeId = recipeId;
    this._instructionText = instructionText;
  }
}
