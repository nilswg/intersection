import { memo, useEffect, useMemo, useRef } from 'react';

export type Props_IntersectionZone = {
    debug?: boolean;
    bound?: { upper?: number; lower?: number };
    className?: string;
    children: React.ReactNode;
    fn: (observer: IntersectionObserver, entry: IntersectionObserverEntry) => void;
};

type IntersectionZoneCompoundComponent = React.FC<Props_IntersectionZone> & {
    RedLine: React.FC<{ style?: React.CSSProperties }>;
};

export const IntersectionZone: IntersectionZoneCompoundComponent = ({ debug = false, bound = Default.Bound, className, children, fn }) => {
    const zone = useRef<HTMLDivElement | null>(null);

    const offset = useMemo(
        () => ({
            upper: $offset(bound.upper),
            lower: $offset(bound.lower),
        }),
        [bound],
    );

    useEffect(() => {
        if (!zone?.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                /**
                 * @example
                 * ```
                 *
                 *  if (entry.isIntersecting) {
                 *    console.log("enter");
                 *  }
                 *
                 *  if (!entry.isIntersecting) {
                 *    console.log("leave");
                 *  }
                 *
                 * ```
                 */
                fn(observer, entry);
            },
            /**
             * threshold
             *  敏感度，越小越敏感
             *
             *
             * rootMargin
             *  進入交點的範圍: (下 - 上 -) 、 (正值向外；負值向內)
             *
             *  第 1 個參數影響:
             *  當螢幕(viewport)從下而上滑動，螢幕上邊界進入交點中的距離，負值時該距離變長，正值變短。
             *
             *  第 3 個參數影響:
             *  當螢幕(viewport)從上而下滑動，螢幕下邊界進入交點中的距離，負值時該距離變長，正值變短。
             */
            {
                threshold: 0,
                rootMargin: `${offset.lower}% 0px ${offset.upper}% 0px`,
            },
        );

        observer.observe(zone.current);

        return () => {
            if (zone?.current) {
                observer.unobserve(zone.current);
                observer.disconnect();
            }
        };
    }, [fn, offset]);

    return (
        <div className={className} ref={zone} style={{ position: 'relative' }}>
            {debug && <IntersectionZone.RedLine style={{ top: `-${offset.upper}vh` }} />}
            {children}
            {debug && <IntersectionZone.RedLine style={{ bottom: `-${offset.lower}vh` }} />}
        </div>
    );
};

/**
 * 顯示 rootMargin 的上下邊界的紅線
 */
IntersectionZone.RedLine = memo(({ style }) => {
    const styles = {
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        border: 'solid 1px red',
        ...style,
    } as React.CSSProperties;
    return <div className="IntersectionZoneRedLine" style={styles}></div>;
});

const Default = {
    Ratio: 1,
    BoundOffset: 100,
    Bound: {
        upper: 1,
        lower: 1,
    },
};

// 設定 rootMargin 的上下邊界
const $offset = (ratio: number = Default.Ratio) => {
    return Default.BoundOffset * ratio;
};
