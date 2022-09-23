package main

import "testing"

func Test_replaceMarkerInFile(t *testing.T) {
	type args struct {
		filePath  string
		markerMap map[string]string
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{name: "test1", args: args{filePath: "../test_temp/replacer/target_files/[[p]] Plan for [[S]].md", markerMap: map[string]string{"title": "title_test"}}, wantErr: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			// test the [[r]]1.md under test/source_files, and expect the {{title}} to be replace with "root1"
			// copy source_files to target_files and run tests on target_files

			//copyDir("...test/source_files", "...test/replacer/target_files")d
			if err := copyDir("../test/source_files", "../test_temp/replacer/target_files"); err != nil {
				t.Errorf("copyDir() error = %v", err)
				return
			}

			if err := replaceMarkerInAllFileContent(tt.args.filePath, tt.args.markerMap); (err != nil) != tt.wantErr {
				t.Errorf("replaceMarkerInAllFileContent() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
