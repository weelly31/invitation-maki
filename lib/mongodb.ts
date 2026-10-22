import { MongoClient } from 'mongodb'

const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> }

export function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri).connect()
  }
  return globalForMongo._mongoClient
}
