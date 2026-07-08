"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "dgak3ha1i",
    api_key: "172911419654983",
    api_secret: "8KCIwv6b63vh--oIHRbMjjfuejY",
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream((error, result) => {
            if (error) {
                return reject(error);
            }
            if (result) {
                resolve(result);
            }
            else {
                reject(new Error("Cloudinary upload failed."));
            }
        })
            .end(file.buffer);
    });
};
exports.fileUploader = {
    upload,
    uploadToCloudinary,
};
