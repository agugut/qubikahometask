FROM mcr.microsoft.com/playwright:v1.42.0-jammy


WORKDIR /home/qubikahometask

COPY ./package.json ./package.json
COPY ./tests ./tests
COPY ./pageObject ./pageObject
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./playwright.config.ts ./playwright.config.ts
COPY ./.nvmrc ./.nvmrc
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./.eslintignore ./.eslintignore
COPY ./.eslintrc.js ./.eslintrc.js
COPY ./.prettierignore ./.prettierignore
COPY ./.prettierrc ./.prettierrc
COPY ./typedoc.json ./typedoc.json

# Install local project node version
ENV NODE_VERSION=18.19.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Install local project dependencies
RUN npm install

# Install Playwright dependecies and dependencies
RUN npx playwright install
RUN npx playwright install-deps

# List packages for the record
RUN dpkg -l

# Set entrypoint
RUN chmod +x /home/qubikahometask/entrypoint.sh
ENTRYPOINT [ "/home/qubikahometask/entrypoint.sh" ]
