import mongoose from "mongoose"
import { ENV } from "./env"
import { MAX_DB_RETRIES } from "@shared/constants"

const RETRY_DELAY = 5000

export async function connectDB() {
  if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing")
  }

  let attempts = 0

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(ENV.DATABASE_URL, {
        serverSelectionTimeoutMS: 5000
      })

      console.log("MongoDB connected")

    } catch (error) {
      attempts++

      if (attempts >= MAX_DB_RETRIES) {
        console.error("Max DB retries reached. Exiting...", error)
        process.exit(1)
      }

      console.warn(
        `DB connection failed. Retry ${attempts}/${MAX_DB_RETRIES} in ${RETRY_DELAY / 1000}s`
      )

      setTimeout(connectWithRetry, RETRY_DELAY)
    }
  }

  await connectWithRetry()

  // Connection Events for better observability
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected")
  })

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose error:", err)
  })

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected")
  })

  mongoose.connection.on("reconnected", () => {
    console.log("Mongoose reconnected")
  })
}