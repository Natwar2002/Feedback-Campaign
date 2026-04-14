import "module-alias/register"
import app from "./app"
import { connectDB } from "@config/db"
import { ENV } from "@config/env"

async function startServer() {
  try {
    await connectDB()
    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`)
    })
  } catch (error) {
    console.error("Server failed to start", error)
    process.exit(1)
  }
}

startServer()