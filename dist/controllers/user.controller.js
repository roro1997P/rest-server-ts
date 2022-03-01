"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            order: [['id', 'ASC']]
        });
        res.status(200).json({
            users
        });
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `User with id ${id} not exists`
            });
        }
        res.status(200).json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.getUser = getUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: 'No se puede crear un usuario con ese email'
            });
        }
        const user = yield user_1.default.create(body);
        res.json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id, {
            plain: true
        });
        if (!user) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        yield user.update(body);
        res.status(200).json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user || !user.getDataValue('state')) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        yield user.update({ state: false });
        res.status(200).json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map