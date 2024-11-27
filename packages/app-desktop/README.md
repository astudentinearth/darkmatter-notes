# `@darkwrite/app-desktop`

This package contains Darkwrite's Electron app.

## Files and directories

```
src
├── components       uncategorized components
│   └── ui           shadcn-ui components
├── context          global state
├── electron         main process code
│   ├── preload      preload scripts
│   ├── api          darkwrite APIs
│   ├── db           database code
│   └── lib          main process utils
├── features
│   ├── editor       darkwrite's editor
│   ├── home         home page code
│   ├── layout       layout code, including sidebar resize
│   ├── search       cmd/ctrl+k search ui
│   ├── settings     settings ui
│   └── sidebar      sidebar ui and logic
├── hooks            data fetching and ui logic
├── lib              misc utils and APIs
│   ├── api          wrappers around electron APIs
│   └── themes       built-in themes
└── test/setup.ts    vitest setup code
darkwrite-builder.js build automation script
```
