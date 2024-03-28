'use server'
import { prisma } from '@/utils/prisma';

export const getUserFromDb = async (id: string): Promise<any> => {

	console.log(id);

	if(!id) {	
		throw new Error('No id provided')
	}

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