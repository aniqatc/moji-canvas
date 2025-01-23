import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Select from '@radix-ui/react-select';
import { CaretDown } from '@phosphor-icons/react';
import { themes } from '../../../assets/themes';
import { useCanvas } from '../../../contexts';

export default function ThemeSelector() {
  const { setCategory } = useCanvas();

  const [selectedTheme, setSelectedTheme] = useState(themes.find((t) => t.value === 'all'));

  return (
    <>
      <Select.Root
        onValueChange={(value) => {
          const theme = themes.find((t) => t.value === value);
          setSelectedTheme(theme);
          setCategory(theme.value);
        }}
      >
        <Select.Trigger
          className="mx-auto flex h-10 w-full items-center justify-center rounded border border-stone-200 bg-white/75 transition-all duration-300 hover:bg-active-gray h-sm:w-fit h-sm:px-2.5"
          aria-label="Select sticker category"
        >
          <div className="flex w-full items-center justify-center transition-all">
            <motion.img
              key={selectedTheme.id}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              src={selectedTheme.icon}
              alt={selectedTheme.label}
              className="size-8"
            />
            <Select.Icon>
              <CaretDown color="#000" weight="bold" />
            </Select.Icon>
          </div>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden rounded-lg border border-stone-200 bg-white p-1 text-[11px] shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{
                    delay: index * 0.075,
                  }}
                >
                  <Select.Item
                    value={theme.value}
                    className="flex cursor-pointer items-center gap-1 transition-all hover:bg-stone-100 focus-visible:bg-stone-100"
                  >
                    <img src={theme.icon} alt={theme.label} className="size-7" />
                    <Select.ItemText className="hidden">{theme.label}</Select.ItemText>
                  </Select.Item>
                </motion.div>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <div>Theme</div>
    </>
  );
}
