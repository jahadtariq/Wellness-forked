const Users = require("../../models/Users");

async function newUser(req,res){
    const { username, email, password } = req.body
    try {
        const newUser = new Users({
            username, email, password
        })
        await newUser.save();
        res.status(200).json({ message: "User saved successfully" })
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
        return;
    }
};

module.exports = {newUser};
