# Use compatible node version
FROM node:10

# Create workspace
RUN mkdir /apic
WORKDIR /apic
COPY . .

# Install debug tools
RUN apt-get update && apt-get install -y \
  mtr \
  netcat \
  iproute2 \
  && rm -rf /var/lib/apt/lists/*

# Install APIC
RUN npm i -g apiconnect --unsafe

RUN npm install

# Expose port for APIC toolkit GUI
EXPOSE 8080

CMD [ "node", "test.js" ]
