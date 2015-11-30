 [![bitHound Overalll Score](https://www.bithound.io/github/codisart/Edith-Path/badges/score.svg)](https://www.bithound.io/github/codisart/Edith-Path)

Edith-Path
==========


A little tool allowing to add easily a folder to the environnement variable PATH

How to use
-----------


You'll need to install node.js et electron.


Compilation
-----------

lancer la ligne de commande

npm install -g electron-packager
npm install -g innosetup-compiler


innosetup-compiler build/compile_file.iss

electron-packager . Edith-path --platform=win32 --arch=x64 --version=0.35.1 --out="build/release/" --cache="build/cache/" --overwrite --ignore ="build"
electron-packager src/ Edith-path --all --version=0.33.3 --out="build/release/"

mt.exe -manifest "Edith_Path.exe.manifest" -outputresource:"release/Edith-path-win32-x64/Edith-path.exe"


Release
-------
