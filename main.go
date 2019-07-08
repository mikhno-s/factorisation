package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"net/http"
)

type findResponse struct {
	Result []float64
}
type findRequest struct {
	Result float64
	Data   [][]float64
}

func deepFindFactor(table [][]float64, n float64, x int, factors []float64, result float64) bool {
	// Loop for whole X element
	for i := 0; i < len(table[0]); i++ {
		factors[x] = table[x][i]
		// Check if this elemet is almost last
		// If yes, lets multiply in loop this value to value from next slice
		if x >= len(table)-2 {
			for j := 0; j < len(table[x]); j++ {
				if (math.Floor(n*table[x][i]*table[x+1][j]*100) / 100) == result {
					factors[x+1] = table[x+1][j]
					return true
				}
			}
			continue
		}
		// Don't ask me why - I dont know how it works
		if deepFindFactor(table, n*table[x][i], x+1, factors, result) {
			return true
		}
	}
	return false
}

func findFactor(table [][]float64, result float64) []float64 {
	factors := make([]float64, len(table))
	for n := 0; n < len(table[0]); n++ {
		factors[0] = table[0][n]
		if deepFindFactor(table, table[0][n], 1, factors, result) {
			fmt.Println(factors)
			break
		}
		if n >= len(table[0])-1 {
			fmt.Println("Factors of given number has not been found")
			empty := make([]float64, 0)
			return empty
		}
	}
	return factors
}

func getFactors(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	body, _ := ioutil.ReadAll(req.Body)

	fR := &findRequest{}
	json.Unmarshal(body, fR)
	p := &findResponse{Result: findFactor(fR.Data, fR.Result)}

	js, err := json.Marshal(p)

	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	res.Header().Set("Content-Type", "application/json")
	res.Write(js)
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)
	http.HandleFunc("/api/getFactors", getFactors)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
