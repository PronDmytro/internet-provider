import {IsNumber, IsString} from 'class-validator';

export class UpdatePositionReqDto {

  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public responsibilities: string;

  @IsNumber()
  public salary: number;

}
