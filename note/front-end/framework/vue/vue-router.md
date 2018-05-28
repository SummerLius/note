<!-- TOC -->

- [Vue-router](#vue-router)
    - [安装](#安装)
    - [介绍](#介绍)
    - [基础](#基础)
        - [开始](#开始)
        - [动态路由匹配](#动态路由匹配)
        - [嵌套路由](#嵌套路由)
        - [编程式导航](#编程式导航)
        - [命名路由](#命名路由)
        - [命名视图](#命名视图)
        - [重定向和别名](#重定向和别名)
        - [向路由组件传递props](#向路由组件传递props)
        - [HTML5 History 模式](#html5-history-模式)
    - [进阶](#进阶)
        - [导航守卫](#导航守卫)
        - [路由元信息](#路由元信息)
        - [过渡动效](#过渡动效)
        - [数据获取](#数据获取)
        - [滚动行为](#滚动行为)
        - [赖加载](#赖加载)
    - [API文档](#api文档)
        - [<router-link>](#router-link)
        - [<router-link> Props](#router-link-props)
        - [Router构造选项](#router构造选项)
        - [Router实例属性](#router实例属性)
        - [Router实例方法](#router实例方法)
        - [路由对象](#路由对象)
        - [对组件注入](#对组件注入)
    - [参考](#参考)

<!-- /TOC -->

# Vue-router

## 安装

## 介绍

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：
- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为
现在开始起步或尝试一下我们的[示例](https://github.com/vuejs/vue-router/tree/dev/examples)吧 (查看仓库的 README.md 来运行它们)。

## 基础

### 开始

- 用 Vue.js + vue-router 创建单页应用，是非常简单的。使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 vue-router 添加进来，我们需要做的是，将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。

### 动态路由匹配
- 动态路由匹配
    - 动态路由：动态路径参数，以冒号开头方式，`{ path: '/user/:id', component: User }`
    - 一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到     this.$route.params，可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户  的 ID：
        ```js
        const User = {
          template: '<div>User {{ $route.params.id }}</div>'
        }
        ```
    - 你可以在一个路由中设置多段『路径参数』，对应的值都会设置到 $route.params 中。例如：
        ```table
        模式	                         匹配路径	          $route.params
        /user/:username	                /user/evan	         { username: 'evan' }
        /user/:username/post/:post_id	/user/evan/post/123	 { username: 'evan',    post_id: 123 }
        ```
    - 除了 $route.params 外，$route 对象还提供了其它有用的信息，例如，$route.query（如果    URL 中有查询参数）、$route.hash 等等。你可以查看 API 文档 的详细说明。
- 响应路由参数变化
    - 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。
    - 复用组件时，想对路由参数的变化作出响应的话，有以下两种方法
        1. 你可以简单地 watch（监测变化） $route 对象
            ```js
            const User = {
              template: '...',
              watch: {
                '$route' (to, from) {
                  // 对路由变化作出响应...
                }
              }
            }
            ```
        2. 或者使用 2.2 中引入的 beforeRouteUpdate 守卫：
            ```js
            const User = {
              template: '...',
              beforeRouteUpdate (to, from, next) {
                // react to route changes...
                // don't forget to call next()
              }
            }
            ```
- 高级匹配模式
    - vue-router 使用 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。查看它的 [文档](https://github.com/pillarjs/path-to-regexp#parameters) 学习高阶的路径匹配，还有 [这个例子](https://github.com/vuejs/vue-router/blob/next/examples/route-matching/app.js) 展示 vue-router 怎么使用这类匹配。
- 匹配优先级
    - 有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

### 嵌套路由

- 实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：
    ```
    /user/foo/profile                     /user/foo/posts
    +------------------+                  +-----------------+
    | User             |                  | User            |
    | +--------------+ |                  | +-------------+ |
    | | Profile      | |  +------------>  | | Posts       | |
    | |              | |                  | |             | |
    | +--------------+ |                  | +-------------+ |
    +------------------+                  +-----------------+
    ```
- 借助 vue-router，使用嵌套路由配置，就可以很简单地表达这种关系。
- 接着上节创建的 app：
    ```html
    <div id="app">
      <router-view></router-view>
    </div>
    ```
    ```js
    const User = {
      template: '<div>User {{ $route.params.id }}</div>'
    }
    
    const router = new VueRouter({
      routes: [
        { path: '/user/:id', component: User }
      ]
    })
    ```
- 这里的 \<router-view\> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 \<router-view\>。例如，在 User 组件的模板添加一个 \<router-view\>：
    ```js
    const User = {
      template: `
        <div class="user">
          <h2>User {{ $route.params.id }}</h2>
          <router-view></router-view>
        </div>
      `
    }
    ```
- 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：
    ```js
    const router = new VueRouter({
      routes: [
        { path: '/user/:id', component: User,
          children: [
            {
              // 当 /user/:id/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: 'profile',
              component: UserProfile
            },
            {
              // 当 /user/:id/posts 匹配成功
              // UserPosts 会被渲染在 User 的 <router-view> 中
              path: 'posts',
              component: UserPosts
            }
          ]
        }
      ]
    })
    ```
- **要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**
- 你会发现，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。
- 此时，基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：
    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/user/:id', component: User,
          children: [
            // 当 /user/:id 匹配成功，
            // UserHome 会被渲染在 User 的 <router-view> 中
            { path: '', component: UserHome },
    
            // ...其他子路由
          ]
        }
      ]
    })
    ```

### 编程式导航

- 除了使用 \<router-link\> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
- `router.push(location, onComplete?, onAbort?)`
    - **注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。**
    - 想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
    - 当你点击 \<router-link\> 时，这个方法会在内部调用，所以说，点击 \<router-link :to="..."\> 等同于调用 router.push(...)。
    - 即：
        1. 声明式：\<router-link :to="..."\>
        2. 编程式：router.push(...)
    - 该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
        ```js
        // 字符串
        router.push('home')
        
        // 对象
        router.push({ path: 'home' })
        
        // 命名的路由
        router.push({ name: 'user', params: { userId: 123 }})
        
        // 带查询参数，变成 /register?plan=private
        router.push({ path: 'register', query: { plan: 'private' }})
        ```
    - 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
        ```js
        const userId = 123
        router.push({ name: 'user', params: { userId }}) // -> /user/123
        router.push({ path: `/user/${userId}` }) // -> /user/123
        // 这里的 params 不生效
        router.push({ path: '/user', params: { userId }}) // -> /user
        ```
    - 同样的规则也适用于 router-link 组件的 to 属性。
    - 在 2.2.0+，可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。
    - 注意：如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 `beforeRouteUpdate` 来响应这个变化 (比如抓取用户信息)。
- `router.replace(location, onComplete?, onAbort?)`
    - 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
        1. 声明式：\<router-link :to="..." replace\>
        2. 编程式：router.replace(...)
- `router.go(n)`
    - 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
        ```js
        // 在浏览器记录中前进一步，等同于 history.forward()
        router.go(1)
        
        // 后退一步记录，等同于 history.back()
        router.go(-1)
        
        // 前进 3 步记录
        router.go(3)
        
        // 如果 history 记录不够用，那就默默地失败呗
        router.go(-100)
        router.go(100)
        ```
- 操作 History
    - 你也许注意到 router.push、 router.replace 和 router.go 跟 [window.history.pushState、 window.history.replaceState 和 window.history.go](https://developer.mozilla.org/en-US/docs/Web/API/History)好像， 实际上它们确实是效仿 window.history API 的。
    - 因此，如果你已经熟悉 [Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API)，那么在 vue-router 中操作 history 就是超级简单的。
    - 还有值得提及的，vue-router 的导航方法 （push、 replace、 go） 在各类路由模式（history、 hash 和 abstract）下表现一致。

### 命名路由

- 有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。
    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/user/:userId',
          name: 'user',
          component: User
        }
      ]
    })
    ```
- 要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
    ```html
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    ```
- 这跟代码调用 router.push() 是一回事：
    ```js
    router.push({ name: 'user', params: { userId: 123 }})
    ```
- 这两种方式都会把路由导航到 /user/123 路径。

### 命名视图

- 命名视图
    - 有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。
    - 你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。
        ```html
        <router-view class="view one"></router-view>
        <router-view class="view two" name="a"></router-view>
        <router-view class="view three" name="b"></router-view>
        ```
    - 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）：
        ```js
        const router = new VueRouter({
          routes: [
            {
              path: '/',
              components: {
                default: Foo,
                a: Bar,
                b: Baz
              }
            }
          ]
        })
        ```
- 嵌套命名视图
    - 我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 router-view 组件。我们以一个设置面板为例：
        ```
        /settings/emails                                       /settings/profile
        +-----------------------------------+                  +------------------------------+
        | UserSettings                      |                  | UserSettings                 |
        | +-----+-------------------------+ |                  | +-----+--------------------+ |
        | | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
        | |     +-------------------------+ |                  | |     +--------------------+ |
        | |     |                         | |                  | |     | UserProfilePreview | |
        | +-----+-------------------------+ |                  | +-----+--------------------+ |
        +-----------------------------------+                  +------------------------------+
        ```
    - Nav 只是一个常规组件。
    - UserSettings 是一个视图组件。
    - UserEmailsSubscriptions、UserProfile、UserProfilePreview 是嵌套的视图组件。
    - 注意：我们先忘记 HTML/CSS 具体的布局的样子，只专注在用到的组件上
    - UserSettings 组件的 \<template\> 部分应该是类似下面的这段代码：
        ```html
        <!-- UserSettings.vue -->
        <div>
          <h1>User Settings</h1>
          <NavBar/>
          <router-view/>
          <router-view name="helper"/>
        </div>
        ```
    - 嵌套的视图组件在此已经被忽略了，但是你可以在[这里](https://jsfiddle.net/posva/22wgksa3/)找到完整的源代码
    - 然后你可以用这个路由配置完成该布局：
        ```js
        {
          path: '/settings',
          // 你也可以在顶级路由就配置命名视图
          component: UserSettings,
          children: [{
            path: 'emails',
            component: UserEmailsSubscriptions
          }, {
            path: 'profile',
            components: {
              default: UserProfile,
              helper: UserProfilePreview
            }
          }]
        }
        ```
    - 一个可以工作的示例的 demo 在[这里](https://jsfiddle.net/posva/22wgksa3/)。

### 重定向和别名

- 重定向
    - 重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b：
        ```js
        const router = new VueRouter({
          routes: [
            { path: '/a', redirect: '/b' }
          ]
        })
        ```
    - 重定向的目标也可以是一个命名的路由：
        ```js
        const router = new VueRouter({
          routes: [
            { path: '/a', redirect: { name: 'foo' }}
          ]
        })
        ```
    - 甚至是一个方法，动态返回重定向目标：
        ```js
        const router = new VueRouter({
          routes: [
            { path: '/a', redirect: to => {
              // 方法接收 目标路由 作为参数
              // return 重定向的 字符串路径/路径对象
            }}
          ]
        })
        ```
    - 注意[导航守卫](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 /a 路由添加一个 beforeEach 或 beforeLeave 守卫并不会有任何效果。
    - 其它高级用法，请参考[例子](https://github.com/vuejs/vue-router/blob/next/examples/redirect/app.js)。
- 别名
    - 『重定向』的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b，那么『别名』又是什么呢？
    - **路径 /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样**
    - 上面对应的路由配置为：
        ```js
        const router = new VueRouter({
          routes: [
            { path: '/a', component: A, alias: '/b' }
          ]
        })
        ```
    - 『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
    - 更多高级用法，请查看[例子](https://github.com/vuejs/vue-router/blob/next/examples/route-alias/app.js)。

### 向路由组件传递props

- 路由组件传参
    - 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
    - 使用 props 将组件和路由解耦：
        1. 取代与 $route 的耦合
            ```js
            const User = {
              template: '<div>User {{ $route.params.id }}</div>'
            }
            const router = new VueRouter({
              routes: [
                { path: '/user/:id', component: User }
              ]
            })
            ```
        2. 通过 props 解耦
            ```js
            const User = {
              props: ['id'],
              template: '<div>User {{ id }}</div>'
            }
            const router = new VueRouter({
              routes: [
                { path: '/user/:id', component: User, props: true },
            
                // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
                {
                  path: '/user/:id',
                  components: { default: User, sidebar: Sidebar },
                  props: { default: true, sidebar: false }
                }
              ]
            })
            ```
    - 这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。
- 布尔模式
    - 如果 props 被设置为 true，route.params 将会被设置为组件属性。
- 对象模式
    - 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
        ```js
        const router = new VueRouter({
          routes: [
            { path: '/promotion/from-newsletter', component: Promotion, props: {        newsletterPopup: false } }
          ]
        })
        ```
- 函数模式
    - 你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
        ```js
        const router = new VueRouter({
          routes: [
            { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
          ]
        })
        ```
    - URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
    - 请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

### HTML5 History 模式

- ...待整理...

## 进阶

### 导航守卫

- 概要
    - 正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
    - 记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。
- 全局守卫
    - 你可以使用 `router.beforeEach` 注册一个全局前置守卫:
        ```js
        const router = new VueRouter({ ... })

        router.beforeEach((to, from, next) => {
          // ...
        })
        ```
    - 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
    - 每个守卫方法接收三个参数：
        1. `to: Route`: 即将要进入的目标 路由对象
        2. `from: Route`: 当前导航正要离开的路由
        3. `next: Function`: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
            - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
            - next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
            - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
            - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
    - **确保要调用 next 方法，否则钩子就不会被 resolved**
- 全局解析守卫
    - 在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。
- 全局后置钩子
    - 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
        ```js
        router.afterEach((to, from) => {
          // ...
        })
        ```
- 路由独享守卫
    - 你可以在路由配置上直接定义 beforeEnter 守卫：
        ```js
        const router = new VueRouter({
          routes: [
            {
              path: '/foo',
              component: Foo,
              beforeEnter: (to, from, next) => {
                // ...
              }
            }
          ]
        })
        ```
    - 这些守卫与全局前置守卫的方法参数是一样的。
- 组件内的守卫
    - 最后，你可以在路由组件内直接定义以下路由导航守卫：
        1. beforeRouteEnter
        2. beforeRouteUpdate (2.2 新增)
        3. beforeRouteLeave
        ```js
        const Foo = {
          template: `...`,
          beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
          },
          beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
          },
          beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
          }
        }
        ```
    - beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
    - 不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
        ```js
        beforeRouteEnter (to, from, next) {
          next(vm => {
            // 通过 `vm` 访问组件实例
          })
        }
        ```
    - 注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以**不支持**传递回调，因为没有必要了。
        ```js
        beforeRouteUpdate (to, from, next) {
          // just use `this`
          this.name = to.params.name
          next()
        }
        ```
    - 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
        ```js
        beforeRouteLeave (to, from , next) {
          const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
          if (answer) {
            next()
          } else {
            next(false)
          }
        }
        ```
- 完整的导航解析流程
    1. 导航被触发。
    2. 在失活的组件里调用离开守卫。
    3. 调用全局的 beforeEach 守卫。
    4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    5. 在路由配置里调用 beforeEnter。
    6. 解析异步路由组件。
    7. 在被激活的组件里调用 beforeRouteEnter。
    8. 调用全局的 beforeResolve 守卫 (2.5+)。
    9. 导航被确认。
    10. 调用全局的 afterEach 钩子。
    11. 触发 DOM 更新。
    12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

### 路由元信息

- 定义路由的时候可以配置 meta 字段：
    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          children: [
            {
              path: 'bar',
              component: Bar,
              // a meta field
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    })
    ```
- 那么如何访问这个 meta 字段呢？
- 首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录
- 例如，根据上面的路由配置，/foo/bar 这个 URL 将会匹配父路由记录以及子路由记录。
- 一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 meta 字段。
- 下面例子展示在全局导航守卫中检查元字段：
    ```js
    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // 确保一定要调用 next()
      }
    })
    ```


### 过渡动效

### 数据获取

- 概要
    - 有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：
        1. **导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
        2. **导航完成之前获取**：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。
    - 从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。
- 导航完成后获取数据
    - 当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 `created` 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。
    - 假设我们有一个 Post 组件，需要基于 $route.params.id 获取文章数据：
        ```html
        <template>
          <div class="post">
            <div class="loading" v-if="loading">
              Loading...
            </div>
        
            <div v-if="error" class="error">
              {{ error }}
            </div>
        
            <div v-if="post" class="content">
              <h2>{{ post.title }}</h2>
              <p>{{ post.body }}</p>
            </div>
          </div>
        </template>
        ```
        ```js
        export default {
          data () {
            return {
              loading: false,
              post: null,
              error: null
            }
          },
          created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
          },
          watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
          },
          methods: {
            fetchData () {
              this.error = this.post = null
              this.loading = true
              // replace getPost with your data fetching util / API wrapper
              getPost(this.$route.params.id, (err, post) => {
                this.loading = false
                if (err) {
                  this.error = err.toString()
                } else {
                  this.post = post
                }
              })
            }
          }
        }
        ```
- 在导航完成前获取数据
    - 通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。
        ```js
        export default {
          data () {
            return {
              post: null,
              error: null
            }
          },
          beforeRouteEnter (to, from, next) {
            getPost(to.params.id, (err, post) => {
              next(vm => vm.setData(err, post))
            })
          },
          // 路由改变前，组件就已经渲染完了
          // 逻辑稍稍不同
          beforeRouteUpdate (to, from, next) {
            this.post = null
            getPost(to.params.id, (err, post) => {
              this.setData(err, post)
              next()
            })
          },
          methods: {
            setData (err, post) {
              if (err) {
                this.error = err.toString()
              } else {
                this.post = post
              }
            }
          }
        }
        ```
    - 在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。
        
### 滚动行为

- 滚动行为
    - 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
    - **注意: 这个功能只在支持 history.pushState 的浏览器中可用。**
    - 当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：
        ```js
        const router = new VueRouter({
          routes: [...],
          scrollBehavior (to, from, savedPosition) {
            // return 期望滚动到哪个的位置
          }
        })
        ```
    - scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    - 这个方法返回滚动位置的对象信息，长这样：
        1. { x: number, y: number }
        2. { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
    - 如果返回一个 falsy (译者注：falsy 不是 false，[参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy))的值，或者是一个空对象，那么不会发生滚动。
    - 举例：
        ```js
        scrollBehavior (to, from, savedPosition) {
          return { x: 0, y: 0 }
        }
        ```
    - 对于所有路由导航，简单地让页面滚动到顶部。
    - 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
        ```js
        scrollBehavior (to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition
          } else {
            return { x: 0, y: 0 }
          }
        }
        ```
    - 如果你要模拟“滚动到锚点”的行为：
        ```js
        scrollBehavior (to, from, savedPosition) {
          if (to.hash) {
            return {
              selector: to.hash
            }
          }
        }
        ```
    - 我们还可以利用[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)更细颗粒度地控制滚动。查看完整例子请[移步这里](https://github.com/vuejs/vue-router/blob/next/examples/scroll-behavior/app.js)。
- 异步滚动
    - 2.8.0 新增
    - 你也可以返回一个 Promise 来得出预期的位置描述：
        ```js
        scrollBehavior (to, from, savedPosition) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ x: 0, y: 0 })
            }, 500)
          })
        }
        ```
    - 将其挂载到从页面级别的过渡组件的事件上，令其滚动行为和页面过渡一起良好运行是可能的。但是考虑到用例的多样性和复杂性，我们仅提供这个原始的接口，以支持不同用户场景的具体实现。

### 赖加载

## API文档

### <router-link>


### <router-link> Props 


### Router构造选项


### Router实例属性


### Router实例方法


### 路由对象


### 对组件注入

## 参考

- [官网：Vue-Router](https://router.vuejs.org/zh-cn/)


