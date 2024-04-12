export const useDebug = false; // 啟用 debug 模式
export const numOfRow = 1000; // 設定假資料筆數

export type RowData = {
    idx: number;
    height: number;
    data: {
        date: string;
        stockSymbol: string;
        quantity: number;
        price: number;
    };
};

var fakeRecords: Array<RowData['data']> = [
    {
        date: '2023-01-05',
        stockSymbol: 'AAPL',
        quantity: 100,
        price: 150.25,
    },
    {
        date: '2023-02-15',
        stockSymbol: 'GOOGL',
        quantity: 50,
        price: 2000.75,
    },
    {
        date: '2023-03-20',
        stockSymbol: 'MSFT',
        quantity: 75,
        price: 250.5,
    },
];

export const rowData: Array<RowData> = Array.from({ length: numOfRow }).map((_, i) => {
    return {
        idx: i + 1,
        height: getRandomInt(300, 50),
        data: fakeRecords[getRandomInt(2, 0)],
    };
});

function getRandomInt(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
