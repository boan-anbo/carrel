package main

import (
	"bytes"
	"os"
)

// this fucntion scan the file for marker with {{ and }} as delimiters and replace the marker with a list of provided key values.
// then returns the new content
func replaceMarkerInAllFileContent(dirPath string, markerMap map[string]string) error {
	println("Replace marker in files under: ", dirPath)

	// check if it's a file
	fileInfo, err := os.Stat(dirPath)
	if err != nil {
		panic(err)
	}

	if fileInfo.IsDir() {
		// list all files in the directory recursively
		fileList := listFilesRecursive(dirPath)

		// loop through all files

		for _, absoluteFialePaths := range fileList {

			replaceMarkerInFileContent(absoluteFialePaths, markerMap)

		}
	}

	return nil
}

func replaceMarkerInFileContent(filePath string, markerMap map[string]string) {

	// print
	println("Replace marker in file: ", filePath)
	// read file
	fileContent, err := os.ReadFile(filePath)
	if err != nil {
		panic(err)
	}

	// replace marker content between {{ and }}, with regular expression, ignoring cases
	for marker, content := range markerMap {
		fileContent = bytes.ReplaceAll(fileContent, []byte("{{"+marker+"}}"), []byte(content))
	}
	// return the new file content without writing to disk
	err = os.WriteFile(filePath, fileContent, 0644)
	if err != nil {
		panic(err)
	}
}
