package main

// this function collection all markers with {{ and }} as delimiters from all files in the source folder recursively
import (
	"golang.org/x/exp/slices"
	"regexp"
)

// collection all markers with [[ and ]] as delimiters from all file names in the source folder recursively
func collectMarkersFromAllFileNames(sourceFolder string) []string {

	allFiles := listFilesRecursive(sourceFolder)

	// collect all markers from all file contents
	var allMarkers []string

	for _, file := range allFiles {
		markers := collectMarkersFromFileName(file)
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

// private func

func collectMarkersFromFileName(fileName string) []string {

	// for each file name, get all markers with [[ and ]] as delimiters

	regex := regexp.MustCompile(`\[\[(.*?)\]\]`)

	// find all matches
	matches := regex.FindAllStringSubmatch(fileName, -1)

	// for each match, add it to the map if it is not in the map
	var markers []string
	for _, match := range matches {
		// check if the marker is not in the map
		if !slices.Contains(markers, match[1]) {
			markers = append(markers, match[1])
		}
	}

	// return the array
	return markers
}
