// entry
package main

import (
	"os"
	"path/filepath"
)

// current version variable
var currentVersion = "0.0.1"

func main() {

	println("Aliveline: v" + currentVersion)

	println("")

	// get the current folder
	currentFolder, err := os.Getwd()
	// log information

	if err != nil {
		panic(err)
	}

	// load source folder from .yaml file
	sourceFolder := loadSourceFolder()

	// get the source folder absolute path
	pickedFolderAbsolute := getPromptSelections(sourceFolder)
	println("pickedFolderAbsolute: " + pickedFolderAbsolute)

	println(pickedFolderAbsolute)

	// print "Please enter the value for the file name markers:"
	println("Please enter the value for markers:")

	// get all markers from all file names in the source folder
	allFileNameMarkers := collectMarkersFromAllFileNames(pickedFolderAbsolute)

	// get all markers from all file contents in the source folder
	allFileContentMarkers := collectMarkersFromAllFilesContent(pickedFolderAbsolute)

	// concat all file name markers
	allMarkers := make([]string, 0, len(allFileNameMarkers))
	allMarkers = append(allMarkers, allFileNameMarkers...)
	allMarkers = append(allMarkers, allFileContentMarkers...)

	// remove duplicates
	allMarkers = removeDuplicates(allMarkers)

	// print "Please enter the value for the file content markers:"
	println("Please enter the value for the file content markers:")

	// get all user inputs for file name markers
	allUserInputs := collectUserInputsForAllMakers(allMarkers)

	// get the target folder absolute path
	pickedFolderFolderName := filepath.Base(pickedFolderAbsolute)

	// get the target folder absolute path
	targetFolderAbsolute := filepath.Join(currentFolder, pickedFolderFolderName)

	// copy the picked source folder to the current folder
	err = copyDir(pickedFolderAbsolute, targetFolderAbsolute)

	if err != nil {
		panic(err)
	}

	// replace all markers in the target folder
	replaceMarkersInTargetFolder(targetFolderAbsolute, allUserInputs, allUserInputs)

	// print "Done!"
	println("Done!")

}

func removeDuplicates(markers []string) []string {

	// remove duplicates
	keys := make(map[string]bool)
	list := []string{}
	for _, entry := range markers {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}

	return list
}

func replaceMarkersInTargetFolder(targetFolderAbsolute string, allUserInputsForFileNameMarkers map[string]string, allUserInputsForFileContentMarkers map[string]string) {
	// replace all markers in the target folder

	err := replaceFileAndDirNames(targetFolderAbsolute, allUserInputsForFileNameMarkers)
	if err != nil {
		panic(err)
	}

	err = replaceMarkerInAllFileContent(targetFolderAbsolute, allUserInputsForFileContentMarkers)

	// replace all markers of the root folder

	newRootFolderName := replaceFileOrFolderName(allUserInputsForFileNameMarkers, filepath.Base(targetFolderAbsolute))

	// rename the root folder
	err = os.Rename(targetFolderAbsolute, newRootFolderName)

	if err != nil {
		panic(err)
	}

}
