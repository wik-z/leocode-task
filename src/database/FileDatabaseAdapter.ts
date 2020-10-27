import { IDatabaseAdapter } from "./IDatabaseAdapter";
import users from './data/users.json';

/**
 * Ultra simple database adapter which works with json files
 */
class FileDatabaseAdapter implements IDatabaseAdapter {
    private tables: {[key: string]: Array<any>}  = {};
    
    constructor() {
        this.tables = {
            users: JSON.parse(JSON.stringify(users)) // deep copy on load
        };
    }

    public all(table: string): Array<any> {
        return this.tables[table];
    }

    public filter(table: string, parameters: {[key: string]: any}): Array<any> {
        const data = this.tables[table];
        const keys = Object.keys(parameters);

        // simply compare the objects to the searched arguments (strict AND)
        return data.filter(entry => {
            return keys.every(paramKey => entry[paramKey] === parameters[paramKey]);
        });
    }

    public find(table: string, parameters: {[key: string]: any}): (object | null) {
        const data = this.tables[table];
        const keys = Object.keys(parameters);

        // very simplistic search for the first occurrence (strict AND)
        return data.find(entry => {
            return keys.every(paramKey => entry[paramKey] === parameters[paramKey]);
        });
    }

    public save(tableName: string, primaryKey: string, data: {[key: string]: any}): void {
        // get the table
        const table = this.tables[tableName];

        // check if the entry with the same primary key already exists - if so, get its index
        const existingIndex = table.findIndex(entry => entry[primaryKey] === data[primaryKey]);

        if (existingIndex !== -1) {
            const existingData = table[existingIndex];

            // update the data
            table.splice(existingIndex, 1, {...existingData, ...data});

            return;
        }
        
        // if the user wasn't found, push a new entry to the database
        table.push(data);

        // Won't do - overwrite json file content with current database content
    }
}

export default FileDatabaseAdapter;