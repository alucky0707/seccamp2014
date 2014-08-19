all: seccamp2014.gz

seccamp2014.f90:
	cp ../generate2/generate2.f90 ./seccamp2014.f90

seccamp2014.gz: seccamp2014.f90
	gzip -nf9c seccamp2014.f90 > seccamp2014.gz

clean:
	rm -f seccamp2014.f90 seccamp2014.gz
