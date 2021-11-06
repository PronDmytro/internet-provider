import {IsString} from 'class-validator';

export class UpdateWorkStatusReqDto {

  @IsString()
  public id: string;

  @IsString()
  public statusName: string;

}
