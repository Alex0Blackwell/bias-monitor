build: ;@echo "Building project."; \
			  webpack;

watch: ;@echo "Building project, hot reload is enabled."; \
        webpack --watch;
