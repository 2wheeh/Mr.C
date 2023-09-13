# mrc-ui

`Mr.C` 의 UI 프로젝트입니다.
`yarn berry` 의 [`workspaces`](https://yarnpkg.com/features/workspaces) 기능으로 아래의 프로젝트들을 관리합니다.

| name              | description                                    |
| ----------------- | ---------------------------------------------- |
| mr-c.app          | `Mr.C` 의 메인 서비스 프로젝트                 |
| common-components | 공통으로 사용하는 컴포넌트를 담당하는 프로젝트 |
| common-utils      | 공통으로 사용하는 유틸리티를 담당하는 프로젝트 |

## 설치하기

1. `yarn` 이 설치되어 있지 않다면 `yarn` 을 설치합니다.
   ```bash
   npm install -g yarn
   ```
   or
   ```bash
   brew install yarn
   ```
2. 의존성을 설치합니다.
   `.yarnrc.yml` 에 정의된 yarn 버전 (`yarn berry`) 으로 설치됩니다.

   ```bash
   yarn install --immutable
   ```

## 구조

`ui/packages` 에 프로젝트들이 위치하며, 전체적인 구조는 다음과 같습니다:

```
 ui/
 ├── .yarn
 ├── package.json
 ├── ...
 └── packages/
     ├── mr-c.app/
     │   ├── package.json
     │   └── ...
     ├── common-components/
     │   ├── package.json
     │   └── ...
     ├── common-utils/
     │   ├── package.json
     │   └── ...
     └── ...(more packages)
```

## 스크립트 실행

개별 프로젝트의 스크립트는 `ui`의 루트 경로에서 `yarn workspace ${프로젝트명} 스크립트` 로 실행할 수 있습니다.

```json
// ui/package.json
"scripts": {
  "mr-c.app": "yarn workspace @mrc/mr-c.app",
  "common-components": "yarn workspace @mrc/common-components",
  ...
}
```

ex. `mr-c.app` 프로젝트의 `dev` 스크립트 실행

```bash
yarn mr-c.app dev
```

## 프로젝트간 참조

1. `yarn workspace` 로 관리되는 프로젝트는 해당 프로젝트의 패키지명 (`package.json`의 `name`) 으로 식별되며, [`workspace:` 프로토콜](https://yarnpkg.com/features/workspaces#cross-references)을 따라 참조관계를 설정합니다.

   ```json
   // ui/packages/mr-c.app/package.json
   "dependencies": {
      "@mrc/common-components": "workspace:*",
      "@mrc/common-utils": "workspace:*",
      ...
   }

   ```

2. 각 프로젝트는 `TypeScript` 로 작성되었으며, 공용으로 사용되는 프로젝트를 미리 트랜스파일 하지 않습니다.
   다른 프로젝트를 참조할 경우, `npm` 을 통해 배포된 패키지가 아닌 다른 워크스페이스의 소스코드를 직접 사용합니다.

   `nextjs` 프로젝트에서 다른 워크스페이스의 프로젝트를 참조하는 경우, `next.config` 의 [`transpilePackages`](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages) 에 추가합니다.

   ```javascript
   // ui/packages/mr-c.app/next.config.js
   module.exports = {
      transpilePackages: [
         '@mrc/common-components',
         '@mrc/common-utils',
         ...
      ],
      ...
   }
   ```

   > `transpilePackage` 에 추가되어 `nextjs` 가 트랜스파일하는 경우, `nextjs` 의 컴파일러(SWC)는 해당 프로젝트의 로컬 `tsconfig` 를 참조하지 않습니다. 따라서 참조되는 프로젝트는 `paths` 설정을 통한 alias 대신 상대 경로를 사용하여 코드를 작성해야합니다.

## 프로젝트 추가

1. `ui/packages` 의 하위 디렉토리로 프로젝트를 추가합니다.
   ```
   ...
    packages
    ├── mr-c.app
    ├── common-components
    ├── common-utils
    ...
    ├── new-package <- 추가된 프로젝트
    │   ├── package.json
    ...
   ```
2. `yarn install` 을 실행하여 `yarn` 이 추가된 프로젝트를 인식하도록 합니다.
3. `ui/package.json` 에 스크립트를 추가합니다.

   ```json
   // ui/package.json

   "scripts": {
   ...
   "new-package": "yarn workspace ${new-package의 패키지명}"
   }
   ```
