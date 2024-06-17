'use server'
import { prisma } from '@/utils/prisma';

import { createClient as createServerClient } from "@/utils/supabase/server";

/**
 * Logs the user into the application
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export const login = async (email: string, password: string) => {
	const supabase = createServerClient();

	if(!supabase) throw new Error('No supabase client found')

	if(!email || !password) throw new Error('Email and password are required')

	try {
		const { data: user, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) throw new Error(error.message);

		// update the 'lastLoggedIn' field in the db
		await prisma.users.update({
			where: {
				uid: user?.user.id
			},
			data: {
				lastLogin: new Date()
			}
		});
		
		return user;
	} catch (error) {
		console.error('Error logging in:', error);
		return null;
	}
}


