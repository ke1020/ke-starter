module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        browsers: "last 2 versions",
        // 启用自动添加浏览器前缀，这里启用了 grid 布局的支持
        autoprefixer: { grid: true },
        // 指定使用哪个阶段的规范，可以是 0、1、2、3 或 "autoprefixer"。阶段越高，使用的规范越新。
        stage: 3,
        // 用于启用或禁用特定的 CSS 特性
        features: {
          "custom-properties": true, // 启用自定义属性
          "nesting-rules": true, // 启用嵌套规则
        },
      },
    ],
  ],
};
