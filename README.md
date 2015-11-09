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


innosetup-compiler install/compile_file.iss

electron-packager src/ Edith-path --platform=linux --arch=x64 --version=0.33.3 --out="build/" --cache="cache/" --overwrite
electron-packager src/ Edith-path --all --version=0.33.3 --out="build/"


Release
-------
