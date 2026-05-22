# Variables
NPM = npm

.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	$(NPM) install

# Build compiled distribution using Babel
.PHONY: build
build:
	$(NPM) run build

# Run unit tests via Jest
.PHONY: test
test:
	$(NPM) run test

# Run ESLint linter
.PHONY: lint
lint:
	$(NPM) run lint

# Clean build artifacts
.PHONY: clean
clean:
	rm -rf dist/ docs/
