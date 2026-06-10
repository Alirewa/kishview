import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@kishview.com';
        const adminPass = process.env.ADMIN_PASSWORD ?? 'kishview_admin_2026';
        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPass
        ) {
          return { id: '1', name: 'Admin', email: adminEmail, role: 'admin' };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'kishview-secret-2026',
});

export { handler as GET, handler as POST };
