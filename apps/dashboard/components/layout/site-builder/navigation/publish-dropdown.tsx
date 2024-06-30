import { useEffect, useState } from 'react';
import Link from 'next/link';

// utils
import { updateWebsiteUrlChange } from '@/actions/websites/update';
import { getEnv } from '@/utils/index';
import { getUserFromSession } from '@/actions/user/get-user';
import { getLastUpdatedUser } from '@/actions/websites/get-website';
import { publishSite } from '@/actions/websites/publish-website';
import { updateWebsite } from '@/actions/websites/update';

// components
import {
  ChevronDownIcon,
  ArrowRightIcon,
  Pencil1Icon,
  QuestionMarkCircledIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { toast } from 'sonner';
import PublishDropdownItems from './publish-dropdown-items';
import { User } from '@supabase/supabase-js';

export default function SiteBuilderPublishModal({ website }) {
  const [websiteUrlEditor, setWebsiteUrlEditor] = useState(false);
  const [websiteUrlEditable, setWebsiteUrlEditable] = useState('');
  const [user, setUser] = useState<User>(null);
  const [lastUpdatedUser, setLastUpdatedUser] = useState(null);

  const env = getEnv() === 'production' ? 'https' : 'http';

  // useEffect to update the website url in the backend when websiteUrlEditor changes
  useEffect(() => {
    if (!website?.websiteId) return;

    const updateUrl = async () => {

      try{
        const { data: user, error } = await getUserFromSession();
        setUser(user.user);
      } catch(e){
        console.error('Error fetching user data:', e);
      }
      setWebsiteUrlEditable(website?.websiteUrl?.split('.')[0]);

      // need to prevent on inital load resetting the original website url
      if(!websiteUrlEditable || !setWebsiteUrlEditable.length) return;

      // make an array of the website url and split it by '.'
      const websiteUrl = website?.websiteUrl.split('.');
      //change the first part of the array with the new websiteUrlEditable
      websiteUrl[0] = websiteUrlEditable.replace(/\s/g, '-');
      // join the array back together with a '.' in between
      const newUrl = websiteUrl.join('.');

      // Call the updateUrl function when websiteUrlEditor changes
      if (!websiteUrlEditor) {
        const { message, statusCode } = await updateWebsiteUrlChange(
          website?.websiteId,
          newUrl,
          user?.id
        );

        if (statusCode === 409) {
          toast.error(message);
          return;
        }
      }
    };
    updateUrl();
  }, [websiteUrlEditor]);


  useEffect(() => {
    const fetchLastUpdatedUser = async () => {
      if(!website?.lastUpdatedUid) return;

      const user = await getLastUpdatedUser(website?.websiteId)
      setLastUpdatedUser(user);
    }
    console.log('called')
    fetchLastUpdatedUser();
  }, [website?.lastUpdatedUid])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="!rounded-bl-none !rounded-tl-none group-hover:!bg-white 
            group-hover:text-black px-2 !border-0 focus-visible:!outline-none
            focus-visible:!ring-0 focus-within:border-none"
          rounded="sm"
          size="sm"
        >
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="font-inter border border-black-50 !bg-black text-white/80 my-2 w-80"
        side="bottom"
        align="end"
      >
        <div className="text-base font-normal flex flex-col gap-y-1 font-inter p-1">
          <div className="flex justify-between w-full items-center">
            <span className="text-xs text-white/60">
              {website?.websiteName}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            {websiteUrlEditor ? (
              <input
                type="text"
                className="w-full text-white/80 bg-transparent focus-visible:outline-none placeholder:text-[10px]"
                value={websiteUrlEditable}
                onChange={(e) => {
                  setWebsiteUrlEditable(e.target.value);
                }}
              />
            ) : (
              <Link
                className="text-md text-white group flex items-center gap-x-1 hover:underline"
                href={`${env}://${website?.websiteUrl}`}
                prefetch
                target="_blank"
              >
                {website?.websiteUrl || 'Not Published'}
                <ArrowRightIcon className="relative size-3 opacity-0 group-hover:opacity-100 -left-2 group-hover:left-0 duration-300 transition-all" />
              </Link>
            )}
            <div className="flex gap-x-1 items-center">
              <button
                onClick={() => {
                  setWebsiteUrlEditor(!websiteUrlEditor);
                }}
              >
                <Pencil1Icon
                  className="cursor-pointer transition-colors duration-300"
                  style={{
                    color: websiteUrlEditor ? '#6725f2' : '#ffffff'
                  }}
                />
              </button>
              {/* <Tooltip>
                <TooltipTrigger
                  asChild
                  className="hover:bg-black-50 rounded-md"
                >
                  <QuestionMarkCircledIcon className="size-3 text-white/60" />
                </TooltipTrigger>
                <TooltipContent className="bg-black">
                  <p></p>
                </TooltipContent>
              </Tooltip> */}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup>
          {/* You can include PublishDropdownItems here */}
          <PublishDropdownItems 
            website={website} 
            lastUpdatedUser={lastUpdatedUser}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
