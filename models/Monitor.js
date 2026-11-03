import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Укажите название монитора!"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Укажите модель монитора!"],
    trim: true,
  },
  size: {
    type: String,
    required: [true, "Укажите размер монитора!"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Укажите цену монитора!"],
    min: 0,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Monitor", monitorSchema);
