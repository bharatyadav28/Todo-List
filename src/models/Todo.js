import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TodosSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Todo user cannot be empty"],
  },
  todos: [todoSchema],
});

const TodosModel =
  mongoose.models.todos || mongoose.model("todos", TodosSchema);

export default TodosModel;
