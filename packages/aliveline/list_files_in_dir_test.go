package main

import (
	"reflect"
	"testing"
)

// command to watch test this file
// go test -v -run Test_listFiles

func Test_listFiles(t *testing.T) {
	type args struct {
		dir string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// list all files under "test" directory
		{"list all files under test directory", args{"test/source_files"}, []string{
			"child1",
			"root1.md",
			"root2.md",
		}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := listFiles(tt.args.dir); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("listFiles() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_listFilesRecursive(t *testing.T) {
	type args struct {
		dir string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// list all files under "test" directory
		{"list all files under test directory", args{"test/source_files"}, []string{
			"child1",
			"root1.md",
			"root2.md",
			"child1.md",
			"child2.md",
		}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := listFilesRecursive(tt.args.dir); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("listFilesRecursive() = %v, want %v", got, tt.want)
			}
		})
	}
}
