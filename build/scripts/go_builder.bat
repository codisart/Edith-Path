set GOPATH=C:\Go\src\
go get golang.org/x/sys/windows/registry
go build -ldflags -H=windowsgui -o go/edith-path.exe go/edith-path.go
