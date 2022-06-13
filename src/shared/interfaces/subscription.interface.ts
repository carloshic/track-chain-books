import { MutationType } from '../enums/mutation-type.enum';

export interface ISubscription<T> {
  data: T;
  mutationType: MutationType;
}
