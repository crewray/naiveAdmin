import { h,ref } from "vue";
import { NIcon } from "naive-ui";
import * as fa from "@vicons/fa";
import { getMenuApi } from "@/api/sys.js";
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuList = ref([]);
getMenuApi().then((res) => {
  if (res.status == 200) {
    // Object.assign(menuList,formatMenu(res.data));
    menuList.value=formatMenu(res.data)
    
  }
});
function formatMenu(menu) {
  const newMenu = menu.map((item) => {
    // console.log(item.icon)
    if (item.icon) {
      item.icon = renderIcon(fa[item.icon]);
    }
    // if(item.component){
    //   item.component=()=>import(item.component)
    // }
    if (item.children) {
      item.children = formatMenu(item.children);
    }
    return item
  });
  return newMenu
}
// menuList=formatMenu(menuList)

export { menuList };

