install: |
	npm ci && \
	npx playwright install && \
	npx playwright install-deps
