"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('This is 2nd Assignment');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
