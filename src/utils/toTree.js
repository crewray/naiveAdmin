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
  
export  const reveal = (menu = [], oldMenu) => {
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
        reveal(item.children,oldMenu)
        
      }
      
    }
  };


