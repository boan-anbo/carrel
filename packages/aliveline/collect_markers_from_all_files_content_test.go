package main

import (
	"reflect"
	"testing"
)

func Test_collectMarkersFromAllFilesContent(t *testing.T) {
	type args struct {
		sourceFolder string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// test collecting markers from all files under "../../test/source_files"
		{
			name: "test1",
			args: args{sourceFolder: "../test/source_files"},
			want: []string{
				"title",
				"content",
				"Random",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := collectMarkersFromAllFilesContent(tt.args.sourceFolder); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("collectMarkersFromAllFilesContent() = %v, want %v", got, tt.want)
			}
		})
	}
}
