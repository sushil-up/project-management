import { routesUrl } from "@/utils/pagesurl";
import Cookies from "js-cookie";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password, localData } = credentials;
        const data = JSON.parse(localData);
        
        const user = data.find(
          (item) => item.email === email && item.password === password
        );

        if (user) {
          return { email: user.email, username: user.username,}; 
        } else {
          return null; 
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        // It will force the Refresh Token to always be provided on sign in
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: routesUrl.signIn,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.username = user.username; 
        token.id = user.id;    
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.username = token.username; // Add name to the session
      session.user.id = token.id;     // Add ID to the session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
