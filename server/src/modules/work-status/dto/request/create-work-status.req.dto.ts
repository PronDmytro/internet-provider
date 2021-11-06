import {IsString} from 'class-validator';

export class CreateWorkStatusReqDto {

  @IsString()
  public statusName: string;

}
