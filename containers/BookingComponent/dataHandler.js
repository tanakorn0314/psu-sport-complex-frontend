function seperateDataByStartTime(bookingsData) {
    const seperatedData = {};

    bookingsData.forEach((booking) => {
        const startTime = booking.startDate.slice(11, 16);
        if (!seperatedData[startTime])
            seperatedData[startTime] = [];
        seperatedData[startTime][booking.courtId - 1] = booking;
    })

    return seperatedData;
}


export default {
    seperateDataByStartTime
}