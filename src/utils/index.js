export const printIfAvailable = (attribute) => {
    if(attribute) return attribute
    else return "-"
}

export const firstLetterInCapital = (query) => {
    return query[0].toUpperCase() + query.slice(1,query.length)
}