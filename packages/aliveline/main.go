// entry
package main

import (
	"fmt"
	"os"
)

func main() {

	// print out args provided
	// print out first argument after make sure it exists
	if len(os.Args) > 1 {
		fmt.Println(os.Args[1])
	}
}
