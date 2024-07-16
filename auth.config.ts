import type { NextAuthConfig } from "next-auth"
//import this object inside Middleware.ts file (root level)
export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {

        //this function returns a boolen value, if it returns false, the user will be redirected to the 'signIn path', which we specified to signIn : '/login'
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user //double ban operator, turns a value into a boolean value
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            if (isOnDashboard) {
                return isLoggedIn ? true : false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))    //If user is logged in , redirect them to the route they're trying to access with their request
            } else {
                return true;
            }
        }
    },
    providers: []   //
} satisfies NextAuthConfig


// the authConfig object must have 3 things in it to satisfy the 'NextAuthConfig type'
//this authorize function is invoked to verify if the current request is authorized to view this page. Using Nextjs Middleware
//inside it, we're checking if the current url pathname belongs to /dashboard routes
//      to access /dashboard routes, user must be logged in
//      else redirect them to thte  signIn route( which was set to /login by us)
//authorized() callback function either returns a boolean value or a NextResponse
//if it returns false, user will be redirected to the specified route
//if it returns true, user will be allowed access to the route that we're checking (/dashboard) in this case
//it can also return a NextResponse object, whihc we can use to redirect user to the route theyr'e tryna access, if that route is not /dashboard

//providers contains different login strategies

