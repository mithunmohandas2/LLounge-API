import jwt from 'jsonwebtoken'

export interface TokenService {
    createToken(data: string): Promise<string>;
}

export default class JWTService implements TokenService {
    async createToken(data: string): Promise<string> {
        try {
           const token = await jwt.sign({ userData: data }, "Learners$2_SecretKey", { expiresIn: '24h' });
            // console.log("TokenType",typeof(token))
           return token

        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}




