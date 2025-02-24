export default function capitalizeWord(text:string){
    if (!text) return ""
    const words = text.split(" ")
    let accText = ""
    for (const word of words){
        accText+=word[0].toUpperCase() + word.slice(1) + " "
    }
    return accText.trim();
}