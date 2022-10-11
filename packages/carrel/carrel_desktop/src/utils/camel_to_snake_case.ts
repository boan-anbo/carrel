export const camel_to_snake_case = (str: string) => {
    return str.split(/(?=[A-Z])/).join('_').toLowerCase()
}
