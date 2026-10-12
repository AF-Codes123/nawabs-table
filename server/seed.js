const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const items = [
  // ---------- BBQ ----------
  { name: 'Chicken Tikka', description: 'Charcoal pe pakka hua juicy tikka', price: 700, category: 'BBQ', isSpicy: true, rating: 4.6 },
  { name: 'Seekh Kabab', description: 'Masaledar beef seekh, 4 pieces', price: 650, category: 'BBQ', rating: 4.5 },
  { name: 'Malai Boti', description: 'Cream aur kaali mirch mein marinate narm boti', price: 850, category: 'BBQ', rating: 4.7 },
  { name: 'Chapli Kabab', description: 'Peshawari style kurkuray chapli, 2 pieces', price: 500, category: 'BBQ', isSpicy: true, rating: 4.4 },
  { name: 'Behari Boti', description: 'Behari masale mein dheemi aanch pe pakki boti', price: 900, category: 'BBQ', isSpicy: true, rating: 4.6 },
  { name: 'Reshmi Kabab', description: 'Resham jaise naram chicken kabab', price: 750, category: 'BBQ', rating: 4.5 },

  // ---------- KARAHI ----------
  { name: 'Chicken Karahi', description: 'Tamatar, adrak aur hari mirch wali desi karahi', price: 1800, category: 'Karahi', isSpicy: true, rating: 4.8 },
  { name: 'Mutton Karahi', description: 'Namkeen mutton karahi, tandoori roti ke saath', price: 3200, category: 'Karahi', isSpicy: true, rating: 4.9 },
  { name: 'Chicken Handi', description: 'Malaidar handi, makhan aur kasuri methi ke saath', price: 1500, category: 'Karahi', rating: 4.5 },
  { name: 'Namkeen Gosht', description: 'Sirf namak aur mirch mein pakka asli gosht', price: 2800, category: 'Karahi', rating: 4.7 },
  { name: 'Makhni Karahi', description: 'Makhan aur cream wali garma garam karahi', price: 2000, category: 'Karahi', rating: 4.6 },

  // ---------- RICE ----------
  { name: 'Chicken Biryani', description: 'Khushboodar biryani raita ke saath', price: 450, category: 'Rice', rating: 4.4 },
  { name: 'Sindhi Biryani', description: 'Teekhi aur masaledar Sindhi biryani', price: 520, category: 'Rice', isSpicy: true, rating: 4.5 },
  { name: 'Mutton Pulao', description: 'Yakhni mein pakka nafees mutton pulao', price: 650, category: 'Rice', rating: 4.6 },
  { name: 'Chana Pulao', description: 'Kabuli chane wala halka pulao', price: 350, category: 'Rice', rating: 4.2 },

  // ---------- BREAD ----------
  { name: 'Butter Naan', description: 'Tandoor ka garma garam naan', price: 80, category: 'Bread', rating: 4.3 },
  { name: 'Garlic Naan', description: 'Lehsan aur dhaniye wala crispy naan', price: 120, category: 'Bread', rating: 4.5 },
  { name: 'Tandoori Roti', description: 'Taza tandoor ki khasta roti', price: 30, category: 'Bread', rating: 4.2 },
  { name: 'Kulcha', description: 'Naram aur mulayam khameeri kulcha', price: 100, category: 'Bread', rating: 4.3 },
  { name: 'Lacha Paratha', description: 'Parat dar desi ghee ka paratha', price: 140, category: 'Bread', rating: 4.6 },

  // ---------- DESSERT ----------
  { name: 'Gulab Jamun', description: '2 pieces, thande ya garam', price: 200, category: 'Dessert', rating: 4.7 },
  { name: 'Kheer', description: 'Dheemi aanch pe pakki chawal ki kheer', price: 180, category: 'Dessert', rating: 4.5 },
  { name: 'Gajar Halwa', description: 'Desi ghee mein bana gajar ka halwa', price: 250, category: 'Dessert', rating: 4.6 },
  { name: 'Kulfi', description: 'Malai aur pistay wali thandi kulfi', price: 150, category: 'Dessert', rating: 4.4 },
  { name: 'Falooda', description: 'Rooh Afza, kulfi aur sewiyan ke saath', price: 300, category: 'Dessert', rating: 4.7 },

  // ---------- DRINKS ----------
  { name: 'Mint Margarita', description: 'Thanda pudina wala drink', price: 250, category: 'Drinks', rating: 4.5 },
  { name: 'Sweet Lassi', description: 'Malaidar mithi lassi, bara glass', price: 200, category: 'Drinks', rating: 4.6 },
  { name: 'Doodh Patti Chai', description: 'Kadak dhaba style doodh patti', price: 100, category: 'Drinks', rating: 4.8 },
  { name: 'Kashmiri Chai', description: 'Gulabi namkeen chai, badam ke saath', price: 180, category: 'Drinks', rating: 4.5 },
  { name: 'Rooh Afza Sharbat', description: 'Thanda doodh wala Rooh Afza', price: 150, category: 'Drinks', rating: 4.3 },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await MenuItem.deleteMany();
    await MenuItem.insertMany(items);
    console.log(`🌱 ${items.length} dishes add ho gayin`);
    process.exit();
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });