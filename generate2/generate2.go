package main

import (
	"os"
	"io"
	"fmt"
	"log"
)

func main() {
	var input, output *os.File
	var err error

	input, err = os.Open("../generate1/generate1.c")
	if err != nil {
		log.Fatal(err)
	}
	defer input.Close()

	output, err = os.Create("generate2.f90")
	if err != nil {
		log.Fatal(err)
	}
	defer output.Close()

	// append header
	output.WriteString("program seccamp2014\n")
	output.WriteString("  implicit none\n")
	output.WriteString("\n")

	// append body
	const (
		N = 3
		BUF_SIZE = N * 4
	)
	for {
		buf := make([]byte, BUF_SIZE)
		n, err := input.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatal(err)
		}
		if n == 0 {
			break
		}

		m := n / N
		if n % N != 0 {
			m += 1
		}
		fmt.Fprintf(output, "  write(*, '(%da%d)', advance='no') ", m, N)
		for i := 0; m != 0; m-- {
			x, y := uint64(0), uint(0)
			for j := i + N; i < j; i, y = i + 1, y + 8 {
				x += uint64(buf[i]) << y
			}
			fmt.Fprintf(output, "%d", x)
			if m != 1 {
				output.WriteString(", ")
			}
		}
		output.WriteString("\n")
	}
	output.WriteString("end program seccamp2014\n")
}
