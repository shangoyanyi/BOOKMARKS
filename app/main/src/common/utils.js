/* 
*  this answer is the most suggested on stackoverflow
*  http://stackoverflow.com/questions/2647867/how-to-determine-if-variable-is-undefined-or-null
*/ 
function isNull (obj){
    return obj == null;
}

/* 
*  this method returns true ONLY when obj is an empty object
*/ 
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
        return false;
        }

    return true && JSON.stringify(obj) === JSON.stringify({});
}

export {isNull, isEmpty};

