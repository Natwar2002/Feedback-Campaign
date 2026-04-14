import feedbackRouter from "@modules/feedback/feedback.route";
import { Router } from "express";

const v1Router = Router()

v1Router.use('/feedbacks', feedbackRouter)

export default v1Router