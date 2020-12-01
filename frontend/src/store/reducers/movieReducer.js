const dummyData = [
    {
        id: 1,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 1',
        subTitle: 'Watch the kin take flight.',
        rating: 1,
        trailerDuration: '00:14',
    },
    {
        id: 2,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 2',
        subTitle: 'Whatever baby master demands.',
        rating: 6.6,
        trailerDuration: '00:14',
    },
    {
        id: 3,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 3',
        subTitle: 'Watch the trailer.',
        rating: 7.6,
        trailerDuration: '00:14',
    },
    {
        id: 4,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 4',
        subTitle: 'Watch the kin take flight.',
        rating: 9,
        trailerDuration: '00:14',
    },
    {
        id: 5,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 5',
        subTitle: 'Whatever baby master demands.',
        rating: 10,
        trailerDuration: '00:14',
    },
    {
        id: 6,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 6',
        subTitle: 'Watch the trailer.',
        rating: 3,
        trailerDuration: '00:14',
    }
];

const initialState = {
    peeks: [...dummyData],
    recommendations: [...dummyData],
    fanFavorties: [...dummyData]
};


const movieReducer = (state = initialState, action) => {
    return state;
};

export default movieReducer;