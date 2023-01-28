export type Maybe<T> = <U>(maybe: {
    just(value: T): U,
    none(): U,
}) => U

export function None<T>(): Maybe<T> {
    return maybe => maybe.none()
}

export function Just<T>(value: T): Maybe<T> {
    return maybe => maybe.just(value)
}

export function getDefault<T>(maybe: Maybe<T>, defaultValue: T): T {
    return maybe({
        just: value => value,
        none: () => defaultValue
    })
}

export function map<T, U>(maybe: Maybe<T>, mapFn: (value: T) => U): Maybe<U> {
    return maybe({
        just: value => Just(mapFn(value)),
        none: () => None()
    })
}
