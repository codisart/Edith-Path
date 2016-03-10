package main

import (
	"os"
	"golang.org/x/sys/windows/registry"
)

func main() {

	newPathStringValue := os.Args[1]

	if (newPathStringValue != "") {
		registryKey, err := registry.OpenKey(registry.LOCAL_MACHINE, "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment", registry.SET_VALUE)
		if (err != nil) {
			os.Exit(1)
		}

		defer registryKey.Close()
		newPathStringValue = newPathStringValue[1:len(newPathStringValue)-1]
		err2 := registryKey.SetExpandStringValue("Path" , newPathStringValue)
		if (err2 != nil) {
			os.Exit(1)
		}

		os.Exit(0)
	}

	os.Exit(1)
}
