package main

import (
	"encoding/csv"
	"fmt"
	"math"
	"os"
	"strconv"
)

const RES = 396.00

// const RES = 43.53

// const RES = 5435425.20

func deepFindFactor(table [][]float64, n float64, x int, factors []float64) bool {
	// Loop for whole X element
	for i := 0; i < len(table[0]); i++ {
		factors[x] = table[x][i]
		// Check if this elemet is almost last
		// If yes, lets multiply in loop this value to value from next slice
		if x >= len(table)-2 {
			for j := 0; j < len(table[x]); j++ {
				if (math.Floor(n*table[x][i]*table[x+1][j]*100) / 100) == RES {
					factors[x+1] = table[x+1][j]
					return true
				}
			}
			continue
		}
		// Don't ask me why - I dont know how it works
		if deepFindFactor(table, n*table[x][i], x+1, factors) {
			return true
		}
	}
	return false
}

func findFactor(table [][]float64) {

	factors := make([]float64, len(table))
	for n := 0; n < len(table[0]); n++ {
		factors[0] = table[0][n]
		if deepFindFactor(table, table[0][n], 1, factors) {
			fmt.Println(factors)
			break
		}
		if n >= len(table[0])-1 {
			fmt.Println("Factors of given number has not been found")
		}
	}
}

func main() {
	f, _ := os.Open("table.csv")
	defer f.Close() // this needs to be after the err check

	lines, _ := csv.NewReader(f).ReadAll()

	csv := make([][]float64, len(lines[0]))

	for i := range csv[0] {
		csv[i] = make([]float64, len(lines))
	}

	for _, line := range lines {
		for j, element := range line {
			floadElement, _ := strconv.ParseFloat(element, 64)
			csv[j] = append(csv[j], floadElement)
		}
	}

	for _, line := range lines {
		for j, element := range line {
			floadElement, _ := strconv.ParseFloat(element, 64)
			csv[j] = append(csv[j], floadElement)
		}
	}

	findFactor(csv)
}
