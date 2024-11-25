# 0.2.0-alpha.3

## 🌟 Features

-   Added striked text

# 0.2.0-alpha.2

## 🌟 Features

-   Added option to use native window frame
-   Added option to use custom window frame on macOS as an experimental feature
-   Notes can have custom background/text colors

## ✨ Improvements and fixes

-   Fixed potential performance issues when typing on the custom font box
-   Reworked note customization UI so it's not obnoxious anymore
-   Headings now follow the theme better

# 0.2.0-alpha.1

## ⚠️ Breaking changes

-   Directories in which application data is stored has changed. App data will be stored in a subdirectory named `darkwrite-data` when running production builds, and `darkwrite-data-nightly` when running development builds. If you are upgrading from 0.1.0-alpha.x, navigate to Darkwrite's data directory (you can use the application menu for this), move `data.db`, `settings.json` and `notes/` into `darkwrite-data/`.
-   Alternatively, create a backup before upgrading and restore from the backup after upgrading.

## 🌟 Features

-   Import and use custom themes
-   New dark themes: Catppuccin Macchiato, Frappé
-   New light themes: Catppuccin Latte (experimental)
-   Themes can now define the color for favorite stars

## ✨ Improvements and fixes

-   New backups now include a date in their file names by default.
-   Tweaked emoji picker styles to better follow theme preferences
-   Fixed overflow of file chooser button in restore dialog when a long path is chosen

## 🛠️ Technical changes

-   App data is now stored in an isolated folder, which opens the door to safe development sessions without risking data and simplifies the code responsible from backups.

# 0.1.0-alpha.2

## Features

-   Export entire workspace as HTML
-   Create backup of all settings and notes
-   Restore from backups
-   Added an even darker theme

## Improvements and fixes

-   Tweaked default font settings to match different systems
    -   Default UI font is now empty, meaning it will follow system by default
    -   Other fonts now include fallbacks to system defaults
-   Tweaked font settings to preview the font as you type
-   Home and settings pages are now more responsive
-   Tweaked dates in home page
-   Fixed unreachable drag handle bug

## Technical changes

-   Created an experimental build script (darkwrite-builder.js)
    -   Automates the build process by checking for the operating system and handles rebuilds by removing old artifacts

# 0.1.0-alpha.1

Features (that work)

-   Creating, editing, deleting and moving notes
-   Adding notes to favorites
-   Reordering all notes on the sidebar as well as your favorites
-   Keeping notes in the trash before removing them permanently
-   The editor, included blocks, and the formatting bubble
-   Comes with 2 themes: Darkwrite's default theme and Catppuccin Mocha
-   Pick your own accent color
-   All fonts are customizable
-   Search
-   HTML import and export

Features that don't work

-   You can't change background/text colors yet
-   Any button/text box/switch that is disabled are features that are not implemented yet
