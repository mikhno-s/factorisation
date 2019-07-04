package main

import (
	"encoding/csv"
	"fmt"
	"math"
	"os"
	"strconv"
)

// const RES = 396.00

const RES = 43.53

// const RES = 5435425.20

type Numbers struct {
	numbers [][]float64
}

func recurs(csv [][]float64, n float64, x int, factors []float64) bool {
	// Loop for whole X element
	for i := 0; i < len(csv[0]); i++ {
		factors[x] = csv[x][i]
		// Check if this elemet is almost last
		// If yes, lets multiply in loop this value to value from next slice
		if x >= len(csv)-2 {
			for j := 0; j < len(csv[x]); j++ {
				if (math.Floor(n*csv[x][i]*csv[x+1][j]*100) / 100) == RES {
					factors[x+1] = csv[x+1][j]
					return true
				}
			}
			continue
		}
		if recurs(csv, n*csv[x][i], x+1, factors) {
			return true
		}
	}
	return false
}

func countFactor() {
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

	factors := make([]float64, len(csv))
	for n := 0; n < len(csv[0]); n++ {
		factors[0] = csv[0][n]
		if recurs(csv, csv[0][n], 1, factors) {
			fmt.Println(factors)
			break
		}
		if n >= len(csv[0])-1 {
			fmt.Println("Factors of given number has not been found")
		}
	}
}

func main() {

}
