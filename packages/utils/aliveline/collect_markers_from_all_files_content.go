package main

// this function collection all markers with {{ and }} as delimiters from all files in the source folder recursively
import (
	"golang.org/x/exp/slices"
	"os"
	"path/filepath"
	// import regex
	"regexp"
)

func collectMarkersFromAllFilesContent(sourceFolder string) []string {
	// get all files in the source folder recursively
	var allFiles []string

	err := filepath.Walk(sourceFolder, func(path string, info os.FileInfo, err error) error {
		// make sure it's a file not a folder
		if !info.IsDir() {
			allFiles = append(allFiles, path)
		}
		return nil
	})

	if err != nil {
		panic(err)
	}

	// collect all markers from all file contents
	var allMarkers []string

	for _, file := range allFiles {
		markers := collectMarkersFromFile(file)
		// add to all markers if not in all markers
		for _, marker := range markers {
			if !slices.Contains(allMarkers, marker) {
				allMarkers = append(allMarkers, marker)
			}
		}

	}

	// for each marker, add it to the map if it is not in the map
	// return the map
	return allMarkers
}

func collectMarkersFromFile(file string) []string {

	// for each file, get all markers with {{ and }} as delimiters
	// read file content
	content, err := os.ReadFile(file)
	if err != nil {
		panic(err)
	}

	// find all markers with {{ and }} as delimiters
	// compile the regex
	regex := regexp.MustCompile(`{{(.*?)}}`)

	// find all matches
	matches := regex.FindAllStringSubmatch(string(content), -1)

	// for each match, add it to the map if it is not in the map
	var markers []string
	for _, match := range matches {
		markers = append(markers, match[1])
	}

	// return the map
	return markers

}
