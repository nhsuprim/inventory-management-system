"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerControllers = void 0;
const customer_services_1 = require("./customer.services");
const createCustomer = async (req, res, next) => {
    try {
        const result = await customer_services_1.customerServices.createCustomer(req);
        res.status(201).json({ success: true, message: "Customer created successfully", data: result });
    }
    catch (error) {
        next(error);
    }
};
const getAllCustomers = async (req, res, next) => {
    try {
        const result = await customer_services_1.customerServices.getAllCustomers(req);
        res.status(200).json({ success: true, message: "Customers retrieved successfully", ...result });
    }
    catch (error) {
        next(error);
    }
};
const getSingleCustomer = async (req, res, next) => {
    try {
        const result = await customer_services_1.customerServices.getSingleCustomer(req.params.id);
        res.status(200).json({ success: true, message: "Customer retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
};
const updateCustomer = async (req, res, next) => {
    try {
        const result = await customer_services_1.customerServices.updateCustomer(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Customer updated successfully", data: result });
    }
    catch (error) {
        next(error);
    }
};
const deleteCustomer = async (req, res, next) => {
    try {
        const result = await customer_services_1.customerServices.deleteCustomer(req.params.id);
        res.status(200).json({ success: true, message: "Customer deleted successfully", data: result });
    }
    catch (error) {
        next(error);
    }
};
exports.customerControllers = { createCustomer, getAllCustomers, getSingleCustomer, updateCustomer, deleteCustomer };
