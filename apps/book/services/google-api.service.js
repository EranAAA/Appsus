
const YT_KEY = `AIzaSyAUhix-T65YKr_HHtSgVKd7DHKNapvre4Y`

export const googleApiService = {
    getBookApi,
}

function getBookApi(value) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`)
        .then(res => {
            return res.data.items
        }).then(items => {
            let itemPicked = []
            items.map(item => {
                itemPicked.push(
                    {
                        id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                        publishedDate: item.volumeInfo.publishedDate,
                        language: item.volumeInfo.language,
                        subtitle: item.volumeInfo.subtitle,

                        listPrice: {
                            amount: 100,
                            currencyCode: 'USD',
                            isOnSale: false
                        },

                        description: item.volumeInfo.description,
                        pageCount: item.volumeInfo.pageCount,
                        categories: item.volumeInfo.categories || [],
                        thumbnail: item.volumeInfo.imageLinks.thumbnail
                    })
            })
            return itemPicked
        }).catch(err => console.log('Had error:', err))
}