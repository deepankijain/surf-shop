const faker = require('faker');
const Post = require('./models/post');

seedPosts = async ()=>{
    await Post.remove({});
    for(const i of new Array(40)){
        const post ={
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                '_id': '5f43e23daea9161ffcb6130b',
                'username': 'dee'
            }
        };
        await Post.create(post);
    }
    console.log('40 posts created!');
}

module.exports = seedPosts;