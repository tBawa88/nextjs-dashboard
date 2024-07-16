import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
    //matcher makes sure that this middleware will only run for this specific path that matches this regex
}

// Here you're initializing NextAuth.js with the authConfig object and exporting the auth property.
// You're also using the matcher option from Middleware to specify that it should run on specific paths.

// The advantage of employing Middleware for this task is that the "protected routes will not even start rendering until the Middleware verifies the authentication",
// enhancing both the security and performance of your application.