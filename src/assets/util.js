let router = null;
const setRouter = (r)=>{
    router = r;
}

// 등록
const add = ()=>{
    router.push(router.currentRoute.value.path+"Add");
}
// 상세
const showInfo = (id)=>{
    router.push({path : router.currentRoute.value.path+"/"+id, params : { 'id': id}});
}

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

export { setRouter, add, showInfo, dateFormat, addDate }