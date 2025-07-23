import getConnection from '../config/database';

const handleCreateUser = (
    fullName: string,
    email: string,
    address: string) => {
        //insert into database 

        //return result

        console.log(`create user: ${fullName} - ${email} - ${address}`);
}

const getAllUsers = async () => {
    const connection = await getConnection();
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );

        return results
    } catch (err) {
        console.log(err);
    }
    return [];
}

export {
    handleCreateUser, 
    getAllUsers
};