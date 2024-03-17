import mongoose from "mongoose"
const schema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
})

const userModal = mongoose.model("user",schema)

export default userModal