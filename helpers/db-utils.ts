import { MongoClient } from "mongodb";

export const connect = async (dbName: string) => {
  const uri = `${process.env.MONGO_DB_URI}${dbName}?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collectionName: string,
  document: any
) => {
  const db = client.db();

  const result = await db.collection(collectionName).insertOne(document);
  return result;
};

export const getDocument = async (
  client: MongoClient,
  collectionName: string,
  sort: any,
  filter: any
) => {
  const db = client.db();

  const documents = await db
    .collection(collectionName)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};
