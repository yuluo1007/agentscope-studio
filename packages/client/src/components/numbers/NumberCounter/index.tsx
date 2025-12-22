import { CSSProperties, memo } from 'react';
import SlotCounter from 'react-slot-counter';
import { formatNumber } from '@/utils/common';

/**
 * Props for animated number counter.
 * `number` is displayed with thousand separators; optional `style` applies to wrapper.
 */
interface Props {
    number: number;
    style?: CSSProperties;
}

/**
 * Animated numeric display based on react-slot-counter.
 * Starts from 0 once and animates to the given number.
 */
const NumberCounter = ({ number, style = {} }: Props) => {
    const formattedNumber = formatNumber(number);
    const match = /([0-9.,\s\u00A0]*)([KMBT]?)$/.exec(formattedNumber);
    const numericPart = match ? match[1] : formattedNumber;
    const unitPart = match ? match[2] : '';
    return (
        <div style={{ ...style }} className="flex items-center">
            <SlotCounter
                startValue={0}
                startValueOnce
                value={numericPart}
                sequentialAnimationMode
                // useMonospaceWidth
                />
            {unitPart && <span>{unitPart}</span>}
        </div>
    );
};

export default memo(NumberCounter);
