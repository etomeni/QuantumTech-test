# QuantumTech Services
Welcome to Life-time by QuantumTech Services


### 1. Getting Started

First, install the dependencies:

```bash
npm install
```

### 2. Required environment variables
This values are required in .env file to run this application.

```bash
# Create a .env file in the root of your project
touch .env
```

```bash
DATABASE_URL = postgres-database-url

CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

Replace postgres-database-url, your_cloud_name, your_api_key, and your_api_secret with your actual database credentials and Cloudinary API details.


### 3. Run Prisma Migrations

Run Prisma to set up your database schema:

```bash
npx prisma migrate dev
```

This will apply the migration and generate the Prisma client based on the schema in schema.prisma.



### 4. Get Started

Now, run the development server:

```bash
npm run dev
```

Congrats, setup completed!
You can start enjoying and testing the application.

---

**Written with 💞️❤️ By: Sunday Etom (https://github.com/etomeni)**