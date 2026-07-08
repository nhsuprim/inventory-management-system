# Software Requirements Specification (SRS)

## Shop Inventory & Billing Management System

**Version:** 1.0
**Date:** July 5, 2026
**Document Status:** Draft

---

## 1. Introduction

### 1.1 Purpose

This document specifies the software requirements for a **Shop Inventory & Billing Management System**. The system is designed to help retail/general shop owners manage products, stock, categories, customers, sales, and billing through a single unified platform. It generates invoices (as PDF) at the point of sale, and automatically updates stock, customer records, and sales history in real time.

### 1.2 Scope

The system will allow a shop admin (and optionally staff) to:

- Manage products organized into categories
- Track and update stock levels automatically
- Generate professional invoices/bills as PDF when a sale is made
- Maintain customer records and purchase history
- Record and report on sales
- View dashboards and reports for business insight

The system targets small-to-medium retail shops but is designed generically enough to support different product categories (electronics, groceries, clothing, etc.) without being tied to one specific business type.

### 1.3 Intended Audience

- Developers and QA engineers building the system
- Project stakeholders / shop owner (client)
- Future maintainers of the system

### 1.4 Definitions, Acronyms, Abbreviations

| Term            | Meaning                                                  |
| --------------- | -------------------------------------------------------- |
| SRS             | Software Requirements Specification                      |
| Admin           | Primary user with full system access                     |
| SKU             | Stock Keeping Unit — unique product identifier           |
| POS             | Point of Sale                                            |
| Invoice/Bill    | Document generated at sale, itemizing purchased products |
| Stock/Inventory | Quantity of products available for sale                  |

### 1.5 References

- None (new system, greenfield project)

---

## 2. Overall Description

### 2.1 Product Perspective

This is a new, standalone, web-based application. It is not dependent on any existing legacy system. It will have:

- A backend (API + database)
- A frontend web interface (admin dashboard)
- A PDF generation module for invoices

### 2.2 Product Functions (Summary)

1. **Authentication & User Roles** — Admin/Staff login, role-based permissions
2. **Category Management** — Create/edit/delete product categories (and sub-categories)
3. **Product Management** — Add/edit/delete products, assign to categories, set price, stock, SKU, images
4. **Inventory/Stock Management** — Real-time stock tracking, low-stock alerts, stock adjustment logs
5. **Billing / Invoice Generation** — Create a bill by selecting products, quantities, auto-calculate totals/tax/discount, generate downloadable/printable PDF invoice
6. **Customer Management** — Store customer details, link invoices to customers, view purchase history
7. **Sales Management** — Every completed invoice becomes a sales record; support returns/refunds
8. **Reports & Dashboard** — Daily/monthly sales, best-selling products, low stock reports, revenue summaries
9. **Supplier Management (optional/future)** — Track suppliers and purchase orders for restocking

### 2.3 User Classes and Characteristics

| User Class        | Description                     | Permissions                                                                                           |
| ----------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Admin (Owner)** | Full control of the shop system | All modules: products, stock, billing, customers, reports, user management                            |
| **Staff/Cashier** | Handles daily sales             | Create bills, view stock, view customers; limited/no access to reports, product deletion, or settings |

### 2.4 Operating Environment

- **Frontend:** Web application (responsive, usable on desktop and tablet/mobile browsers)
- **Backend:** REST API server
- **Database:** Relational database (e.g., PostgreSQL/MySQL)
- **PDF Engine:** Server-side PDF generation library
- **Hosting:** Cloud-hosted (or local server, per deployment choice)

### 2.5 Design and Implementation Constraints

- Must generate invoice PDFs instantly (within a few seconds) after a sale
- Every sale must atomically update: stock quantity, customer record, and sales ledger — no partial updates
- System must prevent selling a product beyond available stock (unless "allow negative stock" is explicitly enabled by admin)
- Data must be persisted reliably (no loss of transactional data)

### 2.6 Assumptions and Dependencies

- Shop has internet access (if cloud-hosted) or a local network (if on-premise)
- Admin will input initial product/category data during setup
- Tax/discount rules are configurable per shop, not hardcoded

---

## 3. System Features (Functional Requirements)

### 3.1 User Authentication & Role Management

- **FR-1.1:** System shall allow login via username/email and password
- **FR-1.2:** System shall support at least two roles: Admin and Staff
- **FR-1.3:** Admin shall be able to create, edit, deactivate staff accounts
- **FR-1.4:** System shall log out inactive sessions after a configurable timeout

### 3.2 Category Management

- **FR-2.1:** Admin shall be able to create, edit, and delete product categories
- **FR-2.2:** System shall support sub-categories (optional nested structure)
- **FR-2.3:** Each product must belong to exactly one category

### 3.3 Product Management

- **FR-3.1:** Admin shall be able to add a product with: name, SKU/barcode, category, unit price, cost price, tax rate, initial stock quantity, unit of measure, image (optional), description
- **FR-3.2:** Admin shall be able to edit or delete (soft-delete) products
- **FR-3.3:** System shall support searching/filtering products by name, category, or SKU
- **FR-3.4:** System shall support barcode scanning/lookup (optional, if hardware available)

### 3.4 Inventory / Stock Management

- **FR-4.1:** System shall maintain a real-time stock count per product
- **FR-4.2:** Stock shall automatically decrease when an invoice/bill is generated
- **FR-4.3:** Stock shall automatically increase when a sale is returned/refunded
- **FR-4.4:** Admin shall be able to manually adjust stock (e.g., new stock arrival, damage/loss), with a mandatory reason/note logged
- **FR-4.5:** System shall maintain a stock adjustment history/audit log (who changed what, when, why)
- **FR-4.6:** System shall send/display a **low-stock alert** when a product falls below a configurable reorder threshold
- **FR-4.7:** System shall prevent overselling (block sale if quantity requested > available stock), unless explicitly overridden by Admin setting

