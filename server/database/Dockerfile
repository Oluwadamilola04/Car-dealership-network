FROM node:18.12.1-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY app.js .
COPY review.js .
COPY dealership.js .
COPY data/ ./

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3030', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3030

CMD ["node", "app.js"]
