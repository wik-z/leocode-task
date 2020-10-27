# LEOCODE Node.js assessment

### How to install
1. Run `npm install` to install the dependencies
2. Create a new `.env` file and copy the contents of `.env.example` file into it
3. You can change the environment variables in the `.env` to suit your needs
4. Run `npm run build`
5. Once the build process is finished, run `npm run start`

### Testing details
There are currently two users in the "database" which is a single file loaded into the memory at the start of the program. The program never overwrites the file - all the changes made to the users in the runtime vanish when the process shuts down. They can be found in `./src/database/data/users.json`.

Their passwords are not being hashed for simplicity, therefore they're stored as plain text.

##### User #1:
Email: `john.doe@email.example`
Password: `password123`

##### User #2
Email: `chris.baker@email.example`
Password: `verysecure999`