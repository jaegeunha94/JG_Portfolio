# 개발 환경
* Telegraf 1.23 버전 기준
    * Windows
        * Go  >=1.18 (1.18.0 recommended)
            * 아래에서는 1.18.5 버전으로 진행

# 세팅 
## 1. Installation of Go
* VSCode 하단에서 현재 프로젝트의 Go 버전을 확인할 수 있습니다.
* 설치된 Go Version이 1.18보다 낮다면,  VSCode에서 Go SDK를 다운로드 받을 수 있습니다.

```
# 1.18.5 버전의 Go SDK 설치
go install golang.org/dl/go1.18.5@latest
go1.18.5 download
```

## 2. Clone the Telegraf repository:
Telegraf Git Repository를 원하는 폴더에 Clone 합니다.

`git clone https://github.com/influxdata/telegraf.git`

## 3. settings.json 수정
* golangci-lint를 적용하기 위해 .vscode/setting.json 파일을 아래와 같이 수정합니다.
* golangci-lint를 설치하기 위해서는 Go 버전이 1.19 이상이어야 합니다.
* 1.19 이상의 Go 환경에서 golangci-lint를 설치합니다.
  - go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

```
{
  "go.toolsEnvVars": {
    "GO111MODULE": "on"
  },
  "editor.renderControlCharacters": true,
  "editor.largeFileOptimizations": false,
  "editor.formatOnSave": true,
  "editor.renderWhitespace": "none",
  "editor.wordWrap": "on",
  "files.eol": "\n",
  "go.lintOnSave": "package",
  "go.lintTool": "golangci-lint",
  "go.lintFlags": ["--fast"],
  "go.autocompleteUnimportedPackages": true,
  "go.formatTool": "goimports",
  "go.enableCodeLens": {
    // "references": false,
    "runtest": true
  },
  "prettier.singleQuote": true,
  "prettier.bracketSpacing": false,
  "prettier.semi": false,
  "prettier.trailingComma": "es5",
  "prettier.arrowParens": "avoid",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "diffEditor.ignoreTrimWhitespace": false
}
```

## 4. VSCode에서 markdownlint Extenstion 설치
* Markdown 파일을 수정할 때 필요한 Extension을 설치합니다.

## 5. launch.json 수정
아래는 Telegraf Debuging을 위한 launch.json 설정입니다.

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Server",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "showLog": true,
      "buildFlags": "-ldflags='-X main.version=1.18.2-snet'",
      "program": "${workspaceFolder}/cmd/telegraf",
      "output": "windows/telegraf_debug.exe",
      "env": {},
      "args": [
        // "--once", // just once run
        "--test", // without output plugin
        "--debug", // log level
        "--input-filter=oracledb", // apply the oracledb input plugin only
        "--config=${workspaceFolder}\\etc\\telegraf_win_test.conf" // "\\" for Windows path
      ]
    },
  ]
}
```

## 6. Run make from the source directory
Telegraf를 빌드하는 명령어는 아래와 같습니다.

`make telegraf`