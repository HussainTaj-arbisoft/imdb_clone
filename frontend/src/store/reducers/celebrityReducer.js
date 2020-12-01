const dummyData = [
    {
        id: 1,
        imageUrl: 'https://us.123rf.com/450wm/kritchanut/kritchanut1812/kritchanut181200017/113999023-isolated-portrait-of-happy-smiling-asian-man-wearing-casual-black-t-shirt-pointing-hand-to-empty-spa.jpg',
        name: 'Celeb 1',
        age: 24
    },
    {
        id: 2,
        imageUrl: 'https://us.123rf.com/450wm/kritchanut/kritchanut1812/kritchanut181200017/113999023-isolated-portrait-of-happy-smiling-asian-man-wearing-casual-black-t-shirt-pointing-hand-to-empty-spa.jpg',
        name: 'Celeb 2',
        age: 24
    },
    {
        id: 3,
        imageUrl: 'https://us.123rf.com/450wm/kritchanut/kritchanut1812/kritchanut181200017/113999023-isolated-portrait-of-happy-smiling-asian-man-wearing-casual-black-t-shirt-pointing-hand-to-empty-spa.jpg',
        name: 'Celeb 3',
        age: 24
    },
    {
        id: 4,
        imageUrl: 'https://us.123rf.com/450wm/kritchanut/kritchanut1812/kritchanut181200017/113999023-isolated-portrait-of-happy-smiling-asian-man-wearing-casual-black-t-shirt-pointing-hand-to-empty-spa.jpg',
        name: 'Celeb 4',
        age: 24
    },
    {
        id: 5,
        imageUrl: 'https://us.123rf.com/450wm/kritchanut/kritchanut1812/kritchanut181200017/113999023-isolated-portrait-of-happy-smiling-asian-man-wearing-casual-black-t-shirt-pointing-hand-to-empty-spa.jpg',
        name: 'Celeb 5',
        age: 24
    },
    {
        id: 6,
        imageUrl: 'https://us.123rf.com/450wm/kritchanut/kritchanut1812/kritchanut181200017/113999023-isolated-portrait-of-happy-smiling-asian-man-wearing-casual-black-t-shirt-pointing-hand-to-empty-spa.jpg',
        name: 'Celeb 6',
        age: 24
    }
];

const initialState = {
    bornToday: [...dummyData],
};


const celebrityReducer = (state = initialState, action) => {
    return state;
};

export default celebrityReducer;