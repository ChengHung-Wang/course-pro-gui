export type MenuItem = {
  icon: string;
  displayName: string;
  click: object;
};
export type MenusConfig = {
  items: Array<MenuItem>;
  active: Number;
};
