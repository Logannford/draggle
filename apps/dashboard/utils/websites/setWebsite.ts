'use client'
import { useAppDispatch } from "@/lib/hooks"
import { setWebsite as setWebsiteReducer } from '@/store/slices/website-store';
import { websites as Website } from "@prisma/client"

/**
 * Sets website in the redux store
 */
export const setWebsite = (website: Website) => {
	const dispatch = useAppDispatch()
	return dispatch(setWebsiteReducer(website))
}