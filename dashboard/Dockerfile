# The version of Node that we will use
FROM node:22-alpine3.20

# The working directory of the app in the container
WORKDIR /usr/src/app

COPY package*.json ./

# Install the packages in package.json
RUN npm ci

# Copy the project files from the host to the work directory in the container
COPY . /usr/src/app/

# Expose the port in the container so that it can be accessed from the outside
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]
