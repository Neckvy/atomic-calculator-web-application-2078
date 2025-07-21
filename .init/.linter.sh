#!/bin/bash
cd /home/kavia/workspace/code-generation/atomic-calculator-web-application-2078/frontend_nextjs_calculator
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

