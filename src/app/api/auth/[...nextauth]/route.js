'use server';

import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import LinkedInProvider from 'next-auth/providers/linkedin';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'read:user user:email',
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Allow login through NextAuth only (no DB interaction here)
            return true;
        },

        async session({ session, token }) {
            // After successful login, configure the session with DB
            try {
                await connectDB();

                // Check if the user exists in the database
                const dbUser = await User.findOne({ email: session.user.email });

                if (!dbUser) {
                    // If user does not exist, create a new user
                    const newUser = await User.create({
                        providerId: token.sub,
                        email: session.user.email,
                        name: session.user.name,
                        username: session.user.email.split('@')[0], // Default username
                        profilePic: session.user.image || '', // Default profile pic
                        provider: token.provider || 'unknown',
                    });
                    session.user.dbId = newUser._id; // Attach DB user ID to the session
                } else {
                    // If user exists, attach their details to the session
                    session.user.dbId = dbUser._id;
                    session.user.username = dbUser.username;
                }
            } catch (error) {
                console.error('Error in session callback:', error);
            }

            return session;
        },
    },
});

export { authoptions as GET, authoptions as POST };
