# 🎨 Velora E-Commerce - Icon Library

## Overview

Your project uses **two icon libraries**:

1. **Material-UI Icons** (`@mui/icons-material`)
2. **FontAwesome** (`@fortawesome/fontawesome-free`)

---

## 📱 Material-UI Icons Used

### Current Icons:

| Icon                  | Component  | Usage                     | Location                                                               |
| --------------------- | ---------- | ------------------------- | ---------------------------------------------------------------------- |
| `ShoppingCartIcon`    | CartIcon   | Shopping cart with badge  | [src/Components/CartIcon.jsx](src/Components/CartIcon.jsx)             |
| `FavoriteBorderIcon`  | Nav        | Heart icon for wishlist   | [src/Components/Layout/Nav.jsx](src/Components/Layout/Nav.jsx)         |
| `Person2OutlinedIcon` | Nav        | User profile icon         | [src/Components/Layout/Nav.jsx](src/Components/Layout/Nav.jsx)         |
| `CloseIcon`           | CartDrawer | Close/X button for drawer | [src/Components/CartDrawer.jsx](src/Components/CartDrawer.jsx)         |
| `Rating`              | Components | Star rating display       | [src/Components/Detailsproudct.jsx](src/Components/Detailsproudct.jsx) |

---

## 🎯 FontAwesome Icons Used

### Current Icons:

| Icon           | Class               | Component  | Usage                  | Location                                                       |
| -------------- | ------------------- | ---------- | ---------------------- | -------------------------------------------------------------- |
| Hamburger Menu | `fa-solid fa-bars`  | Nav        | Mobile menu toggle     | [src/Components/Layout/Nav.jsx](src/Components/Layout/Nav.jsx) |
| Minus          | `fa-solid fa-minus` | CartDrawer | Decrease item quantity | [src/Components/CartDrawer.jsx](src/Components/CartDrawer.jsx) |

---

## 🆕 Available Material-UI Icons to Add

### Popular Icons You Can Use:

**Navigation & UI:**

- `HomeIcon` - Home page
- `SearchIcon` - Search functionality
- `MenuIcon` - Menu button
- `CloseIcon` - (already used)
- `NotificationsIcon` - Notifications
- `SettingsIcon` - Settings
- `LogoutIcon` - Sign out
- `LoginIcon` - Sign in

**E-Commerce:**

- `AddShoppingCartIcon` - Add to cart
- `CheckCircleIcon` - Order confirmed
- `LocalShippingIcon` - Shipping
- `PaymentIcon` - Payment method
- `StorefrontIcon` - Store
- `CategoryIcon` - Categories

**Actions:**

- `FavoriteBorderIcon` - (already used)
- `FavoriteIcon` - Filled heart
- `AddIcon` - Add/plus
- `DeleteIcon` - Delete item
- `EditIcon` - Edit
- `VisibilityIcon` - View/show
- `VisibilityOffIcon` - Hide

**Information:**

- `InfoIcon` - Information
- `WarningIcon` - Warning
- `ErrorIcon` - Error
- `HelpIcon` - Help

**Sorting & Filtering:**

- `SortIcon` - Sort
- `FilterListIcon` - Filter
- `GridViewIcon` - Grid view
- `ViewListIcon` - List view

---

## 🎨 Adding New Icons

### Step 1: Import the Icon

```jsx
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
```

### Step 2: Use in Component

```jsx
<ShoppingBagIcon style={{ color: "#C8A882" }} />
```

### Example: Add a Delete Icon

```jsx
// In CartDrawer.jsx
import DeleteIcon from "@mui/icons-material/Delete";

// In your JSX
<IconButton onClick={handleDelete} sx={{ color: "#C8A882" }}>
  <DeleteIcon />
</IconButton>;
```

---

## 📚 Resources

**Material-UI Icons Directory:**
https://mui.com/material-ui/material-icons/

**Search Material Icons:**
https://fonts.google.com/icons

**FontAwesome Icons:**
https://fontawesome.com/icons

---

## 🎯 Recommended Additions

For a complete e-commerce experience, consider adding:

1. **Product Page Icons:**
   - ⭐ Star ratings (already using Rating component)
   - 🛍️ Shopping bag
   - ❤️ Favorite/wishlist

2. **Navigation Icons:**
   - 🏠 Home
   - 🔍 Search
   - ⚙️ Settings
   - 👤 Profile

3. **Actions Icons:**
   - ➕ Add to cart
   - 🗑️ Delete
   - ✏️ Edit
   - 📋 Details

4. **Status Icons:**
   - ✅ Success/confirmed
   - 🚚 Shipping
   - 💳 Payment
   - 📦 Order tracking

---

## 🎨 Styling Brand Colors

Apply your brand color **#C8A882** to any icon:

```jsx
<ShoppingCartIcon style={{ color: '#C8A882' }} />
// or
<DeleteIcon sx={{ color: '#C8A882' }} />
```

---

**Happy Styling! 🚀**
