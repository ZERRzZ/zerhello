# vscode snippets

```json
"vue2": {
  "scope": "vue",
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
"react": {
  "scope": "javascriptreact,typescriptreact",
  "prefix": "react",
  "body": [
    "import './index.css'",
    "",
    "export default function $1() {",
    "",
    "  return (",
    "    <>",
    "      $2",
    "    </>",
    "  )",
    "",
    "}"
  ]
}
```