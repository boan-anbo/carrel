// go function file to list all files in a directory, same package

// Language: go

// Path: aliveline.go
// entry

package main

import (
	"log"
	"os"
	"strings"
)

func listFiles(dir string) []string {
	files, err := os.ReadDir(dir)
	if err != nil {
		log.Fatal(err)
	}

	var fileList []string
	for _, f := range files {
		fileList = append(fileList, f.Name())
	}

	return fileList
}

// list all files recursively and return absolute paths
func listFilesRecursive(dir string) []string {
	// trim string
	dir = strings.TrimSpace(dir)
	files, err := os.ReadDir(dir)
	if err != nil {
		log.Fatal(err)

	}

	var fileList []string
	for _, f := range files {

		if f.IsDir() {
			fileList = append(fileList, listFilesRecursive(dir+"/"+f.Name())...)
		} else {
			// return absolute path
			fileList = append(fileList, dir+"/"+f.Name())
			//fileList = append(fileList, f.Name())

		}
	}

	return fileList
}
