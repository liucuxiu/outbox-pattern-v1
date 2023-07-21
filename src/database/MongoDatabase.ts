import { MongoClient, Db } from 'mongodb';

export class MongoDatabase {

  private static instance: MongoDatabase;
  private client: MongoClient;
  private db: Db;

  private constructor() {
    this.client = new MongoClient('mongodb://localhost:27017');
    this.client.connect().then(r => console.log('connected'));
    this.db = this.client.db('read-db');
  }

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }

    return MongoDatabase.instance;
  }

  public getCollection(collectionName: string) {
    return this.db.collection(collectionName);
  }
}
