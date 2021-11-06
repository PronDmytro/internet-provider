import {IsBoolean, IsString} from 'class-validator';

export class UpdateOrderReqDto {

  @IsString()
  public id: string;

  @IsString()
  public client: string;

  @IsString()
  public contributor: string;

  @IsString()
  public orderDate: Date;

  @IsString()
  public service: string;

  @IsString()
  public workStatus: string;

  @IsBoolean()
  public paymentStatus: boolean;

}
