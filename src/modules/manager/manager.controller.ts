import { Request, Response } from 'express';
import { getManagers, getSaledProducts } from "./manager.service";

export class ManagerController {
    public async getManagers(req: Request, res: Response) {
        const data = await getManagers(
            req.body
        );
        res.status(200).json({ code: 1, data })
    }

    public async getSaledProducts(req: Request, res: Response) {
        const { title } = req.body
        const userId = (req as any).user['_id']
        const data = await getSaledProducts(
            userId,
            title
        );
        res.status(200).json({ code: 1, data })
    }
}

export default new ManagerController()