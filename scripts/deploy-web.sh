#!/bin/bash

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

set -e

echo -e "${YELLOW}Installing fresh dependencies...${NC}"
pnpm install

echo -e "${YELLOW}Running generate...${NC}"
pnpm run generate

echo -e "${YELLOW}Running database generate...${NC}"
pnpm turbo run db:generate

echo -e "${YELLOW}Building project with Vercel...${NC}"
vercel build --prod 

echo -e "${YELLOW}Deploying to Vercel...${NC}"
vercel deploy --prebuilt --prod 

echo -e "${GREEN}Deployment complete!${NC}"
