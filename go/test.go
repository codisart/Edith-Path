package main

import (
	"os"
	"fmt"
	"golang.org/x/sys/windows/registry"
)

func main() {

	registryKey, err := registry.OpenKey(registry.LOCAL_MACHINE, "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment", registry.SET_VALUE)

	if err != nil {
		os.Stderr.WriteString(err.Error())
	}

	defer registryKey.Close()

	err2 := registryKey.SetExpandStringValue("Path" , "%SystemRoot%\\system32;%SystemRoot%;%SystemRoot%\\System32\\Wbem;%SYSTEMROOT%\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\OpenSSH\\bin;C:\\Users\\IEUser\\Downloads;C:\\Users\\IEUser\\Downloads;C:\\Users\\IEUser\\Downloads\\test;C:\\MinGW\\bin;C:\\Go\\bin;C:\\Git\\bin;C:\\artoo")

	if err2 != nil {
		os.Stderr.WriteString(err2.Error())
	}
}
