import {IsEmail, IsMobilePhone, IsString, MaxLength} from 'class-validator';

export class CreateEmployeeReqDto {

  @IsString()
  @MaxLength(50)
  public PIB: string;

  @IsString()
  @MaxLength(50)
  public passportId: string;

  @IsString()
  public dateBirthday: Date;

  @IsMobilePhone()
  @MaxLength(12)
  public telephone: string;

  @IsEmail()
  @MaxLength(50)
  public email: string;

  @IsString()
  @MaxLength(100)
  public address: string;

  @IsString()
  public position: string;

}
