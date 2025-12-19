import { memo, ReactNode } from 'react';

import NumberCounter from '@/components/numbers/NumberCounter';

interface MetaDataSectionProps {
    title: string;
    data: Record<string, string | number | undefined | ReactNode>;
}

export const PanelTitle = memo(({ title }: { title: string }) => {
    return (
        <span className="font-medium text-[12px] text-muted-foreground">
            {title.toUpperCase()}
        </span>
    );
});

export const MetaDataSection = memo(({ title, data }: MetaDataSectionProps) => {
    const renderRow = (
        title: string,
        value: string | number | undefined | ReactNode,
    ) => {
        return (
            <div key={title} className="grid grid-cols-24 gap-0">
                <div className="col-span-1"></div>
                <div className="col-span-7 h-full w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
                    {title}
                </div>
                <div className="col-span-16 h-full w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary">
                    {typeof value === 'number' ? (
                        <NumberCounter number={value} />
                    ) : (
                        value
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-2">
            <PanelTitle title={title} />
            {Object.entries(data).map(([key, value]) => {
                return renderRow(key, value);
            })}
        </div>
    );
});
