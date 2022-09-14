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
		// test the root1.md under test/source_files, and expect the {{title}} to be replace with "root1"
		{"test the root1.md under test/source_files, and expect the {{title}} to be replace with root1", args{"test/source_files/root1.md", map[string]string{"title": "root1"}}, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := replaceMarkerInFile(tt.args.filePath, tt.args.markerMap); (err != nil) != tt.wantErr {
				t.Errorf("replaceMarkerInFile() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
