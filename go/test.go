package main

import (
	"fmt"
	"bufio"
	"os"
	"golang.org/x/sys/windows/registry"
)

func main() {
	k, err := registry.OpenKey(registry.LOCAL_MACHINE, "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment", registry.SET_VALUE)
	if err != nil {
		fmt.Println(err.Error())
	}
	defer k.Close()

	//_, _, err2 := registry.CreateKey(k, "Rtwo", registry.ALL_ACCESS)
	err2 := k.SetExpandStringValue("Path" , "%SystemRoot%\\system32;%SystemRoot%;%SystemRoot%\\System32\\Wbem;%SYSTEMROOT%\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\OpenSSH\\bin;C:\\Users\\IEUser\\Downloads;C:\\Users\\IEUser\\Downloads;C:\\Users\\IEUser\\Downloads\\test;C:\\MinGW\\bin;C:\\Go\\bin;C:\\Git;C:\\Rtwo")

	// s, t, err2 := k.GetStringValue("Rtwo")
	if err2 != nil {
		fmt.Println(err2.Error())
	}
	// fmt.Printf("Windows system root is %q\n", s)
	// fmt.Printf("Windows system root is %q\n", t)
	fmt.Print("Press 'Enter' to continue...")
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}


// C:\Go\bin\go.exe get golang.org/x/sys/windows
