/**
 * 使用 IntersectionRow 來展示一個模擬股票表格的範例
 */

import type { FC } from 'react';
import type { RowData } from './rowData';
import { memo } from 'react';
import { rowData, useDebug } from './rowData';
import { IntersectionRow as Row } from '../../components/IntersectionRow';

export const StockTables: FC = memo(() => {
    return (
        <div className="min-h-screen bg-slate-600 text-white">
            <ManyTexts />
            <div className="grid w-full grid-cols-4">
                <div className="col-span-1 border-[1px]">交易日期</div>
                <div className="col-span-1 border-[1px]">股票代號</div>
                <div className="col-span-1 border-[1px]">數量</div>
                <div className="col-span-1 border-[1px]">價格</div>
                {rowData.map((row) => (
                    <Row
                        debug={useDebug}
                        key={row.idx}
                        className="col-span-full grid grid-cols-[subgrid]"
                        $content={(isIntersecting: boolean) => (isIntersecting ? <RealContent {...row} /> : <Loading ht={row.height} />)}
                    />
                ))}
            </div>
            <ManyTexts />
        </div>
    );
});

const RealContent: FC<RowData> = memo(({ data, height }) => {
    return (
        <>
            <ExampleCol style={{ height: height + 'px' }}>{data.date}</ExampleCol>
            <ExampleCol style={{ height: height + 'px' }}>{data.stockSymbol}</ExampleCol>
            <ExampleCol style={{ height: height + 'px' }}>{data.quantity}</ExampleCol>
            <ExampleCol style={{ height: height + 'px' }}>{data.price}</ExampleCol>
        </>
    );
});

const ExampleCol: FC<{ children: React.ReactNode; style: React.CSSProperties }> = memo(({ children, style }) => {
    return (
        <div className="IntersectionCol col-span-1 border-[1px] p-4" style={style}>
            {children}
        </div>
    );
});

const Loading: FC<{ ht: number }> = memo(({ ht }) => {
    return (
        <div className="w-full" style={{ height: ht + 'px' }}>
            loading...
        </div>
    );
});

const ManyTexts: FC = () => (
    <div className="h-[200vh] w-full bg-slate-700">
        <div className="w-full" />
    </div>
);
