'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { websites as Website } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WebsiteCard(website: Website) {
  return (
    <Link
      key={website.websiteId}
      className="flex flex-col gap-y-2 border border-black-50 bg-black-75 rounded-lg p-5 w-full relative"
      href={`/site/${website.websiteId}`}
    >
      <div className="absolute top-3 left-3 border-4 border-black-75 rounded-sm">
        {website.websiteLogo ? (
          <img
            src={website.websiteLogo}
            alt={website.websiteName}
            className="size-8 rounded-sm"
          />
        ) : (
          <div className="size-8 bg-electric-violet rounded-sm flex items-center justify-center text-sm">
            {website.websiteName?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="bg-black-50 w-full lg:h-64 rounded-sm"></div>
      <div className="flex w-full justify-between items-center mt-8">
        <div className="flex flex-col">
          <span className="text-xl font-inter text-white">
            {website.websiteName}
          </span>
          <p className="text-xs text-white/50">www.testing.com</p>
        </div>
        <Button
          className="text-xs pr-0"
          variant="none"
          padding="none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DotsHorizontalIcon />
        </Button>
      </div>
    </Link>
  );
}
