
#  ModernERP - Next.js Enterprise Resource Planning Dashboard

An open-source, premium Enterprise Resource Planning (ERP) dashboard built with modern web technologies. It features a sleek, dark glassmorphic UI with complete frontend modules for Inventory, HR, CRM, Sales, and advanced Role-Based Access Control (RBAC).

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Key Features

*   **📦 Products & Inventory:** Manage product catalogs, variants, and real-time stock levels.
*   **🏢 Warehouses:** Track multiple storage locations and distribute inventory.
*   **👥 HR & Employees:** Manage staff profiles, roles, departments, and statuses.
*   **🤝 CRM (Customers & Suppliers):** Track client credit limits, vendor contact details, and relationships.
*   **💰 Sales & Invoices:** Generate invoices, track payment statuses, and manage transactions.
*   **🔐 System Users & RBAC:** Granular Role-Based Access Control with customizable permissions (Create, Read, Update, Delete) per module.
*   **🛡️ Audit Logs:** Immutable tracking of user actions and system events.
*   **🎨 Premium UI:** Fully responsive, dark-themed, glassmorphic design with interactive modal forms and action dropdowns.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Database Engine:** MySQL (Configurable to PostgreSQL/SQLite)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Getting Started & Installation

Follow these steps to get the project running on your local machine.

### 1. Clone the repository
```bash
git clone [https://github.com/imranbru99/modern-erp-nextjs.git](https://github.com/imranbru99/modern-erp-nextjs.git)
cd modern-erp-nextjs
```

### 2. Install Dependencies
```bash
npm install
# or yarn install / pnpm install
```

### 3. Configure Environment Variables
You need to connect the application to your database before running it. Create a `.env` file in the root directory of your project:
```bash
touch .env
```
Open the `.env` file and add your MySQL database connection string. Replace `user`, `password`, `localhost`, `3306`, and `modern_erp_db` with your actual database credentials:
```env
DATABASE_URL="mysql://user:password@localhost:3306/modern_erp_db"
```

### 4. Setup the Database (Prisma)
Once your database is running and your `.env` is configured, push the Prisma schema to your database to create all the necessary tables:
```bash
# Generate the Prisma Client
npx prisma generate

# Push the schema to your database
npx prisma db push
```
*(Note: If you are running this in a production environment, use `npx prisma migrate dev` instead of `db push` to keep track of migration histories).*

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser to see the result!

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/imranbru99/modern-erp-nextjs/issues).

---

## 🚀 NEED A FIX? CONTACT ME:
If you run into any issues setting up the database, need custom features, or want to hire me for your next big project, feel free to reach out!

*   🌐 **Portfolio:** [https://imrandev.bd](https://imrandev.bd)
*   📧 **Email:** me@imrandev.bd
*   📞 **WhatsApp:** +880 1576 918420
```
