# ใช้ Node.js 20 official image
FROM node:20-alpine

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package files
COPY package.json pnpm-lock.yaml ./

# ติดตั้ง pnpm
RUN npm install -g pnpm

# ติดตั้ง dependencies
RUN pnpm install --frozen-lockfile

# คัดลอก source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start server
CMD ["node", "server.js"]

