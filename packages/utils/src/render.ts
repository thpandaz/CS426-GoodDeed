export const getIntials = (name: string) => {
    return name
    .split(' ')
    .map((n) => n[0])
    .join('')
}