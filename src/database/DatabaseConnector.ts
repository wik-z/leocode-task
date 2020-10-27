import { IDatabaseAdapter } from "./IDatabaseAdapter";

class DatabaseConnector {
    // which "bridge" to use for the DB connection
    private adapter: IDatabaseAdapter;

    constructor(adapter: IDatabaseAdapter) {
        this.adapter = adapter;        
    }

    /**
     * Returns all entries from a table
     * @param {string} table - table name
     * 
     * @returns {Array<any>}
     */
    public all(table: string): Array<any> {
        return this.adapter.all(table);
    }

    /**
     * Filters the table based on the requirements in the params
     * @param {string} table - table name
     * @param {object} params - search parameters 
     * 
     * @returns {Array<any>}
     */
    public filter(table: string, params: {[key: string]: any}): Array<any> {
        return this.adapter.filter(table, params);
    }

    /**
     * Finds the first 
     * @param {string} table - table name
     * @param {object} params - search parameters 
     * 
     * @returns {object | null}
     */
    public find(table: string, params: {[key: string]: any}): (object|null) {
        return this.adapter.find(table, params);
    }


    /**
     * Saves the object to the database
     * 
     * @param {string} table - table name
     * @param {string} primaryKey - primary key of the model
     * @param {object} data - data to store
     */
    public save(table: string, primaryKey: string, data: object): void {
        this.adapter.save(table, primaryKey, data);
    }
};

export default DatabaseConnector;