# Development docs

## Running development builds

Install packages by invoking `yarn` at the root of the source tree. When the dependencies are installed, run `yarn dev`.

> [!TIP]  
> Set the environment variable `DW_WITHOUT_ELECTRON` to `1` if you want to run the frontend development server only, without launching Electron.

## Tooling

Darkwrite uses `yarn` for package management. `vite-plugin-electron` is used to bundle the app. Changes to source code triggers hot module reload during development. Changes to main process code automatically restarts the app.

### Node versions not matching with better-sqlite3

This issue may happen in some cases. If this happens, use `yarn workspace @darkwrite/app-desktop rebuild` to recompile better-sqlite3.
