function updateNews(store, id, data) {
    const idx = store.findIndex((n) => n.newsId === id);
    if (idx < 0) return store;
    const news = store.find((n) => n.newsId === id);
    store[idx] = {news, ...data};
    return store;
}

function deleteNews(store, id) {
    return store.filter((n) => n.newsId !== id);
}

export default {
    updateNews,
    deleteNews
}