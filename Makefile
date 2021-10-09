build: ;@echo "Building project."; \
			  webpack --mode production;

watch: ;@echo "Building project, hot reload is enabled."; \
        webpack --watch --mode production;
