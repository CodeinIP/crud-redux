const getLocalData = (key) => {
  // console.log(key);
  if (key) {
    const data = localStorage.getItem(key);
    // console.log(data)
    return data;
  }
};
const saveLocalData = (key, value) => {
  console.log(key,value);
  if (key && value) {
    localStorage.setItem(key, value);
  }
};
const removeLocalData = (key)=>{
  if(key){
    localStorage.removeItem(key);
  }
}
export {getLocalData,saveLocalData,removeLocalData};
