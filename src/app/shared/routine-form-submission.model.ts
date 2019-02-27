
export class RoutineFormSubmission {

  public exercises; //TODO TYPE // TODO make into interface?
  public notes: string;
  public routineId: number;
  public date;

  constructor(exercises, notes: string, routineId: number) {
    this.exercises = exercises;
    this.notes = notes;
    this.routineId = routineId;
  }
}
