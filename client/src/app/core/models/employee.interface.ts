import {Position} from './position.interface';

export interface Employee {
  id: string;
  fullName: string;
  passportId: string;
  dateBirthday: string;
  telephone: string;
  email: string;
  deposit: number;
  address: string;
  position: Position;
}
