const { UserAddresses } = require("../models");
module.exports = {
  userAddress: async (req, res) => {
    try {
      const { apartmentNumber, landmark, type } = req.body;
      const userId = req.user.id;
      const address = await UserAddresses.create({
        apartmentNumber,
        landmark,
        type,
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
      const userId = req.user.id;
      const useraddress = await UserAddresses.findAll({
        where: { userId },
      });
      res.success({ useraddress });
      console.log(useraddress);
    } catch (error) {
      console.log(error);
      res.internalError(error);
    }
  },
  updateUserAddress: async (req, res) => {
    try {
      const useraddress = req.params.id;
      const { apartmentNumber, landmark, type } = req.body;
      const userId = req.user.id;
      const address = await UserAddresses.findOne({
        where: { userId, id: useraddress },
      });
      address.apartmentNumber = apartmentNumber;
      address.landmark = landmark;
      address.type = type;
      await address.save();
      res.success({ address });
    } catch (error) {
      console.log(error.message);
      res.internalError({ error });
    }
  },
  deleteUserAddress: async (req, res) => {
    try {
      const useraddress = req.params.id;
      const userId = req.user.id;
      const address = await UserAddresses.findOne({
        where: { userId, id: useraddress },
      });
      await address.destroy();
      res.success({ address });
    } catch (error) {
      res.internalError({ error });
    }
  },
};
