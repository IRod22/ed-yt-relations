export type Direction<T> = <U>(direction: {
    bothWays(discriptor: T): U,
    oneWay(fromDiscriptor: T, toDiscriptor: T): U,
}) => U

export function OneWay<T>(fromDiscriptor: T, toDiscriptor: T): Direction<T> {
    return direction => direction.oneWay(fromDiscriptor, toDiscriptor)
}

export function BothWays<T>(discriptor: T): Direction<T> {
    return direction => direction.bothWays(discriptor)
}

export function getFrom<T>(dir: Direction<T>): T {
    return dir({
        bothWays: discriptor => discriptor,
        oneWay: discriptor => discriptor,
    })
}

export function getTo<T>(dir: Direction<T>): T {
    return dir({
        bothWays: discriptor => discriptor,
        oneWay: (_, discriptor) => discriptor,
    })
}
