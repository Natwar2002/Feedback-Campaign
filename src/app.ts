import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import appRouter from "@routes/index"

const app = express()
app.use(cors({ origin: "*", credentials: true }))
app.use(helmet())
app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api", appRouter)

// 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Route not found" })
})

export default app