### 3.5 Billing / Invoice Generation (Core Module)

- **FR-5.1:** Admin/Staff shall be able to create a new bill by selecting a customer (or "walk-in/guest") and adding one or more products with quantities
- **FR-5.2:** System shall auto-calculate: line totals, subtotal, tax, discount (if applied), and grand total
- **FR-5.3:** System shall support discount entry (flat amount or percentage), per item or on total
- **FR-5.4:** Upon confirming the bill, system shall:
    - Generate a unique invoice number
    - Generate a downloadable/printable **PDF invoice** with shop details, customer details, itemized products, totals, date/time, and payment status
    - Deduct sold quantities from stock
    - Create/update the customer record and link this invoice to their history
    - Create a sales record for reporting
- **FR-5.5:** System shall support multiple payment methods (cash, card, mobile payment) and record payment status (paid/due/partial)
- **FR-5.6:** System shall support editing/cancelling a bill within a defined window, with proper stock reversal
- **FR-5.7:** System shall support processing returns/refunds against an existing invoice

### 3.6 Customer Management

- **FR-6.1:** System shall store customer details: name, phone, email (optional), address (optional)
- **FR-6.2:** System shall auto-create a customer profile if new customer details are entered during billing
- **FR-6.3:** Admin/Staff shall be able to view a customer's full purchase history
- **FR-6.4:** System shall support a "walk-in/guest" customer option for anonymous sales
- **FR-6.5:** System shall support tracking due/credit balance per customer (if credit sales allowed)

### 3.7 Sales Management

- **FR-7.1:** Every completed invoice shall generate a corresponding sales record
- **FR-7.2:** System shall allow filtering sales by date range, product, category, or customer
- **FR-7.3:** System shall track returns/refunds against original sales records

### 3.8 Reports & Dashboard

- **FR-8.1:** System shall provide a dashboard showing: today's sales, total revenue, low-stock items, top-selling products
- **FR-8.2:** System shall generate reports: daily/weekly/monthly sales, profit/loss (based on cost vs. sale price), stock valuation, customer purchase trends
- **FR-8.3:** Reports shall be exportable (PDF/Excel)

### 3.9 Supplier & Purchase Management (Future Scope / Optional)

- **FR-9.1:** Admin shall be able to record suppliers and purchase orders
- **FR-9.2:** Receiving a purchase order shall increase stock accordingly

---

## 4. External Interface Requirements

### 4.1 User Interfaces

- Clean, responsive admin dashboard
- Dedicated "New Bill/POS" screen optimized for speed (keyboard shortcuts, quick product search)
- Printable/downloadable invoice view

### 4.2 Hardware Interfaces

- Optional: barcode scanner support (USB/Bluetooth, acts as keyboard input)
- Optional: receipt printer support (thermal printer, in addition to PDF)

### 4.3 Software Interfaces

- Database system (e.g., PostgreSQL/MySQL)
- PDF generation library
- Optional: SMS/Email service for sending invoices or low-stock alerts

### 4.4 Communication Interfaces

- HTTPS for all client-server communication
- REST API (JSON) between frontend and backend

---

## 5. Non-Functional Requirements

### 5.1 Performance

- Invoice generation (including PDF creation and stock update) shall complete within 3 seconds under normal load
- System shall support at least 50 concurrent users (scalable per deployment)

### 5.2 Security

- Passwords shall be stored hashed (never plain text)
- Role-based access control enforced on all API endpoints
- All financial/stock-changing operations shall be logged with user ID and timestamp

### 5.3 Reliability & Availability

- Stock/sales/customer updates from a single invoice must be atomic (all-or-nothing transaction)
- System shall maintain daily automated backups of the database

### 5.4 Usability

- Billing screen shall be usable by non-technical staff with minimal training
- System shall support responsive layouts for tablet use at checkout counters

### 5.5 Maintainability & Scalability

- Modular architecture (separate modules for billing, inventory, customers, reports) to allow future feature additions (e.g., multi-branch support, e-commerce integration)

### 5.6 Auditability

- All stock adjustments, bill edits/cancellations, and refunds must be logged with reason, user, and timestamp

---

## 6. Data Requirements (High-Level Entities)

- **User** (id, name, email, password_hash, role)
- **Category** (id, name, parent_category_id)
- **Product** (id, name, SKU, category_id, price, cost_price, tax_rate, stock_qty, reorder_threshold, image, status)
- **Customer** (id, name, phone, email, address, due_balance)
- **Invoice/Bill** (id, invoice_number, customer_id, user_id, date, subtotal, tax, discount, total, payment_status, payment_method)
- **InvoiceItem** (id, invoice_id, product_id, quantity, unit_price, line_total)
- **StockAdjustment** (id, product_id, user_id, change_qty, reason, timestamp)
- **Sale** (derived from Invoice; may be same table or a reporting view)
- **Supplier** (id, name, contact) — _future scope_

---

## 7. Future Enhancements (Out of Current Scope, Noted for Planning)

- Multi-branch / multi-location inventory sync
- E-commerce / online store integration
- Mobile app for admin/staff
- Barcode label printing
- Automated purchase order suggestions based on sales velocity
- SMS/WhatsApp invoice delivery to customers

---

## 8. Approval

| Role                 | Name | Date         |
| -------------------- | ---- | ------------ |
| Prepared By          | —    | July 5, 2026 |
| Reviewed By          | —    | —            |
| Approved By (Client) | —    | —            |

---

_This SRS is a living document and may be revised as requirements are clarified during development._
