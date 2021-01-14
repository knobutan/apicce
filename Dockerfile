# Use compatible node version
FROM node:10

# Create workspace
RUN mkdir /apic
WORKDIR /apic
COPY . .

# Install debug tools
RUN apt-get update && apt-get -y install mtr \
nmap \
netcat \
iproute2 \
dnsutils

# Install APIC
RUN npm i -g apiconnect --unsafe

# Expose port for APIC toolkit GUI
EXPOSE 3000

CMD ["echo", "apic toolkit container..."]
CMD [ "node", "test.js" ]
