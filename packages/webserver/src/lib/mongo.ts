const mongoose = require('mongoose');
import { MONGO_CONNECTION } from 'config/src/mongo';

export default async function main() {
    await mongoose.connect(MONGO_CONNECTION);
}
