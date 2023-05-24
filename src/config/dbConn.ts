import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err)
  }
}

export default connectDB
