const OverallStat = require("../model/OverallStat");

const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find({});
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

module.exports = { getSales };
