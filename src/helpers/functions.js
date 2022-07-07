export const convertBuffer = (data) =>{
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data)))
    return base64String

}