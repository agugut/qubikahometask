#!/usr/bin/env bash
# run tests and generate report
xvfb-run npx playwright test --reporter=list
