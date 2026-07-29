import { Request } from "express";
import ApiError from "../../erros/ApiError";
import prisma from "../../shared/prisma";

const findOrCreateCustomer = async (data: {
    name?: string;
    phone: string;
    email?: string;
    address?: string;
}) => {
    if (!data.phone?.trim()) throw new ApiError(400, "phone is required");
    const phone = data.phone.trim();
    const existing = await prisma.customer.findUnique({ where: { phone } });
    if (existing) return existing;
    return prisma.customer.create({
        data: {
            name: data.name?.trim() || "Walk-in Customer",
            phone,
            email: data.email?.trim(),
            address: data.address?.trim(),
        },
    });
};

const createCustomer = async (req: Request) => {
    const { name, phone, email, address } = req.body;
    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof phone !== "string" ||
        !phone.trim()
    )
        throw new ApiError(400, "name and phone are required");
    const normalizedPhone = phone.trim();
    if (await prisma.customer.findUnique({ where: { phone: normalizedPhone } }))
        throw new ApiError(
            400,
            "A customer with this phone number already exists",
        );
    return prisma.customer.create({
        data: {
            name: name.trim(),
            phone: normalizedPhone,
            email: typeof email === "string" ? email.trim() : undefined,
            address: typeof address === "string" ? address.trim() : undefined,
        },
    });
};

const getAllCustomers = async (req: Request) => {
    const {
        search,
        page = "1",
        limit = "20",
    } = req.query as Record<string, string>;
    const take = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const where = search?.trim()
        ? {
              OR: [
                  {
                      name: {
                          contains: search.trim(),
                          mode: "insensitive" as const,
                      },
                  },
                  { phone: { contains: search.trim() } },
              ],
          }
        : undefined;
    const [data, total] = await prisma.$transaction([
        prisma.customer.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (currentPage - 1) * take,
            take,
        }),
        prisma.customer.count({ where }),
    ]);
    return {
        data,
        pagination: {
            page: currentPage,
            limit: take,
            total,
            pages: Math.ceil(total / take),
        },
    };
};

const getSingleCustomer = async (id: string) => {
    const customer = await prisma.customer.findUnique({
        where: { id },
        include: {
            invoices: {
                orderBy: { createdAt: "desc" },
                include: { items: true },
            },
        },
    });
    if (!customer) throw new ApiError(404, "Customer not found");
    return customer;
};

const updateCustomer = async (id: string, payload: Record<string, unknown>) => {
    if (!(await prisma.customer.findUnique({ where: { id } })))
        throw new ApiError(404, "Customer not found");
    const { name, phone, email, address } = payload;
    if (name !== undefined && (typeof name !== "string" || !name.trim()))
        throw new ApiError(400, "name must be a non-empty string");
    if (phone !== undefined) {
        if (typeof phone !== "string" || !phone.trim())
            throw new ApiError(400, "phone must be a non-empty string");
        if (
            await prisma.customer.findFirst({
                where: { phone: phone.trim(), id: { not: id } },
            })
        )
            throw new ApiError(
                400,
                "A customer with this phone number already exists",
            );
    }
    return prisma.customer.update({
        where: { id },
        data: {
            ...(typeof name === "string" && { name: name.trim() }),
            ...(typeof phone === "string" && { phone: phone.trim() }),
            ...(typeof email === "string" && { email: email.trim() || null }),
            ...(typeof address === "string" && {
                address: address.trim() || null,
            }),
        },
    });
};

const deleteCustomer = async (id: string) => {
    if (!(await prisma.customer.findUnique({ where: { id } })))
        throw new ApiError(404, "Customer not found");
    const invoiceCount = await prisma.invoice.count({
        where: { customerId: id },
    });
    if (invoiceCount > 0)
        throw new ApiError(
            400,
            `Cannot delete: this customer has ${invoiceCount} invoice(s) on record`,
        );
    return prisma.customer.delete({ where: { id } });
};

export const customerServices = {
    createCustomer,
    findOrCreateCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
