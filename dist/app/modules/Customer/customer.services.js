"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerServices = void 0;
const ApiError_1 = __importDefault(require("../../erros/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const findOrCreateCustomer = async (data) => {
    if (!data.phone?.trim())
        throw new ApiError_1.default(400, "phone is required");
    const phone = data.phone.trim();
    const existing = await prisma_1.default.customer.findUnique({ where: { phone } });
    if (existing)
        return existing;
    return prisma_1.default.customer.create({ data: { name: data.name?.trim() || "Walk-in Customer", phone, email: data.email?.trim(), address: data.address?.trim() } });
};
const createCustomer = async (req) => {
    const { name, phone, email, address } = req.body;
    if (typeof name !== "string" || !name.trim() || typeof phone !== "string" || !phone.trim())
        throw new ApiError_1.default(400, "name and phone are required");
    const normalizedPhone = phone.trim();
    if (await prisma_1.default.customer.findUnique({ where: { phone: normalizedPhone } }))
        throw new ApiError_1.default(400, "A customer with this phone number already exists");
    return prisma_1.default.customer.create({ data: { name: name.trim(), phone: normalizedPhone, email: typeof email === "string" ? email.trim() : undefined, address: typeof address === "string" ? address.trim() : undefined } });
};
const getAllCustomers = async (req) => {
    const { search, page = "1", limit = "20" } = req.query;
    const take = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const where = search?.trim() ? { OR: [{ name: { contains: search.trim(), mode: "insensitive" } }, { phone: { contains: search.trim() } }] } : undefined;
    const [data, total] = await prisma_1.default.$transaction([prisma_1.default.customer.findMany({ where, orderBy: { createdAt: "desc" }, skip: (currentPage - 1) * take, take }), prisma_1.default.customer.count({ where })]);
    return { data, pagination: { page: currentPage, limit: take, total, pages: Math.ceil(total / take) } };
};
const getSingleCustomer = async (id) => {
    const customer = await prisma_1.default.customer.findUnique({ where: { id }, include: { invoices: { orderBy: { createdAt: "desc" }, include: { items: true } } } });
    if (!customer)
        throw new ApiError_1.default(404, "Customer not found");
    return customer;
};
const updateCustomer = async (id, payload) => {
    if (!await prisma_1.default.customer.findUnique({ where: { id } }))
        throw new ApiError_1.default(404, "Customer not found");
    const { name, phone, email, address } = payload;
    if (name !== undefined && (typeof name !== "string" || !name.trim()))
        throw new ApiError_1.default(400, "name must be a non-empty string");
    if (phone !== undefined) {
        if (typeof phone !== "string" || !phone.trim())
            throw new ApiError_1.default(400, "phone must be a non-empty string");
        if (await prisma_1.default.customer.findFirst({ where: { phone: phone.trim(), id: { not: id } } }))
            throw new ApiError_1.default(400, "A customer with this phone number already exists");
    }
    return prisma_1.default.customer.update({ where: { id }, data: { ...(typeof name === "string" && { name: name.trim() }), ...(typeof phone === "string" && { phone: phone.trim() }), ...(typeof email === "string" && { email: email.trim() || null }), ...(typeof address === "string" && { address: address.trim() || null }) } });
};
const deleteCustomer = async (id) => {
    if (!await prisma_1.default.customer.findUnique({ where: { id } }))
        throw new ApiError_1.default(404, "Customer not found");
    const invoiceCount = await prisma_1.default.invoice.count({ where: { customerId: id } });
    if (invoiceCount > 0)
        throw new ApiError_1.default(400, `Cannot delete: this customer has ${invoiceCount} invoice(s) on record`);
    return prisma_1.default.customer.delete({ where: { id } });
};
exports.customerServices = { createCustomer, findOrCreateCustomer, getAllCustomers, getSingleCustomer, updateCustomer, deleteCustomer };
