# 页面标题可动态加载

## 第一步 在路由表中加字段 meta: {title: '标题'}

```js
{
  path: '',
  name: 'home',
  component: Home,
  props: true,
  meta: {
    title: '标题'
  }
}
```

## 在路由入口拦截设置

```js
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
})
```
