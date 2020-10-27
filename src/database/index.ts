import DatabaseConnector from "./DatabaseConnector";
import FileDatabaseAdapter from "./FileDatabaseAdapter";

// creates a database connector for the application
export const DB = new DatabaseConnector(new FileDatabaseAdapter());