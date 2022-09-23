package main

import (
	"errors"
	"github.com/manifoldco/promptui"
)

func collectUserInputsForAllMakers(allMarkers []string) map[string]string {
	// for each marker, ask the user to input a value

	allUserInputs := make(map[string]string)
	for _, marker := range allMarkers {
		// ask the user to input a value for the marker
		userInput := getUserInput(marker)
		// add the marker and the user input to the map
		allUserInputs[marker] = userInput
	}

	return allUserInputs

}

// and return a map of marker to user input
func getUserInput(marker string) string {

	// ask the user to input a value for the marker by showing a prompt
	userInputValue := &promptui.Prompt{
		Label: "Enter a value for \"" + marker + "\"",
		Templates: &promptui.PromptTemplates{
			Success: "{{ . | faint }}",
		},

		Validate: func(s string) error {
			// make sure the user input is not empty
			if s == "" {
				return errors.New("The value cannot be empty")
			}
			return nil
		},
	}

	// get the user input
	userInput, err := userInputValue.Run()

	if err != nil {
		panic(err)
	}

	return userInput

}
