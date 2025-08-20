const Product = require("../model/Product");
const ProductStat = require("../model/ProductStat");
const User = require("../model/User");
const Transaction = require("../model/Transaction");
const getCountryIso3 = require("country-iso-2-to-3");
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });

        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    // sort from the mui will be in this format {field: 'userId', sort: 'desc'}
    const { page = 1, pageSize = 20, sort = "desc", search = "" } = req.query;

    const generateSort = () => {
      // basically converting the sort string to an object that mongoDB can understand, converting to [userField: -1]
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "desc" ? -1 : 1,
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: new RegExp(search, "i") },
    });
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getGeography = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }); // Since the user role has info about the country

    const mappedLocation = users.reduce((acc, { country }) => {
      // converting the country field from 2 letters to 3
      const countryISO3 = getCountryIso3(country); // counting the number of users from each country
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocation).map(
      ([country, code]) => {
        // converting to a format that the nivo api can understand
        return { id: country, value: code };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getProducts, getCustomers, getTransactions, getGeography };
