import { model, Schema } from 'mongoose'
import { type IUser } from '../interfaces/interface'
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    fname: {
      type: String,
      lowercase: true,
      required: true
    },
    lname: {
      type: String,
      lowercase: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image: String,
    refreshToken: String
  },
  {
    timestamps: true,
    strict: true
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

export default model<IUser>('User', userSchema)
