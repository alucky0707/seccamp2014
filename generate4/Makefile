all: seccamp2014.v

seccamp2014.v:
	gzip -nf9c seccamp2014.dummy.f90 > seccamp2014.gz
	cp seccamp2014.gz seccamp2014.2.gz
	printf 'Compressed file\n.\n' | ci seccamp2014.gz
	rcs -ko seccamp2014.gz
	co -l seccamp2014.gz
	cp ../generate3/seccamp2014.gz .
	echo "Second version" | ci -l seccamp2014.gz
	mv seccamp2014.2.gz seccamp2014.gz
	echo "Third version" | ci seccamp2014.gz

clean:
	rm -f seccamp2014.gz,v seccamp2014.gz seccamp2014.2.gz
