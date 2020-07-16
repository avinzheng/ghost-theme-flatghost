# flat-ghost
一个响应式设计的扁平化多色 **Ghost v3.x** 博客主题，[主题预览](https://blog.avincheng.com)。


## Installing

前往 [releases](https://github.com/avincheng/ghost-theme-flatghost/releases) 页面下载最新版 zip 安装包，登录 Ghsot 博客管理后台上传并启用主题。

## Features

*   主题内置多个配色方案，支持 7 种配色方案切换；
*   扁平化设计，内置图片和图标均已做高清适配，文章图片自动高清适配；
*   响应式设计，移动设备采用安卓风格侧滑菜单（仿 Ionic 3 on Android）；
*   内置常见编程语言代码高亮（via Prism）；
*   侧边栏多种小工具支持（推荐文章、标签云、博客统计、关注）；
*   额外的社会化链接图标：GitHub、LinkedIn、知乎、微博、微信、QQ 。

## DIY

### 切换颜色

打开主题 `default.hbs` 文件，找到如下样式代码，根据需要保留自己需要的颜色方案。

```html
  {{!-- Styles --}}
  <style>
    :root {
      /* Color: Turquoise */
      --dark-color: #16A085;
      --standard-color: #1ABC9C;
      --light-color: #48C9B0;

      /* Color: Blue */
      /*--dark-color: #2980B9;*/
      /*--standard-color: #3498DB;*/
      /*--light-color: #5DADE2;*/

      /* Color: Green */
      /*--dark-color: #27AE60;*/
      /*--standard-color: #2ECC71;*/
      /*--light-color: #58D68D;*/

      /* Color: Red */
      /*--dark-color: #C0392B;*/
      /*--standard-color: #E74C3C;*/
      /*--light-color: #EC7063;*/

      /* Color: Orange */
      /*--dark-color: #D35400;*/
      /*--standard-color: #E67E22;*/
      /*--light-color: #F69036;*/

      /* Color: Yellow */
      /*--dark-color: #F39C12;*/
      /*--standard-color: #F1C40F;*/
      /*--light-color: #F4D313;*/

      /* Color: Purple */
      /*--dark-color: #8E44AD;*/
      /*--standard-color: #9B59B6;*/
      /*--light-color: #B574D0;*/
    }
  </style>
```

### 添加社会化链接

打开主题 `partials/widget-blog-follow.hbs` 文件，找到如下代码，根据需要修改。

```html
  <ul class="social">
<!--    <li>-->
<!--      <a href="https://github.com/avincheng/ghost-theme-flatghost"-->
<!--         title="GitHub"-->
<!--         target="_blank"-->
<!--         rel="noopener">-->
<!--        <i class="icon-social icon-social-github"></i>-->
<!--      </a>-->
<!--    </li>-->

    {{#if @site.facebook}}
      <li>
        <a href="{{facebook_url}}"
           title="FaceBook"
           target="_blank"
           rel="noopener">
          <i class="icon-social icon-social-facebook"></i>
        </a>
      </li>
    {{/if}}

    {{#if @site.twitter}}
      <li>
        <a href="{{twitter_url}}"
           title="Twitter"
           target="_blank"
           rel="noopener">
          <i class="icon-social icon-social-twitter"></i>
        </a>
      </li>
    {{/if}}

<!--    <li>-->
<!--      <a href=""-->
<!--         title="LinkedIn"-->
<!--         target="_blank"-->
<!--         rel="noopener">-->
<!--        <i class="icon-social icon-social-linkedin"></i>-->
<!--      </a>-->
<!--    </li>-->

<!--    <li>-->
<!--      <a href=""-->
<!--         title="ZhiHu"-->
<!--         target="_blank"-->
<!--         rel="noopener">-->
<!--        <i class="icon-social icon-social-zhihu"></i>-->
<!--      </a>-->
<!--    </li>-->

<!--    <li>-->
<!--      <a href=""-->
<!--         title="WeiBo"-->
<!--         target="_blank"-->
<!--         rel="noopener">-->
<!--        <i class="icon-social icon-social-weibo"></i>-->
<!--      </a>-->
<!--    </li>-->

<!--    <li>-->
<!--      <a href=""-->
<!--         title="WeChat"-->
<!--         target="_blank"-->
<!--         rel="noopener">-->
<!--        <i class="icon-social icon-social-wechat"></i>-->
<!--      </a>-->
<!--    </li>-->

<!--    <li>-->
<!--      <a href=""-->
<!--         title="QQ"-->
<!--         target="_blank"-->
<!--         rel="noopener">-->
<!--        <i class="icon-social icon-social-qq"></i>-->
<!--      </a>-->
<!--    </li>-->
  </ul>
```

## Planning

-   [x] 响应式设计
-   [x] 代码高亮显示
-   [x] 支持颜色切换
-   [ ] 独立存档页面

## License

MIT

