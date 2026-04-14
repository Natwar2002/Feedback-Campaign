import { Router } from "express";
import v1Router from "./version1";

const appRouter = Router()

appRouter.use('/v1', v1Router)

export default appRouter