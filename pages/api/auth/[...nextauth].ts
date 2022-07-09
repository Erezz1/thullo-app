import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axiosInstance from 'client/axiosInstance';


export default ( req: NextApiRequest, res: NextApiResponse ) => NextAuth( req, res, {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },

            authorize: async ( credentials, req ): Promise<any> => {

                try {
                    const res = await axiosInstance.post('/auth/login', {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    const user = {
                        email: res.data.email,
                        name: res.data.name,
                        image: res.data.imageAvatar,
                    }

                    return {
                        token: res.data.token,
                        user
                    };

                } catch ( error: any ) {
                    const errorData = error.response?.data;
                    throw new Error(`${ errorData.statusCode }&message=${ errorData.message || '' }`);
                }
            }
        })
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            if ( user ) {
                token.accessToken = user.token;
            }

            return token;
        },

        session: async ({ session, token }) => {
            session.accessToken = token.accessToken;
            return session;
        }
    },

    pages: {
        error: '/login'
    }
})
