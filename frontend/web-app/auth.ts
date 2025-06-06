import NextAuth, { Profile } from "next-auth"
import { OIDCConfig } from "next-auth/providers"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: "http://localhost:5000",
            authorization: {
              url: "http://localhost:5000/connect/authorize",
              params: {scope: 'openid profile courseApp'}
            },
            token: "http://localhost:5000/connect/token",
            userinfo: "http://localhost:5000/connect/userinfo",
            idToken: false
    } as OIDCConfig<Omit<Profile, 'urename'>>),
  ],
  callbacks: {
    async authorized({ auth }){
      return !!auth
    },
    async jwt({ token, profile, account }) {
      if(account && account.access_token) {
        token.accessToken = account.access_token
      }
        if(profile) {
          token.username = profile.username
        }
        return token;
    },
    async session({ session, token }) {
        if(token) {
          session.user.username = token.username
          session.accessToken = token.accessToken
        }
        return session;
    }
  }
})