const mode=(state=false, action)=>{
if(action.type==="myMode"){
    return state = action.payLoad;
}
else{
    return state;
}
}

// exporting the mode action
export default mode;