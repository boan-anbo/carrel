package main

import (
	"gopkg.in/yaml.v3"
	"log"
	"os"
	// get path
	"path/filepath"
)

type Config struct {
	SourceFolder string `yaml:"source_folder"`
}

func loadSourceFolder() string {
	// read variable from aliveline.yaml file
	// get the current working directory where the executable is located
	alivelineFileName, err := os.Executable()

	if err != nil {
		log.Fatal(err)
	}

	// get the directory of the executable
	alivelineDir := filepath.Dir(alivelineFileName)

	println("alivelineDir: " + alivelineDir)

	yamlFile, err := os.ReadFile(alivelineDir + "/" + "aliveline.yaml")
	if err != nil {
		panic("Cannot find aliveline.yaml file in the same folder as aliveline executable file.")
	}

	// unmarshal the yaml file
	var config Config
	err = yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		log.Fatal(err)
	}

	// get the source folder

	sourceFolder := config.SourceFolder
	// trim source folder pathes
	sourceFolder = filepath.Clean(sourceFolder)

	// print the source folder
	println("Source folder: " + sourceFolder)

	return config.SourceFolder
}
