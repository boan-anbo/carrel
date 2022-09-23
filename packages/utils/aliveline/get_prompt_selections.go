package main

import (
	"github.com/manifoldco/promptui"
)

func getPromptSelections(source_folder string) string {

	options := buildOptions(source_folder)

	detailBase := `
--------- Templates ----------
{{ "Name:" | faint }}	{{ .Name }}
{{ "NumberOfFilesUnder:" | faint }}	{{ .NumberOfFilesUnder }}
{{ "AbsolutePath:" | faint }}	{{ .AbsolutePath }}
{{ "AllFilesUnder:" | faint }}	{{ .AllFilesUnder }}`

	templates := &promptui.SelectTemplates{
		Label: "{{ .NumberOfFilesUnder }}?",
		// use underscore for active option
		Active:   "{{.Name | cyan}}",
		Inactive: "{{.Name}}",
		Selected: "{{ .Name | green | cyan }}",
		Details:  detailBase,
	}

	// get the user input
	prompt := promptui.Select{
		Label: "Pick a template",
		// item = []string of the Name property of the Option struct
		Items:     options,
		Templates: templates,
	}

	// case result to Option struct
	i, _, err := prompt.Run()
	//_, result, err := prompt.Run()

	if err != nil {
		panic(err)
	}

	// return the absolute path of the selected folder
	return options[i].AbsolutePath

}
