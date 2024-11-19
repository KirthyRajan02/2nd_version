import { Mongoose } from "mongoose";
import { MongoClient, Db, Collection } from 'mongodb';
import dns from 'dns';

// Set Google DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

interface GlobalMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
  client: MongoClient | null;
  db: Db | null;
  collection: Collection | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: GlobalMongoose;
}

global.mongoose = {
  conn: null,
  promise: null,
  client: null,
  db: null,
  collection: null
};

const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 20,
  minPoolSize: 5,
};

export async function dbConnect(dbName: string, collectionName: string) {
  try {
    // Return existing collection if available
    if (global.mongoose?.collection) {
      console.log("Using cached connection");
      return global.mongoose.collection;
    }

    const conString = process.env.MONGODB_URI;
    if (!conString) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    // Create new MongoDB client with connection pooling
    if (!global.mongoose.client) {
      const client = new MongoClient(conString, options);
      await client.connect();
      global.mongoose.client = client;
    }
    
    // Reuse existing client connection
    const db = global.mongoose.client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Store references
    global.mongoose.db = db;
    global.mongoose.collection = collection;
    
    return collection;

  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export const disconnect = async () => {
  try {
    if (global.mongoose.client) {
      await global.mongoose.client.close();
      global.mongoose.client = null;
      global.mongoose.db = null;
      global.mongoose.collection = null;
    }
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    throw error;
  }
};