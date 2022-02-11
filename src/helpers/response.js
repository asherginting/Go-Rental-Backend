const response = (res, message, result, stat=200)=>{
    let success = true;
    if(stat>=400){
        success = false;
    }
    const data = {success, message};
    if(result){
        data.result = result;
    }
    return res.status(stat).json(data);
};

module.exports = response;