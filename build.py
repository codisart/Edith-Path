# -*-coding:utf-8 -*

import sys
from cx_Freeze import setup, Executable

base = None
includefiles = ['style.qss','Edith_Path.exe.manifest']

if sys.platform == "win64":
	base = "Win64GUI"
elif sys.platform == "win32":
	base = "Win32GUI"

setup(
	name = "Edith_Path",
	version = "0.2",
	description = "L'édition du PATH tout simplement.",
	options = {'build_exe': {'include_files':includefiles}}, 
	executables = [Executable("Edith_Path.pyw", base = base)],
)