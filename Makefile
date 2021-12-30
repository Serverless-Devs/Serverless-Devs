.PHONY: push

CURRENT_BRANCH_NAME := $(shell git symbolic-ref --short HEAD)

add:
	git add .

commit: add
	git-cz

rebase-main: commit
	git pull --rebase origin main

push:
	git push --force-with-lease origin $(CURRENT_BRANCH_NAME)

release-dev: 
	gh release create 2.0.97-beta.9 --notes "release 2.0.97-beta.9" --target develop --title "Release 2.0.97-beta.9" --prerelease

roll-back-dev:
	git reset --soft HEAD~1
	git restore --staged publish.yaml
	git restore publish.yaml
