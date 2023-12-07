import User from '../../domain/user'

interface UserRepository{
    save(user:User),
    findByEmail(email:string)
}

export default UserRepository