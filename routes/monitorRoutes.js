import { Router } from "express";
import monitorController from "../controllers/monitorController.js";

const router = new Router();

router.get("/monitors", monitorController.getMonitors);
router.get("/monitors/:id", monitorController.getMonitors);
router.post("/monitors", monitorController.addMonitor);
router.patch("/monitors/:id", monitorController.editMonitor);
router.put("/monitors/:id", monitorController.updateMonitor);
router.delete("/monitors/:id", monitorController.deleteMonitor);

export default router;
