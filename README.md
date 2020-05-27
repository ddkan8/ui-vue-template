# 安装依赖
npm install

# 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

浏览器访问 [http://localhost:7521](http://localhost:7521)

## 发布

# 构建生产环境
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix

## Browsers support

Modern browsers and Internet Explorer 10+.

Copyright (c) 2020-present USTCINFO
