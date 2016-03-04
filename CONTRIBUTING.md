# Edith-path

You should only use Windows.

## Development environment

Fork this repository and clone your fork on your local machine.

Install electron prebuilt binary version 35.1.
https://github.com/atom/electron/releases/tag/v0.35.1

Add the electron.exe to your PATH.

You should be able to launch the app with the command `electron .`



## Building the electron app to distribute

The build tool is npm. So you'll need to install node.js.

### Build the go executable

You'll need to install Go and Git and add them to the PATH.

* `npm run go` : install the modules and build the executable.

### Build the electron app installer

* `npm run tools` : install the two node modules used for building

* `npm run package` : Crée la version packagée de l'app

* `npm run setup` : Crée un installauer windows
