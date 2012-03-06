site: docs/index.md example/
	@cd site; ../node_modules/.bin/markx --head layout/head.html --foot layout/foot.html ../docs/index.md  > index.html
	@cp -r example site/

preview-site:
	@cd site; ../node_modules/.bin/markx --preview 8001 --head layout/head.html --foot layout/foot.html ../docs/index.md 

preview-readme:
	@./node_modules/.bin/markx --preview 8001 README.md 

test:
	./node_modules/.bin/mocha -R list

.PHONY: test preview-docs preview-readme
