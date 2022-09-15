package main

import "testing"

func Test_copyDir(t *testing.T) {
	type args struct {
		src string
		dst string
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// test copy source_files to target_files in the root of the project
		{"test copy source_files to target_files in the root of the project", args{"../test/source_files", "../test_temp/copydir/target_files"}, false},

		//{"test copy source_files to target_files", args{"./test/source_files", "/test/target_files"}, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := copyDir(tt.args.src, tt.args.dst); (err != nil) != tt.wantErr {
				t.Errorf("copyDir() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_copyFile(t *testing.T) {
	type args struct {
		src string
		dst string
	}
	var tests []struct {
		name    string
		args    args
		wantErr bool
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := copyFile(tt.args.src, tt.args.dst); (err != nil) != tt.wantErr {
				t.Errorf("copyFile() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
