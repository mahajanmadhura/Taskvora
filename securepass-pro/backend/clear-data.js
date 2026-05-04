const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/securepass';

// Define schemas
const passwordSchema = new mongoose.Schema({}, { strict: false });
const reminderSchema = new mongoose.Schema({}, { strict: false });
const workNoteSchema = new mongoose.Schema({}, { strict: false });
const fileSchema = new mongoose.Schema({}, { strict: false });

const Password = mongoose.model('Password', passwordSchema, 'passwords');
const Reminder = mongoose.model('Reminder', reminderSchema, 'reminders');
const WorkNote = mongoose.model('WorkNote', workNoteSchema, 'worknotes');
const UploadedFile = mongoose.model('UploadedFile', fileSchema, 'uploadedfiles');

async function clearAllData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await Password.deleteMany({});
        console.log('✅ Cleared all passwords');

        await Reminder.deleteMany({});
        console.log('✅ Cleared all reminders');

        await WorkNote.deleteMany({});
        console.log('✅ Cleared all work notes');

        await UploadedFile.deleteMany({});
        console.log('✅ Cleared all uploaded files');

        console.log('\n✅ All data cleared successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

clearAllData();
