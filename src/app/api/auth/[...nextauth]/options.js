import bcrypt from 'bcryptjs';
import NextAuthOptions from 'next-auth';
import { connectToDatabase } from "@/lib/mongodb";
import credentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/user';
import { signIn } from 'next-auth/react';

export default NextAuthOptions({
    providers: [
        credentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await connectToDatabase();
                const { email, password } = credentials;
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('No user found with this email address');
                }
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error('Incorrect password');
                }
                return { email: user.email, role: user.role };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.SECRET,
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async signIn (user, account, profile) {
            await connectToDatabase();
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await User.create({
                    name: user.name,
                    email: user.email,
                });
            }
            return true;
        },
        async jwt(token, user) {
            if (user) {
                token.email = user.email;
                token.role = user.role;
                token.name = user.name;
                token.picture = user.picture;
            }
            return token;
        },
        async session(session, token) {
            if(token && session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.picture = token.picture;
            }
        },
    },
});