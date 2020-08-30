const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'deepankijain',
    api_key: '661866687456686',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = cloudinary;
