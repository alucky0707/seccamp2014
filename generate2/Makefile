all: generate2.f90 generate2

generate2.f90:
	go run generate2.go

generate2:
	gfortran -o generate2 generate2.f90

generate1.c: all
	./generate2 > generate1.c

test: generate1.c
	diff generate1.c ../generate1/generate1.c

clean:
	rm -f generate2.f90 generate2 generate1.c
