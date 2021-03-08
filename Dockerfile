# Use compatible node version
FROM node:10

# Create workspace
RUN mkdir /apic
WORKDIR /apic
COPY . .

# Install debug tools
RUN apt-get update && apt-get -y install mtr \
netcat \
iproute2

# Install APIC
RUN npm install
RUN npm i -g apiconnect --unsafe

# Expose port for APIC toolkit GUI
EXPOSE 3000

CMD ["echo", "apic toolkit container..."]
CMD [ "node", "test.js" ]
