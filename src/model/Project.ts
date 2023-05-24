// topic.model.ts
import { model, Schema } from 'mongoose'
import { type IProject } from '../interfaces/interface'

const projectSchema: Schema = new Schema<IProject>(
  {
    xApiKey: { type: String, required: true },
    appInfo: {
      app_name: { type: String, required: true },
      app_version: { type: String, required: true },
      app_language: { type: String },
      platform: { type: String, required: true },
      environment: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    }
  },
  {
    timestamps: true
  }
)

export default model<IProject>('Project', projectSchema)
