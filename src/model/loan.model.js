import db from "../db/db.config.js";
import { DataTypes } from "sequelize";

const Loan = db.define("loan", {
    loan_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    interest_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    loan_tenure_months: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    emi: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    prepayment_amount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
    },
    remaining_balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
}, {
    timestamps: false
});

export default Loan;

