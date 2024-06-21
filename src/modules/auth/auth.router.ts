import { Router } from "express";
import AuthController from "./auth.controller";
import { wrapAsync } from "../../middlewares/controllerWrapper.middleware";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { RegisterUserDto } from "./dtos/registerUser.dto";
import { verifyRefreshToken, verifyToken } from "../../middlewares/token.middleware";

export const authRouter: Router = Router();

authRouter.post('/register',
    inputValidationMiddleware(RegisterUserDto),
    wrapAsync(AuthController.register)
);

authRouter.post('/login',
    inputValidationMiddleware(LoginUserDto),
    wrapAsync(AuthController.login)
);

authRouter.post('/refresh-token',
    verifyRefreshToken,
    wrapAsync(AuthController.refreshToken)
);

authRouter.post('/logout',
    verifyToken,
    wrapAsync(AuthController.logout)
);

export default authRouter;