package main

import (
	"fmt"
	"bufio"
	"os"
	"golang.org/x/sys/windows/registry"
)

func main() {
	k, err := registry.OpenKey(registry.LOCAL_MACHINE, "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment", registry.QUERY_VALUE)
	if err != nil {
		fmt.Println("error1")
	}
	defer k.Close()

	err = k.SetExpandStringValue("Path" , "%SystemRoot%\\system32;%SystemRoot%;%SystemRoot%\\System32\\Wbem;%SYSTEMROOT%\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\OpenSSH\\bin;C:\\Users\\IEUser\\Downloads;C:\\Users\\IEUser\\Downloads;C:\\Users\\IEUser\\Downloads\\test;C:\\MinGW\\bin;C:\\Go\\bin;C:\\Git")
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Print("Press 'Enter' to continue...")
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}


// C:\Go\bin\go.exe get golang.org/x/sys/windows
