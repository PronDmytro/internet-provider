import {Position} from './position.interface';

export interface Employee {
  id?: string;
  PIB: string;
  passportId: string;
  dateBirthday: string;
  telephone: string;
  email: string;
  address: string;
  position: Position;
}
