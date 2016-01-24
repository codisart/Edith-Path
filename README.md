 [![bitHound Overalll Score](https://www.bithound.io/github/codisart/Edith-Path/badges/score.svg)](https://www.bithound.io/github/codisart/Edith-Path)

Edith-Path
==========


A little tool allowing to add easily a folder to the environnement variable PATH

How to dev
-----------

You'll need to install node.js et electron.


Compilation
-----------

Tous les commandes sont des scripts npm (npm run ?)
    - tools : installe les modules nécessaires au packaging.

    - setup : Crée un installauer windows

    - package : Crée la version packagée de l'app

    - manifest : Intégre un manifest avec des droits élévés

go
  go build -ldflags -H=windowsgui test.go

Release
-------

Inno Setup
----------

[Registry]
Root: HKCR; Subkey: "Directory\shell\Add to Path"; Flags: uninsdeletekeyifempty
Root: HKCR; Subkey: "Directory\shell\Add to Path\command"; Flags: uninsdelete; ValueType: string; ValueName: ""; ValueData: "{app}"
Root: HKCR; Subkey: "Directory\Background\shell\Add to Path"; Flags: uninsdeletekeyifempty
Root: HKCR; Subkey: "Directory\Background\shell\Add to Path\command"; Flags: uninsdelete; ValueType: string; ValueName: ""; ValueData: "{app}"
