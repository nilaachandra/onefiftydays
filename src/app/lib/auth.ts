import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { 
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === process.env.ADMIN_USERNAME! && 
            credentials?.password === process.env.ADMIN_PASSWORD!) {
          return { id: "1", name: "Admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/cms/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as any
        session.user.name = token.name
      }
      return session
    }
  }
})