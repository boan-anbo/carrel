package main

import (
	"os"
	"testing"
)

func Test_replaceFileName(t *testing.T) {
	type args struct {
		dirPath   string
		markerMap map[string]string
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{name: "test1", args: args{
			dirPath: "test_temp/file_name_replacer/target_files", markerMap: map[string]string{
				"p": "My Project",
				"s": "My Sub Project",
				"d": "My directory",
			}}, wantErr: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// delete the created folder
			err := os.RemoveAll("test_temp/file_name_replacer")
			if err != nil {
				t.Errorf("os.RemoveAll() error = %v", err)
			}
			// copy source_files to target_files in the folder for this function
			// run tests on target_files
			if err := copyDir("test/source_files", "test_temp/file_name_replacer/target_files"); err != nil {
				t.Errorf("copyDir() error = %v", err)
				return
			}

			// assert new file names

			if err := replaceFileAndDirNames(tt.args.dirPath, tt.args.markerMap); (err != nil) != tt.wantErr {
				t.Errorf("replaceFileAndDirNames() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
