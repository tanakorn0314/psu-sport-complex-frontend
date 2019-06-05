function countBooking(selectedBooking) {
    const rows = Object.values(selectedBooking);
    let notNull = [];
    rows.forEach((row) => (row.forEach(slot => { if (!!slot) notNull.push(slot); })));

    return notNull.length;
}

export {
    countBooking
}