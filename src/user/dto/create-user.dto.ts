import { User } from "../entities/user.entity";
import { 
    IsEmail,
    IsString,
    IsFQDN,
    Length,
    MinLength,
    Matches
} from "class-validator";

export class CreateUserDto extends User {
    @IsEmail()
    email: string;

    @IsString()
    @Length(3, 21)
    name: string;

    @IsFQDN()
    image: string;

    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}
