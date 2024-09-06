-- Active: 1707027281598@@127.0.0.1@5432@emi_db@public
CREATE TABLE IF NOT EXISTS Loans (
    id SERIAL PRIMARY KEY,
    loan_amount DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    loan_tenure_months INTEGER NOT NULL,
    emi DECIMAL(15, 2) NOT NULL,
    prepayment_amount DECIMAL(15, 2) DEFAULT 0,
    remaining_balance DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);