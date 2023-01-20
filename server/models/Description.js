import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema(
   {
      description: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   },
   { timestamps: true },
);

export default mongoose.model('Description', DescriptionSchema);