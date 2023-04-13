# Building Darkwrite
This page contains instructions on compiling Darkwrite from source code.  
## Introduction
To build Darkwrite, you must have npm and a Rust environment ready. Darkwrite uses Tauri 1.x as of writing, which supports building an installer package for Windows, a `.dmg` image for macOS, `.deb`, for Debian-based systems and `.AppImage` for all Linux distributions.  
Tauri hasn't added Flatpak support yet. Flatpak bundling support may be added in the future.  
A `PKGBUILD` file will be created for Arch Linux systems once Darkwrite reaches beta stage.

# First step for all platforms
Clone the repository and enter it.

# Building on Windows
I'm continuing development on Windows for now. As far as I'm concerned, Linux in a virtual machine runs Darkwrite faster than Edge WebView2. I had to cripple down blur effects quite a bit so Edge could handle it. I also had to recently switch to dnd-kit as drag-drop library, because HTML5 drag-drop and native file drop functionality doesn't work with Tauri on Windows for whatever reason.  

Darkwrite stores application data in `%USERPROFILE%/AppData/Roaming/io.github.astudentinearth.darkwrite` directory.
### C++ Build Tools Setup
Download the [Visual Studio Community installer.](https://visualstudio.microsoft.com/)
Once the installer launches, choose "Desktop development with C++" and "Windows 10 SDK" workloads to be installed.

### WebView2
WebView2 is required to run Darkwrite on Windows systems. **If you are running Windows 10 version 1803 (or later) or Windows 11, WebView2 is already installed.** If your system doesn't have WebView2 (you can check programs and features in control panel to be sure), [get the Evergreen Bootstrapper installer here.](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section)

### Rust
Go to https://www.rust-lang.org/tools/install and get rustup. The installer will launch in a terminal window and you will be asked 2 or 3 questions. Alternatively you can install the `Rustlang.Rustup` package using `winget`.

### npm
Download (preferably the latest version of) Node.js from the official site. It should come with npm by default.

## Build
Building is very straight forward. 
```
npm install
npm run tauri build
```

...should do it for you. The resulting package will be placed in `src-tauri\target\release`

# Building on Linux
Darkwrite stores application data at `$XDG_CONFIG_HOME/io.github.astudentinearth.darkwrite` or `$HOME/.config/io.github.astudentinearth.darkwrite`.
**Do NOT run Darkwrite with root privileges under any circumstances. Darkwrite doesn't access anywhere outside its configuration folder by default, but a bug in the backend might nuke your system, you never know.**
## System dependencies
Install the packages below that correspond to your distribution. (Source: Tauri Documentation)
**Make sure you update your system packages beforehand to avoid partial upgrades.**  
### Debian / Ubuntu
I recommend building on Ubuntu 22.04 (any flavor of Ubuntu is OK), which is also used for building with GitHub Actions. If you are on Linux Mint/LMDE, PeppermintOS, Kali Linux, Raspberry Pi OS or elementaryOS these should also work. *I probably will not package Darkwrite as a snap.*
```
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```
### Arch Linux
This should apply to pretty much every Arch-based system(including Garuda Linux and EndeavourOS), unless they replace these with custom repositories. I used Arch Linux extensively while creating Darkwrite, and it should run just fine. **Manjaro might have dependency issues when building with the future PKGBUILD since they hold packages back.** If you are using SteamOS I recommend just getting the AppImage, use your CPU power for your library instead :)
```
sudo pacman -Syu
sudo pacman -S --needed \
    webkit2gtk \
    base-devel \
    curl \
    wget \
    openssl \
    appmenu-gtk-module \
    gtk3 \
    libappindicator-gtk3 \
    librsvg \
    libvips
```
### Fedora (and its spins)
Fedora 36/37/38 and Nobara should work.
```
sudo dnf check-update
sudo dnf install webkit2gtk4.0-devel \
    openssl-devel \
    curl \
    wget \
    libappindicator-gtk3 \
    librsvg2-devel
sudo dnf group install "C Development Tools and Libraries"
```
### openSUSE
Both Leap and Tumbleweed editions should work fine.
```
sudo zypper up
sudo zypper in webkit2gtk3-soup2-devel \
    libopenssl-devel \
    curl \
    wget \
    libappindicator3-1 \
    librsvg-devel
sudo zypper in -t pattern devel_basis
```
### Nix
Go to https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-linux and follow instructions for NixOS. NixOS requires some configuration I can't explain here. I also have no idea about how Nix packaging works ¯\_(ツ)_/¯

## Rust
The following command is enough to install Rust. 
```curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh```  
**Disclaimer: The script does what it's supposed to, but if the URL gets compromised or anything, I'm not responsible. Don't blindly curl-bash a script.**  
Alternatively you can install using your distribution's package manager.

## Build
```
npm install
npm run tauri build
```
...will compile Darkwrite. It will drop the Debian package and the AppImage to somewhere in `src-tauri/target/release`

# Building on macOS
Disclaimer: I don't own a Mac. If you see any inaccuracy in these instructions, feel free to raise an issue or create a pull request. These instructions are based on Tauri's official documentation.
Accorring to Tauri API documentation, application data goes to `$HOME/Library/Application Support`.
## Dependencies
Install CLang and macOS development dependencies with the following command:
```xcode-select --install```

To install Rust, you can use the following command.  
```curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh```
**The same disclaimer I wrote on the Linux part still applies :)**

## Build
```
npm install
npm run tauri dev
```
...should drop a `.dmg` somewhere in `src-tauri/target/release`. **Note that the .dmg is not signed, so Apple might complain about unidentified developer. You can create an exception in System Preferences.**

# Updating manual builds
Darkwrite dependencies may get updated as a part of project progression. Therefore I recommend running `npm install` before every compilation to ensure correct node dependencies are available. I also recommend updating your Rust toolchain and Node.JS/npm from time to time. (If you are on Linux and installed Rust, node or npm using your package manager, they should get updated automatically with your system.)