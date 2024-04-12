import type { Props_IntersectionZone } from './IntersectionZone';
import { memo, useCallback, useState } from 'react';
import { IntersectionZone } from './IntersectionZone';

type Props_IntersectionRow = {
    debug?: boolean;
    bound?: Props_IntersectionZone['bound'];
    className?: string;
    $content: (isIntersecting: boolean) => JSX.Element;
};

export const IntersectionRow: React.FC<Props_IntersectionRow> = memo(({ className, $content, debug, bound }) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    /**
     * 當進入畫面焦點時，設置 enable
     */
    const Fn = useCallback<Props_IntersectionZone['fn']>((_, entry) => {
        setIsIntersecting(entry.isIntersecting);
        debug && console.log({ enter: entry.isIntersecting });
    }, []);

    return (
        <IntersectionZone debug={debug} bound={bound} className={className} fn={Fn}>
            {$content(isIntersecting)}
        </IntersectionZone>
    );
});
