#SRC = 
TEST = test/*.js
REPORTER = list


site : docs/index.md 
	@./node_modules/.bin/markx --lang javascript docs/index.md | cat site/layout/head.html - site/layout/foot.html > site/index.html

preview-docs:
	@./node_modules/.bin/markx --lang javascript --preview 8001 docs/index.md 

preview-readme:
	@./node_modules/.bin/markx --preview 8001 README.md 

test:
	./node_modules/.bin/mocha -R list

.PHONY: test preview-docs preview-readme
