package main

import (
	"bytes"
	"io/ioutil"
)

// this fucntion scan the file for marker with {{ and }} as delimiters and replace the marker with a list of provided key values.
// then returns the new content
func replaceMarkerInFile(filePath string, markerMap map[string]string) error {
	 
	// read file
	fileContent, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}

	// replace marker
	for k, v := range markerMap {
		fileContent = bytes.ReplaceAll(fileContent, []byte(k), []byte(v))
	}

	// return the new file content without writing to disk
	return ioutil.WriteFile(filePath, fileContent, 0644)

	
}