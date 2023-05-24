import { type JwtPayload } from 'jsonwebtoken'
import { type Request } from 'express'
import { type Document, type Types } from 'mongoose'

export interface HttpError extends Error {
  status: number
}

// JWT payload
export interface customPayload extends JwtPayload {
  UserInfo: {
    username: string
    roles: number[]
  }
}

// JWT sign and set a variable on request
export interface CustomRequest extends Request {
  user: string | JwtPayload
  roles: number[] | JwtPayload
}

// User Roles
export interface IRolesList {
  Admin: number
  Editor: number
  User: number
}

// Mongoose User model
export interface IUser extends Document {
  username: string
  fname: string
  lname: string
  email: string
  password: string
  image: string
  refreshToken?: string
}

// Mongoose Project model
export interface IProject extends Document {
  xApiKey: string
  appInfo: {
    app_name: string
    app_version: string
    platform: string
    environmentL: string
    app_language: string
    user: Types.ObjectId
  }
}
// Mongoose Employees Model
export interface IEmployees extends Document {
  firstname: string
  lastname: string
}
