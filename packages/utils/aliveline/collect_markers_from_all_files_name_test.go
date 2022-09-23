package main

import (
	"reflect"
	"testing"
)

func Test_collectMarkersFromAllFileNames(t *testing.T) {
	type args struct {
		sourceFolder string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// test collecting markers from all filenames under "../../test/source_files"
		{
			name: "test1",
			args: args{sourceFolder: " test/source_files"},
			want: []string{
				"p",
				"S",
				"c",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := collectMarkersFromAllFileNames(tt.args.sourceFolder); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("collectMarkersFromAllFileNames() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_collectMarkersFromFileName(t *testing.T) {
	type args struct {
		fileName string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// test file name "[[file_name_marker]]1.txt"
		{
			name: "test1",
			args: args{fileName: "[[file_name_marker]]1.txt"},
			want: []string{"file_name_marker"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := collectMarkersFromFileName(tt.args.fileName); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("collectMarkersFromFileName() = %v, want %v", got, tt.want)
			}
		})
	}
}
