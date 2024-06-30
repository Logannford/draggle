'use server'
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';
import createCanvas from '../canvas/create-canvas';

interface CreateWebsiteProps {
	userId: string;
	websiteId: string;
	generateCanvas: boolean;
}

/**
 * Create a new website
 * 
 * @param userId 
 * @param websiteId 
 * @returns 
 */
export const createWebsite = async ({
	userId, 
	websiteId, 
	generateCanvas
}: CreateWebsiteProps) => {
	if(!userId) throw new Error('No user ID specified');

	// try to get the user from the db to check if valid
	const user = await prisma.user.findUnique({
		where: {
			uid: userId,
		},
	});

	if(!user) throw new Error('Invalid user ID');

	const response = await prisma.website.create({
		data: {
			websiteLogo: '',
			websitePrimaryColor: '#ffffff',
			websiteSecondaryColor: '#000000',
			websiteUrl: '',
			websiteId: websiteId,
			websiteName: 'Untitled', 
			createdAt: new Date(),
			lastUpdated: new Date(),
			hasBeenPublished: false,
			owner: {
				connect: {
					uid: userId,
				}
			},
		},
	});

	if(!response) throw new Error('Failed to create website');

	// upon website creation, we need to ceate the canvas
	// and the first page for the website
	// await createCanvas({
	// 	userId,
	// 	website: response,
	// 	generateCanvas,
	// });	
	// revalidate the dashboard page to show the new website
	revalidatePath('/dashboard');

	// return a boolean value of the response so we can
	// check for a value when calling this function
	return 'ok';
}