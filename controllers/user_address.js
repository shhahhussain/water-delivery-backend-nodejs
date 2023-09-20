const { UserAddresses } = require("../models");
module.exports = {
  userAddress: async (req, res) => {
    try {
      const { apartmentNumber, landmark } = req.body;
      const userId = req.user;
      console.log(userId);
      const address = await UserAddresses.create({
        apartmentNumber,
        landmark,
        userId,
      });
      res.success({ message: "Address added !!" });
    } catch (error) {
      console.log(error.message);
      res.internalError({ message: "cannot create address" });
    }
  },
  getUserAddress: async (req, res) => {
    try {
      const userId = req.user;
      console.log(userId);
      const useraddress = await UserAddresses.findAll({
        where: { userId },
      });
      res.success({ useraddress });
    } catch (error) {
      console.log(error);
      res.internalError(error);
    }
  },
};
