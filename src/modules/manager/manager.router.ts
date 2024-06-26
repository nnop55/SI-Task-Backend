import { Router } from "express";
import { wrapAsync } from "../../middlewares/controllerWrapper.middleware";
import { verifyToken } from "../../middlewares/token.middleware";
import ManagerController from "./manager.controller";

export const managerRouter: Router = Router();

managerRouter.post('/',
    verifyToken,
    wrapAsync(ManagerController.getManagers)
);

managerRouter.post('/saled-products',
    verifyToken,
    wrapAsync(ManagerController.getSaledProducts)
);

export default managerRouter;