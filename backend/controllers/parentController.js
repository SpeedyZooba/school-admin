const { parentService } = require("../services/parentService.js");

async function registerParent(req, res) {
    try {
        const { ParentId, FirstName, LastName, Sex, PhoneNo, Email, Address } = req.body;
        const parent = await parentService.createParent({ ParentId, FirstName, LastName, Sex, PhoneNo, Email, Address });
        res.status(201).json(parent);
    } catch (error) {
        console.error("An error occurred while registering the parent.", error);
        res.status(500).json({ error: error.message });
    }
}

// Export the function for use in other parts of your application
module.exports = {
    registerParent
}