function updateStadium(store, id, data) {
    const idx = store.findIndex((s) => s.stadiumId === id);
    if (idx < 0) return store;
    const stadium = store.find((s) => s.stadiumId === id);
    store[idx] = {stadium, ...data};
    return store;
}

function deleteStadium(store, id) {
    return store.filter((s) => s.stadiumId !== id);
}

export default {
    updateStadium,
    deleteStadium
}