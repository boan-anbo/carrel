package main

import (
	"log"
	"os"
)

// func to list all root level folders under the dir path
func listAllRootLevelFoldersAndFiles(dir string) []string {

	// get all files in the directory
	fileList := listFiles(dir)

	// loop through all files
	var dirList []string
	for _, fileName := range fileList {

		// get file info
		fileInfo, err := os.Stat(dir + "/" + fileName)

		if err != nil {
			log.Fatal(err)
		}

		// check if it is a directory
		if fileInfo.IsDir() {
			dirList = append(dirList, fileName)
		}

	}

	return dirList
}
