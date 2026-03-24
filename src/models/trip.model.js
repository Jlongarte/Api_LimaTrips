const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: ["City", "Adventure", "Beach", "Offers"],
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://theme793-travel-agency.myshopify.com/cdn/shop/products/discover_costa_rica_1_576x.jpg?v=1572868916",
    },
    backupImages: {
      type: [String],
      default: [
        "https://theme793-travel-agency.myshopify.com/cdn/shop/products/discover_costa_rica_1_576x.jpg?v=1572868916",
        "https://theme793-travel-agency.myshopify.com/cdn/shop/products/discover_costa_rica_2_576x.jpg?v=1572868916",
        "https://theme793-travel-agency.myshopify.com/cdn/shop/products/discover_costa_rica_3_576x.jpg?v=1572868916",
        "https://theme793-travel-agency.myshopify.com/cdn/shop/products/discover_costa_rica_4_576x.jpg?v=1572868916",
        "https://theme793-travel-agency.myshopify.com/cdn/shop/products/discover_costa_rica_5_576x.jpg?v=1572868916",
      ],
    },

    hotelCategory: {
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },

    stock: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "Out of Stock",
    },

    services: {
      type: String,
      enum: ["B&B", "Half Board", "Full Board", "All Included"],
      default: "B&B",
    },

    duration: {
      type: Number,
      default: 7,
      min: 1,
    },

    watches: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Trip", tripSchema);
