export const convertToDate = (date: string)=>{
    return date.split("-").reverse().join("/");
}