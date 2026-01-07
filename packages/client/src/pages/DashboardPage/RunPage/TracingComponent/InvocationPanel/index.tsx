import { memo } from 'react';
import {
    AccordionContent,
    AccordionTrigger,
    Accordion,
    AccordionItem,
} from '@/components/ui/accordion.tsx';
import { useTranslation } from 'react-i18next';

import { RemoveScrollBarStyle } from '@/styles.ts';
import { MetaDataSection } from '../ShareComponents.tsx';

const InvocationPanel = () => {
    const { t } = useTranslation();
    return (
        <div
            className="w-full h-full overflow-auto p-4 hide-scrollbar flex flex-col gap-6"
            style={{ ...RemoveScrollBarStyle }}
        >
            <MetaDataSection
                title={t('common.arguments')}
                data={{
                    model: 'gpt-4o',
                    stream: 'false',
                }}
            />
            <Accordion
                type="single"
                collapsible
                className="w-full border border-solid border-gray-200 rounded-md"
            >
                {[
                    {
                        label: 'Bob (user)',
                        children: '你好！',
                    },
                    {
                        label: 'Friday (assistant)',
                        children: '你好，我能帮你什么？',
                    },
                    {
                        label: 'Bob (user1)',
                        children: '请给我一个关于如何使用Python的简单示例。',
                    },
                ].map((item, index) => (
                    <AccordionItem
                        value={item.label}
                        className={`${index !== 0 ? 'border-t border-solid border-gray-200' : ''}`}
                    >
                        <AccordionTrigger className="px-4">
                            {item.label}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance px-4 pb-4">
                            <p>{item.children}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default memo(InvocationPanel);
