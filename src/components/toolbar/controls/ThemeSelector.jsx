import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Select from '@radix-ui/react-select';
import { CaretDown } from '@phosphor-icons/react'
import { themes } from '../../../assets/themes';

export default function ThemeSelector() {
    const [selectedTheme, setSelectedTheme] = useState(themes.find(t => t.id === 'all'));

    return (
    <>
        <Select.Root onValueChange={(value) => {
            const theme = themes.find(t => t.id === value);
            setSelectedTheme(theme);
        }}>
            <Select.Trigger className="flex items-center justify-center w-full h-10 bg-white/75 rounded border border-stone-200
                          hover:bg-active-gray transition-all duration-300"
                        aria-label="Select sticker category">
                <div className="flex items-center justify-center w-full transition-all">
                    <motion.img
                        key={selectedTheme.id}
                        initial={{ scale: 0.6 }} animate={{ scale: 1 }}
                        src={selectedTheme.icon}
                        alt={selectedTheme.label}
                        className="size-8"
                    />
                    <Select.Icon>
                        <CaretDown color="#000" weight="bold"/>
                    </Select.Icon>
                </div>
            </Select.Trigger>

            <Select.Portal>
                    <Select.Content
                        className="text-[11px] p-1 bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden"
                        position="popper">
                        <Select.Viewport>
                            {themes.map((theme, index) => (
                                <motion.div key={theme.id}
                                            initial={{opacity: 0, y: 5}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 5}}
                                            transition={{
                                                delay: index * 0.075
                                            }}>
                                    <Select.Item value={theme.id}
                                                 className="transition-all flex gap-1 items-center cursor-pointer hover:bg-stone-100">
                                        <img
                                            src={theme.icon}
                                            alt={theme.label}
                                            className="size-7"
                                        />
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
)
}