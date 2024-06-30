'use client';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';

import useCurrentTheme from '@/hooks/useCurrentTheme';

export default function ThemeSwitcherModal() {
  const { theme, toggleTheme } = useCurrentTheme();

  return (
    <div
      className="px-2 py-1 hover:bg-black-50 rounded w-full flex justify-start text-sm"
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-x-2">
          {theme === 'dark' ? (
            <SunIcon className="size-5" />
          ) : (
            <MoonIcon className="size-5" />
          )}
          <span>Theme</span>
        </div>
        <Switch
          onClick={() => toggleTheme()}
          checked={theme === 'light'}
          className="w-8 h-4 !bg-black-50"
          thumbClasses="
            size-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:bg-electric-violet
            data-[state=unchecked]:translate-x-0.5
          "
        />
      </div>
    </div>
  );
}
