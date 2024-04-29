'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavigationItem from '@/components/layout/dashboard/navigation-item';

// icon imports
import MaterialSymbolsHomeOutlineRounded from '@/ui/icons/home';
import MaterialSymbolsSettingsOutlineRounded from '@/ui/icons/settings';
import MaterialSymbolsBuildOutlineRounded from '@/ui/icons/build';
import {
  ActivityLogIcon,
  BarChartIcon,
  ChatBubbleIcon,
  DesktopIcon,
  PlusIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { getWebsite } from '@/utils/websites/website.get';
import getClientUser from '@/utils/user/user-client-session';
import { useEffect, useState } from 'react';
import type { websites } from '@prisma/client';

export default function NavigationItems({ className, ...props }) {
  // get the users websites
  const [websites, setWebsites] = useState<websites[]>([]);

  useEffect(() => {
    const getUserWebsites = async () => {
      const user = await getClientUser();
      const fetchedWebsites = await getWebsite<websites[]>(
        { userId: user.data.user.id },
        true
      );
      setWebsites(fetchedWebsites);
    };
    getUserWebsites();
  }, []);

  const navItems = [
    {
      name: 'Overview',
      link: '/dashboard',
      icon: <MaterialSymbolsHomeOutlineRounded />,
      expanded: false
    },
    {
      name: 'Sites',
      link: '/dashboard/',
      icon: <DesktopIcon />,
      expanded: false,
      nested: [
        ...websites.map((website) => ({
          name: website.websiteName,
          link: `/site/${website.websiteId}`,
          icon: <DesktopIcon />
        })),
        {
          name: 'New Site',
          link: '/site/',
          icon: <PlusIcon />
        }
      ]
    },
    {
      name: 'Site Builder',
      link: '/site-builder',
      icon: <MaterialSymbolsBuildOutlineRounded />,
      expanded: false
    },
    {
      name: 'Analytics',
      link: '/analytics',
      icon: <BarChartIcon />,
      expanded: false
    },
    {
      name: 'Logs',
      link: '/logs',
      icon: <ActivityLogIcon />,
      expanded: false
    },
    {
      name: 'separator'
    },
    {
      name: 'Support',
      link: '/support',
      icon: <ChatBubbleIcon />,
      expanded: false
    }
  ];

  return (
    <nav
      className={cn(
        className,
        'font-poppins h-full flex flex-col justify-between'
      )}
      {...props}
    >
      <ul className="flex flex-col gap-y-1">
        <motion.span
          className="text-xs uppercase text-white/50 mx-2 mb-2"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Menu
        </motion.span>
        {navItems.map((item, index) =>
          item.name === 'separator' ? (
            <div
              key={`${item.name}-${index}`}
              className="w-auto h-px bg-black-50 my-3 mx-2"
            />
          ) : (
            <NavigationItem
              key={`${item.name}-${index}`}
              index={index}
              opts={item}
            />
          )
        )}
      </ul>
      <div>
        <motion.div
          className="py-3"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
        >
          <Link
            href="/pricing"
            className="flex items-center border-2 hover:bg-black-75 border-transparent duration-300 pl-2 pr-4 h-8 rounded-lg hover:cursor-pointer"
          >
            <div className="flex items-center gap-x-2 font-kanit leading-loose text-white/80">
              <div className="size-4"></div>
              <span className="text-base">Plans</span>
            </div>
          </Link>
        </motion.div>
        <motion.div
          className="py-3"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
        >
          <Link
            href="/settings"
            className="flex items-center border-2 hover:bg-black-75 border-transparent duration-300 pl-2 pr-4 h-8 rounded-lg hover:cursor-pointer"
          >
            <div className="flex items-center gap-x-2 font-kanit leading-loose text-white/80">
              <div className="size-4">
                <MaterialSymbolsSettingsOutlineRounded />
              </div>
              <span className="text-base">Settings</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}
