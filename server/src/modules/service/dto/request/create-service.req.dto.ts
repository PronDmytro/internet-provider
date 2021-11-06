import {IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateServiceReqDto {

  @IsString()
  @MaxLength(50)
  public name: string;

  @IsNumber()
  public serviceCost: number;

  @IsNumber()
  public connectionCost: number;

}
