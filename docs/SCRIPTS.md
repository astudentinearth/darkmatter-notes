# Scripts in workspace root

## `dev`

Runs the Electron app for development.

> It also runs `tsup` for `@darkwrite/common` package to watch for changes there too.

## `build:desktop`

Creates a production build of Darkwrite.

> It runs [`darkwrite-builder.js`](../packages/app-desktop/darkwrite-builder.js) in the `@darkwrite/app-desktop` package, which automatically detects your operating system and performs the build.

## `build:common`

Builds the `@darkwrite/common` package.

## `test:all`

Runs unit and component tests in all packages.

## `test:coverage`

Runs unit and component tests in all packages with v8 coverage reports.
