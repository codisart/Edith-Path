package main

import (
	"fmt"
	"math/rand"
	"golang.org/x/sys/windows/registry"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))


	k, err := registry.OpenKey(registry.LOCAL_MACHINE, `SOFTWARE\Microsoft\Windows NT\CurrentVersion`, registry.QUERY_VALUE)
	if err != nil {
		log.Error(err)
	}
	defer k.Close()

	s, _, err := k.GetStringValue("SystemRoot")
	if err != nil {
		log.Error(err)
	}
	fmt.Printf("Windows system root is %q\n", s)
}

// set GOROOT=E:\Projects\go\go1.5.2.windows-amd64\go
// set GOPATH=E:\Projects\Edith-Path
// .\go.exe build test.go
