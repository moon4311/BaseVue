import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

const whiteList = ['Redirect', 'login'];

export type RouteItem = Partial<RouteLocationNormalized> & {
  //fullPath: string;
  // path: string;
  // name: string;
  // hash: string;
  // meta: object;
  // params: object;
  // query: object;
  path: string;
  name: string;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

//保留固定路由
function retainAffixRoute(list: any[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(route:any) {
      this.tabsList = route;
    },
    addTabs(route:any): boolean {
      //if (whiteList.includes(route.name)) return false;
      //const isExists = this.tabsList.some((item) => item.path == route.path);
      //if (!isExists) {
        this.tabsList.push(route);
      //}
      return true;
    },
    // closeLeftTabs(route) {
    //   // 关闭左侧
    //   const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
    //   this.tabsList = this.tabsList.filter((item, i) => i >= index || (item?.meta?.affix ?? false));
    // },
    // closeRightTabs(route) {
    //   // 关闭右侧
    //   const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
    //   this.tabsList = this.tabsList.filter((item, i) => i <= index || (item?.meta?.affix ?? false));
    // },
    // closeOtherTabs(route) {
    //   // 关闭其他
    //   this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath || (item?.meta?.affix ?? false));
    // },
    // closeCurrentTab(route) {
    //   // 关闭当前页
    //   const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
    //   this.tabsList.splice(index, 1);
    // },
    // closeAllTabs() {
    //   // 关闭全部
    //   console.log(retainAffixRoute(this.tabsList));
    //   this.tabsList = retainAffixRoute(this.tabsList);
    // },
  },
});
