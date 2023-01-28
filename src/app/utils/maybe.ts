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