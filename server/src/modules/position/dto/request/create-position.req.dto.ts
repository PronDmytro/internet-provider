import {IsNumber, IsString} from 'class-validator';

export class CreatePositionReqDto {

  @IsString()
  public name: string;

  @IsString()
  public responsibilities: string;

  @IsNumber()
  public salary: number;

}
