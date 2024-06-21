import { LoginUserDto } from "../modules/auth/dtos/loginUser.dto";
import { RegisterUserDto } from "../modules/auth/dtos/registerUser.dto";

export type DtoTypes =
    typeof LoginUserDto |
    typeof RegisterUserDto

