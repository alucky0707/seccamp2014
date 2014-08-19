all: generate1.c generate1

generate1.c:
	node generate1.js

generate1:
	gcc -o generate1 generate1.c

text.md: all
	./generate1 > text.md

test: text.md
	diff text.md ../text.md

clean:
	rm -f generate1.c generate1 text.md
