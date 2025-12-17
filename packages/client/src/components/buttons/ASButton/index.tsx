import { ReactNode, RefObject, ButtonHTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Extended button props that include tooltip and placement configuration.
 */
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: RefObject<HTMLButtonElement> | null;
    tooltip: string;
    children?: ReactNode;
    icon?: ReactNode;
    variant?:
        | 'link'
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | null
        | undefined;
}

/**
 * Secondary button with tooltip support and configurable placement.
 * Uses Ant Design's default type with minimal styling.
 */
const SecondaryButton = ({ tooltip, children, icon, ...restProps }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span>
                    <Button {...restProps}>
                        {children}
                        {icon}
                    </Button>
                </span>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    );
};

/**
 * Props for the switch button component that toggles between active/inactive states.
 */
interface SwitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    tooltip: string;
    title?: string;
    activeIcon?: ReactNode;
    inactiveIcon?: ReactNode;
    active: boolean;
}

/**
 * Toggle button that switches between active and inactive states.
 * Changes background color, text color, and icon based on the `active` prop.
 */
const SwitchButton = ({
    tooltip,
    title,
    activeIcon,
    inactiveIcon,
    active,
    ...restProps
}: SwitchButtonProps) => {
    // Dynamic styling based on active state
    const bgColor = active ? 'var(--secondary)' : 'transparent';
    const color = active ? 'var(--secondary-foreground)' : 'var(--hint-color)';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    style={{ background: bgColor, color: color }}
                    className="as-switch-button"
                    variant="outline"
                    {...restProps}
                >
                    {title}{active ? activeIcon : inactiveIcon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
};

export { SecondaryButton, SwitchButton };
