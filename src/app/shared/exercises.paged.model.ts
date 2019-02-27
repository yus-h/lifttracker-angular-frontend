import { Exercise } from './exercise.model';

export class ExercisesPaged {

  public content: Exercise[];
  public last: boolean;
  public totalPages: number;
  public totalElements: number;
  public size: number;
  public number: number;
  public numberOfElements: number;
  public first: boolean;

}
