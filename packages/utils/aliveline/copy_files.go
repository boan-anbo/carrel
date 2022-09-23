package main

import (
	"io"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
)

// Copy a directory recursively
func copyDir(src string, dst string) error {
	// print the source and destination folders
	log.Println("Copying from " + src + " to " + dst)
	// get properties of source dir
	srcInfo, err := os.Stat(src)
	if err != nil {
		return err
	}

	// create destination dir
	err = os.MkdirAll(dst, srcInfo.Mode())
	if err != nil {
		return err
	}

	// read all the files in the source dir
	entries, err := ioutil.ReadDir(src)
	if err != nil {
		return err
	}

	// copy each file
	for _, entry := range entries {
		srcPath := filepath.Join(src, entry.Name())
		dstPath := filepath.Join(dst, entry.Name())

		// if the entry is a dir, recursively copy the dir
		if entry.IsDir() {
			err = copyDir(srcPath, dstPath)
			if err != nil {
				log.Println(err)
			}
		} else {
			// if the entry is a file, copy the file
			err = copyFile(srcPath, dstPath)
			if err != nil {
				log.Println(err)
			}
		}
	}
	return nil
}

// Copy a file
func copyFile(src string, dst string) error {
	// open source file
	srcFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	// create destination file
	dstFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer dstFile.Close()

	// copy the content from source to destination
	_, err = io.Copy(dstFile, srcFile)
	if err != nil {
		return err
	}

	// copy the mode from source to destination
	srcInfo, err := os.Stat(src)
	if err != nil {
		return err
	}
	return os.Chmod(dst, srcInfo.Mode())
}
