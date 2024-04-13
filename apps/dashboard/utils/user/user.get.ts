'use server'
import { prisma } from '@/utils/prisma';
import type { users } from '@prisma/client';

export const getUserFromDb = async (id: string): Promise<users> => {
	if(!id) throw new Error('No id provided')

	const user  = await prisma.users.findFirst({
		where: {
			uid: {
				equals: id
			}
		}
	});

	if(user) return user

	if(!user) console.error('No user found with that id')
}