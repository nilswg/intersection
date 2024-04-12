# @nilswg/intersection


## 開發 (使用 Vite)

```
pnpm run dev
```


## 打包 (使用 Tsup)

輸出到 dist 目錄下方，此外版本號會自動加 1 。

```
pnpm run build
```


## IntersectionRow 使用範例

面對負責的表單

```js
import { IntersectionRow } from '@nilswg/intersection'

const IntersectionExample = ({ rowDataArray }) => {
    return (
        <div>
            {rowDataArray.map((row) => (
                <IntersectionRow
                    key={row.idx}
                    $content={(isIntersecting) =>
                        isIntersecting ? (
                            <Show data={row} />
                        ) : (
                            <Hidden keepHeightTo={row.height} />
                        )
                    }
                />
            ))}
        </div>
    )
}

const Show = ({ data }) => {
    /* 在視線焦點內，則展示元件中的細節與資料 */
}

const Hidden = ({ keepHeightTo }) => {
    /* 不在視線焦點內，隱藏元件，但維持同高度 */
}

```


## IntersectionRow - Debug 模式

```js

import { IntersectionRow } from '@nilswg/intersection'

<IntersectionRow debug /> // 啟用 debug 模式

```

設置 debug 屬性後，會在元件上下標示出紅線，標示出該容器的視線焦點範圍。

以元件為起點，upper、lower 分別代表上與下的距離。

該距離單位為"預設距離的倍率"，預設值為 1。

設置越小(最小為 0)，視線焦點的範圍與元件越近。

```bash


    ------------------------------------------- 紅線
                        ^
                        | bound.upper
                        |
                -----------------
                |               |
                |    你的元件    |
                |               |
                -----------------
                        |
                        | bound.lower
                        v
    ------------------------------------------- 紅線

```

因此，你可以根據實際的畫面高度，透過 bound 來設置視線焦點的範圍。

```js

<IntersectionRow bound={{
    upper: 0.25,
    lower: 0.25,
}} debug />

```


