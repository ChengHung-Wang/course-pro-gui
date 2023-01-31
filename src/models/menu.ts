type MenuItem =  {
    icon: string,
    displayName: string,
    click: object
}
type MenusConfig = {
    items: Array<MenuItem>,
    active: Number
}