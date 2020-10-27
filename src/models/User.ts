import { DB } from "../database";

export type UserData = {
    email?: string,
    password?: string,
    pubKey?: string
};

class User {
    // important fields of the model
    public email?: string;
    public password?: string;
    public pubKey?: string;
    
    // very simplified ORM-like interface
    private static tableName: string = 'users'; // which table it's stored to
    private static primaryKey: string = 'email'; // which key is the primary key

    /**
     * Returns all users
     * 
     * @returns {Array<User>}
     */
    public static all(): User[] {
        // create instances from the returned data
        return DB.all(User.tableName)
            .map(entry => new User(entry));
    }
    
    /**
     * Returns all entries which fulfill all the search criteria
     * 
     * @param {UserData} search - parameters to perform the search with
     * @returns {Array<User>}
     */
    public static where(search: UserData): User[] {
        // create instances from the returned data
        return DB.filter(User.tableName, search)
            .map(entry => new User(entry));
    }

    /**
     * Returns the first entry which fulfills all the search criteria or null if none were found
     * 
     * @param {UserData} search - parameters to perform the search with
     * @returns {User | null}
     */
    public static firstWhere(search: UserData): (User | null) {
        const result = DB.find(User.tableName, search);
        
        // create an instance from the returned data if found
        return result ? new User(result) : null;
    }


    constructor({ email, password, pubKey } : UserData) {
        this.email = email;
        this.password = password;
        this.pubKey = pubKey;
    }

    /**
     * Loads the user model from the database based on the least required information
     * 
     * @returns {User}
     */
    public load() {
        const result: (User | null) = User.firstWhere({ email: this.email });

        if (result) {
            this.email = result.email;
            this.pubKey = result.pubKey;
            this.password = result.password;
        }
    }

    /**
     * Saves the user model in the database
     */
    public save() {
        DB.save(User.tableName, User.primaryKey, (<any>Object).assign({}, this));
    }
    

    public toJSON(): User {
        // don't include the password/public key in the API response
        return { ...this, password: undefined, pubKey: undefined };
    }
}

export default User;