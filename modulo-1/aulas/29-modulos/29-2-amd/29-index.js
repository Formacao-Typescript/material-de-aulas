var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "node:fs", "node:crypto", "node:path"], function (require, exports, node_fs_1, crypto, node_path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar = exports.foo = void 0;
    crypto = __importStar(crypto);
    node_path_1 = __importDefault(node_path_1);
    function read(file) {
        return (0, node_fs_1.readFileSync)(file, 'utf8');
    }
    exports.default = read;
    function foo() {
        console.log('foo', crypto.createHash('md5').update(node_path_1.default.resolve(__dirname, '29-esm.ts')).digest('hex'));
    }
    exports.foo = foo;
    exports.bar = 123;
});
