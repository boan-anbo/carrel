// go function file to list all files in a directory, same package

// Language: go

// Path: main.go
// entry

package main

import (
	"io/ioutil"
	"log"
)


func listFiles(dir string) []string {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Fatal(err)
	}

	var fileList []string
	for _, f := range files {
		fileList = append(fileList, f.Name())
	}

	return fileList
}

// list all files recursively
func listFilesRecursive(dir string) []string {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Fatal(err)
	}

	var fileList []string
	for _, f := range files {
		if f.IsDir() {
			fileList = append(fileList, listFilesRecursive(f.Name())...)
		} else {
			fileList = append(fileList, f.Name())
		}
	}

	return fileList
}

