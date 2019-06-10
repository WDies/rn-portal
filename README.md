# rn-portal

基于 react-native 的传送门

## install

``` shell
$ npm install rn-portal
```

## Example

``` jsx
// 出口
<PortalOut id="main" />

// 入口
<Portal to="main" visible>
  <UserComponents />
</Portal>


```

## Portal

#### props
- to  传送门出口ID（与ProtalOut id 一致）
- visible  传送门开关

## ProtalOut
- id 传送门出口ID
- style 可以设置传送门样式
- 默认
  ``` css
    {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  ```