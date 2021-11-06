import {IsEmail, IsMobilePhone, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateClientReqDto {

  @IsString()
  @MaxLength(50)
  public PIB: string;

  @IsString()
  public dateBirthday: Date;

  @IsMobilePhone()
  @MaxLength(12)
  public telephone: string;

  @IsEmail()
  @MaxLength(50)
  public email: string;

  @IsNumber()
  public deposit: number;

  @IsString()
  @MaxLength(100)
  public address: string;

}
