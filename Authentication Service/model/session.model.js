import { sequelize } from "../config/connectDB.js";
import { DataTypes } from "sequelize";

const Session = sequelize.define("Session", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,  
    },
    userId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, { timestamps: true });

export default Session;
