default:
  just --list

# Enables corepack in node
corepack-enable:
    ./nvm_exec.sh corepack enable

# Installs project package.json dependencies
install-deps:
    ./nvm_exec.sh yarn
    ./nvm_exec.sh yarn prepare

# Starts React development server
dev:
    ./nvm_exec.sh yarn start

# Builds React application
build:
    ./nvm_exec.sh yarn build

# Runs E2E tests
e2e-run:
    ./nvm_exec.sh yarn e2e:run

# Opens E2E tests UI
e2e-open:
    ./nvm_exec.sh yarn e2e:open

# Proxy comand through nvm
nvm-exec command:
    ./nvm_exec.sh {{command}}