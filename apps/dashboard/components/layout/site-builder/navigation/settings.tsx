import LoadingSpinner from '@/components/saving';
import { Button } from '@/components/ui/button';
import SiteBuilderPublishModal from './publish-dropdown';

import { useAppSelector } from '@/utils/index';
import { website } from '@/store/slices/website-store';
import { updateWebsite } from '@/actions/websites/update';
import { publishSite } from '@/actions/websites/publish-website';
import { toast } from 'sonner';
import { Suspense } from 'react';
import UserDropdownMenu from '@/components/modals/user-dropdown-menu'

export default function SiteBuilderSettings() {
  const websiteObj = useAppSelector(website);

  // either update the website or publish it depending on if its been published before
  const handleWebsitePublish = () => {
    if (websiteObj.hasBeenPublished) {
      updateWebsite(websiteObj.websiteId, {
        ...websiteObj
      });
      toast.success('Website updated successfully');
    } else {
      publishSite(websiteObj.websiteId);
      toast.success('Website published successfully');
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <LoadingSpinner />
      <div className="flex group">
        <Button
          variant="secondary"
          className="!rounded-br-none !rounded-tr-none group-hover:!bg-white group-hover:text-black text-xs -right-1 !border-0"
          rounded="sm"
          size="sm"
          onClick={() => handleWebsitePublish()}
        >
          Publish
        </Button>
        <SiteBuilderPublishModal website={websiteObj} />
      </div>
      <div className="size-8">
        <UserDropdownMenu
          className="!size-8 text-sm"
          siteLogo={websiteObj?.websiteLogo}
        />
        </div>
    </div>
  );
}
