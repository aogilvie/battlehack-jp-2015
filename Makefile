# target: help, Display callable targets.
help:
	egrep "^# target:" [Mm]akefile

# target: clean, Cleans the NPM cache.
clean:
	npm cache clean

# target: deps, Installs all NodeJS dependencies.
deps:
	sudo npm install; npm install -g ios-sim; sudo npm install -g ios-deploy

# target: setup, runs the setup script.
setup:
	./scripts/setup.sh

# target: build, runs the build script.
build:
	./scripts/build.sh

# target: run, runs the run script.
run:
	./scripts/run.sh

# target: lint, Lints every JavaScript file in the project that are staged to be comitted.
lint:
	./scripts/lint-staged.sh

# target: lint-all, Lints every JavaScript file in the project.
lint-all:
	./scripts/lint-all.sh
