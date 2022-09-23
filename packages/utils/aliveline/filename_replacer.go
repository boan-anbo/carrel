package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

// this function replaces all the keywork [[P]] in the filename with a list of key and value, ignoring cases

func replaceFileAndDirNames(dirPath string, markerMap map[string]string) error {
	// print the dirPath
	fmt.Println("Replace file name in folder: ", dirPath)

	// get all files in the directory
	fileList := listFiles(dirPath)

	// loop through all files
	for _, fileName := range fileList {

		// empty new file name string

		// replace marker markerValue between [[ and ]], with regular expression, ignoring cases
		newFileName := replaceFileOrFolderName(markerMap, fileName)

		newFileName = replaceFileOrFolderName(markerMap, newFileName)

		// rename the file
		err := os.Rename(dirPath+"/"+fileName, dirPath+"/"+newFileName)

		if err != nil {
			return err
		}

	}

	return nil
}

func replaceFileOrFolderName(markerMap map[string]string, fileName string) string {
	// use lower case for marker and markerValue
	newFileName := fileName

	for marker, markerValue := range markerMap {

		// replace the marker in the file name with regular expression replacement, ignoring case
		regex := regexp.MustCompile(`(?i)\[\[` + strings.ToLower(marker) + `\]\]`)

		// assign the new file name to the new file name string
		newFileName = regex.ReplaceAllString(newFileName, markerValue)
	}
	// rename the file
	return newFileName
}
