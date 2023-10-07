export const mode=(modeData)=>{
    return(dispath)=>{
        dispath({
            type:"myMode",
            payLoad:modeData
        })
    }
}