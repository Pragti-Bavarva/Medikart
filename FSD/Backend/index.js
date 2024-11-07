const port = 5555;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Middleware
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.JWT_SECRET; // Load JWT secret from .env

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://demo:demo@cluster0.ojedhnz.mongodb.net/Medicine",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define Schema and Models
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const MedicineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  Medicine_name: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Category: {
    name: {
      type: String,
      required: true,
    },
    subcategory: {
      type: [subcategorySchema],
      default: [],
    },
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
const Medicine = mongoose.model("Medicine", MedicineSchema);

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.plugin(AutoIncrement, { inc_field: "userId" });
const User = mongoose.model("User", userSchema);

// Register a new user with hashed password
app.post("/addUser", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if email or phone is already registered
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }
      if (existingUser.phone === phone) {
        return res
          .status(400)
          .json({ message: "This phone number is already registered." });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword, // Save hashed password
    });

    await newUser.save();
    res.status(201).json({
      message: "User added successfully!",
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user.", error: error.message });
    console.log("Error adding user:", error);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// // Login a user
// app.post("/login", async (req, res) => {
//   const { email, phone, password } = req.body;

//   try {
//     // Find the user by email or phone
//     const user = await User.findOne({ $or: [{ email }, { phone }] });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     // Check if the password matches
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

//     res.json({ success: true, token });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// });
app.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    // Find the user by both email and phone
    const user = await User.findOne({ email, phone });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      success: true,
      token,
      user: { email: user.email, phone: user.phone, name: user.name },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Example protected route to get user profile
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
//Profile
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Find user by ID
    if (!user) return res.sendStatus(404);

    // Fetch user orders and addresses if needed
    const orders = await Order.find({ userId: user._id });
    const addresses = await Address.find({ userId: user._id });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      orders,
      addresses,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Image Storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Medicart Inventory API");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.post("/addMedicine", async (req, res) => {
  console.log("Request Body:", req.body);
  const newMedicine = new Medicine({
    id: req.body.id,
    Medicine_name: req.body.Medicine_name,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    Description: req.body.Description,
    Image: req.body.Image,
    Category: {
      name: req.body.Category.name,
      subcategory: req.body.Category.subcategory.map((sub) => ({ name: sub })),
    },
  });
  try {
    await newMedicine.save();
    console.log("Saved");
    res.json({
      success: true,
      name: req.body.Medicine_name,
    });
  } catch (error) {
    console.error("Error saving Medicine:", error);
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Medicine with this ID already exists",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
});

app.get("/allMedicines", async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    let query = {};

    if (category) {
      query["Category.name"] = category;
    }

    if (subcategory) {
      query["Category.subcategory.name"] = subcategory;
    }

    const medicines = await Medicine.find(query);
    console.log("Medicines Fetched:", medicines.length);
    res.send(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching medicines." });
  }
});

app.post("/removeMedicine", async (req, res) => {
  try {
    await Medicine.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      message: "Medicine removed successfully",
    });
  } catch (error) {
    console.error("Error removing Medicine:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/removeUser", async (req, res) => {
  try {
    await User.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      message: "User details removed successfully",
    });
  } catch (error) {
    console.error("Error removing user detail", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Medicine by ID
app.get("/medicine/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
      res.json(medicine);
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.error("Error fetching medicine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
/////////
 app.get("/inventory", async (req, res) => {
  try {
    const { category } = req.query;
    let matchQuery = {};

    if (category) {
      matchQuery["Category.name"] = category;
    }

    const inventory = await Medicine.aggregate([
      { $match: matchQuery }, // Match the specific category if provided
      {
        $group: {
          _id: "$Category.name", // Group by category name
          totalQuantity: { $sum: { $toInt: "$Quantity" } }, // Sum the quantity for each category
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id", // Use _id (category name)
          totalQuantity: 1,
        },
      },
    ]);

    if (inventory.length > 0) {
      res.json({
        success: true,
        inventory,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No medicines found",
      });
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
///////////////////////////
app.get("/inventory/subcategories", async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const inventory = await Medicine.aggregate([
      { $match: { "Category.name": category } }, // Match selected category
      {
        $group: {
          _id: "$Category.subcategory.name", // Group by subcategory
          totalQuantity: { $sum: { $toInt: "$Quantity" } }, // Sum quantity for each subcategory
        },
      },
      {
        $project: {
          _id: 0,
          subcategory: "$_id", // Display subcategory
          totalQuantity: 1,
        },
      },
    ]);

    if (inventory.length > 0) {
      res.json({
        success: true,
        subcategories: inventory,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No subcategories found for the selected category",
      });
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
// Example in Node.js (Express.js)
// Assuming you have a database to fetch the medicines from
app.get('/api/medicines', async (req, res) => {
  const searchQuery = req.query.search;
  let medicines;

  if (searchQuery) {
    medicines = await Medicine.find({
      name: { $regex: searchQuery, $options: 'i' }
    });
  } else {
    medicines = await Medicine.find();  // Fetch all if no search query
  }

  res.json(medicines);
});
