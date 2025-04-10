import { update } from './update'

// 即使 Rollup 将所有文件打包在一起，错误和日志仍然会指向原始源模块
console.log(
  '如果你在开发者工具中启用了 sourcemaps，点击 main.ts:5 -->'
)

update() 