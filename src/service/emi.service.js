import Loan from '../model/loan.model.js';

function calculateEMI(loanAmount, interestRate, tenureMonths) {
    const monthlyRate = interestRate / (12 * 100);
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
}

export const calculateEMIHandler = async (req, res) => {
    const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount } = req.body;
    const emi = calculateEMI(loan_amount, interest_rate, loan_tenure_months);

    let remaining_balance = loan_amount;
    let monthWisePayments = [];
    let currentTenure = loan_tenure_months;

    for (let month = 1; month <= loan_tenure_months; month++) {
        let interestPaid = remaining_balance * (interest_rate / (12 * 100))
        let principalPaid = emi - interestPaid;

        if (prepayment_amount && month === 1) {
            remaining_balance -= prepayment_amount;
            principalPaid += prepayment_amount;
        }

        remaining_balance -= principalPaid;
        monthWisePayments.push({
            month,
            emiPaid: emi,
            interestPaid: interestPaid,
            principalPaid: principalPaid,
            prepayment: month === 1 ? prepayment_amount : 0,
            remainingBalance: remaining_balance,
        });

        if (remaining_balance <= 0) break;
    }

    try {
        const loan = await Loan.create({
            loan_amount,
            interest_rate,
            loan_tenure_months: currentTenure,
            emi,
            prepayment_amount: prepayment_amount || 0,
            remaining_balance,
        });

        res.json({
            loanAmount: loan_amount,
            interestRate: interest_rate,
            loanTenureMonths: currentTenure,
            emi,
            prepayment: prepayment_amount || 0,
            monthWisePayments,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll();
        res.json(loans);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.id);
        if (loan) {
            res.json(loan);
        } else {
            res.status(404).send({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
