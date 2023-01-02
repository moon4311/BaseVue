const dateFormat = (dt,sep)=>{
    if(dt == '') return dt;
    if(sep ==null ) sep ='';
    let date = new Date(dt);
    return date.getFullYear() + sep
        + (date.getMonth()+1).toString().padStart(2,'0') + sep
        + date.getDate().toString().padStart(2,'0') + sep;
}

const addDate = (dt, type, num)=>{
    if(type=='Y'){
        dt.setFullYear( dt.getFulYear()+num);
    }else if(type=='m'){
        dt.setMonth(dt.getMonth()+num);
    }else if(type=='d'){
        dt.setDate(dt.getDate()+num);
    }
    return dt;
}


export { dateFormat, addDate }