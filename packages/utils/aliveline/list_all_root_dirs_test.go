package main

import (
	"reflect"
	"testing"
)

func Test_listAllRootLevelFolders(t *testing.T) {
	type args struct {
		dir string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{name: "test1", args: args{dir: "../test/source_files"}, want: []string{"child1", "child2"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := listAllRootLevelFoldersAndFiles(tt.args.dir); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("listAllRootLevelFoldersAndFiles() = %v, want %v", got, tt.want)
			}
		})
	}
}
