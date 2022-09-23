package main

import (
	"strconv"
)

// this function builds options for the command line, the use will choose from the following options

type Option struct {
	Name               string
	NumberOfFilesUnder string
	AbsolutePath       string
	AllFilesUnder      string
}

func buildOptions(sourceDir string) []Option {

	var options []Option
	// get all root level folders
	rootLevelFolders := listAllRootLevelFoldersAndFiles(sourceDir)

	// loop through all root level folders
	for _, folder := range rootLevelFolders {

		// all files under the folder
		allFilesUnder := listFilesRecursive(sourceDir + "/" + folder)

		// get the number of files under the folder
		numberOfFilesUnder := strconv.Itoa(len(allFilesUnder))
		// add the folder name to the options

		allFilesUnderTemplate := "\n\n"

		count := 0
		for _, file := range allFilesUnder {
			allFilesUnderTemplate += "- " + file + "\n"
			//  cap at 5
			if count > 5 {
				break
			}
			count++

		}
		options = append(
			options,
			Option{
				Name:               folder,
				NumberOfFilesUnder: numberOfFilesUnder,
				AbsolutePath:       sourceDir + "/" + folder,
				AllFilesUnder:      allFilesUnderTemplate,
			},
		)

	}

	return options

}
