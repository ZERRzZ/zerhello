# vscode snippets

```json
"打印": {
  "scope": "",
  "prefix": "log",
  "body": "console.log($1)",
  "description": "打印"
},
```

```json
"vue2 组件": {
  "scope": "",
  "prefix": "vue2",
  "body": [
    "<template>",
    "  $1",
    "</template>",
    "",
    "<script>",
    "export default {",
    "  data() {",
    "    return {",
    "      ",
    "    }",
    "  }",
    "};",
    "</script>",
    "",
    "<style scoped>",
    "",
    "</style>",
  ],
  "description": "vue2 初始模板"
}
```

```json
"React 函数组件": {
  "scope": "",
  "prefix": "react",
  "body": [
    "import './index.css'",
    "",
    "interface IProps {",
    "",
    "}",
    "",
    "export default function $1({ }: IProps) {",
    "",
    "  return (",
    "    $2",
    "  )",
    "",
    "}",
  ],
  "description": "React 函数组件"
},
```
