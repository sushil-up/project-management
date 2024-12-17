import Cookies from "js-cookie";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
  ],
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
