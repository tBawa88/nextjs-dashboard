import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { sql } from "@vercel/postgres";
import { User } from "./app/lib/definitions";
import bcrypt from 'bcrypt'

//check if the user with the email exists in the database
async function getUser(email: string) {
    try {
        const user = await sql<User>`
            SELECT * 
            FROM users
            WHERE email=${email}
        `;
        return user.rows[0]
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


//these functions will be used to sign in and sign out the user 
export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        //this function either returns a User object, or return null
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data
                const existingUser = await getUser(email)
                if (!existingUser)
                    return null
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
                if (isPasswordCorrect) {
                    return existingUser
                }
            }
            console.log("Invalid credentials")
            return null
        },
    })]

})

