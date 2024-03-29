// 获取数据同时删除原数据
const myFilter = function (newArr, oldArr, callback) {
    for (let i = 0; i < oldArr.length; ) {
      const item = oldArr[i];
      let res=callback(item)
      if(res){
        newArr.push(item);
        oldArr.splice(i, 1);
      }
      else {
        i++;
      }
    }
  };

 // 还原成树形结构 
export  const toTree = ( oldMenu) => {
  const menu = [];
    if (!menu.length)
      myFilter(menu,oldMenu,item=>item.pid===0)
    for(const i in menu){
      const item=menu[i]
      
      let index=oldMenu.findIndex(element=>element.pid===item.id)
      if(index>=0 && !item.children){
        menu[i]['children']=[]
      }
      if(item.children){
        
        myFilter(item.children,oldMenu,element=>element.pid===item.id)
        toTree(item.children,oldMenu)
        
      }
      
    }
    return menu
  };


