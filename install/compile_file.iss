; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{58462437-D461-42CD-BB81-F3A5EC42E37A}
AppName=Edith Path
AppVersion=0.1 alpha
;AppVerName=Edith Path 0.1 alpha
AppPublisher=punkka
DefaultDirName={pf}\Edith Path
DisableDirPage=yes
DefaultGroupName=Edith Path
DisableProgramGroupPage=yes
LicenseFile=C:\projets\python\Edith-Path\LICENSE
OutputDir=C:\projets\python\Edith-Path\install
OutputBaseFilename=Edith_Path_64_setup_0.1_alpha
Compression=lzma
SolidCompression=yes

[Languages]
Name: "french"; MessagesFile: "compiler:Languages\French.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\Edith_Path.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\_bz2.pyd"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\_ctypes.pyd"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\Edith_Path.exe.manifest"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\library.zip"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\PySide.QtCore.pyd"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\PySide.QtGui.pyd"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\PySide.QtNetwork.pyd"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\pyside-python3.3.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\python33.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\QtCore4.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\QtGui4.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\QtNetwork4.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\shiboken-python3.3.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\style.qss"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\projets\python\Edith-Path\build\exe.win-amd64-3.3\unicodedata.pyd"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\Edith Path"; Filename: "{app}\Edith_Path.exe"
Name: "{commondesktop}\Edith Path"; Filename: "{app}\Edith_Path.exe"; Tasks: desktopicon

