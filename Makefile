all: seccamp2014.zip

seccamp2014.zip: generate
	cd generate6 && zip ../seccamp2014.zip seccamp2014.py

generate:
	for i in `seq 1 6`; do make -C generate$$i; done

clean:
	for i in `seq 1 6`; do make -C generate$$i clean; done
	rm -f seccamp2014.zip
