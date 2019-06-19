function extranctMyBills(userId, bills) {
    let result = [];
    if (bills)
        bills.forEach((bill) => {
            if (bill.userId === userId)
                result.push(bill);
        });
    return result;
}

export default {
    extranctMyBills
}