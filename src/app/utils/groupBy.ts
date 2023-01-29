export function groupBy<A, K, V, G>(ctx: {
    array: A[],
    selectCol: (value: A) => V,
    groupCol: (value: A) => K,
    group: (key: K, values: V[]) => G,
    eq: (key1: K, key2: K) => boolean,
}) {
    const selected = ctx.array.map(value => ({
        key: ctx.groupCol(value),
        value: ctx.selectCol(value),
    }))
    const grouped: { key: K, values: V[] }[] = []
    for (const {key, value} of selected) {
        let found = false
        for (const g of grouped) {
            if (ctx.eq(g.key, key)) {
                g.values.push(value)
                found = true
                break
            }
        }
        if (!found) grouped.push({key, values: [value]})
    }
    return grouped.map(g => ctx.group(g.key, [...g.values]))
}