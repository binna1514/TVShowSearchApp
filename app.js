const form = document.querySelector('#searchForm');
let res;

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (res) {
        deleteImages();
    }
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data)
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

const deleteImages = () => {
    const images = document.querySelectorAll('IMG');
    for (let image of images) {
        image.remove();
    }
}