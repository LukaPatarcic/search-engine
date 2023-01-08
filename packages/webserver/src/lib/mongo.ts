const mongoose = require('mongoose');

export default async function main() {
    await mongoose.connect('mongodb://localhost:27017/search-engine');

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
