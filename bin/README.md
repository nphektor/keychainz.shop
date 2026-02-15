# Product Studio - Desktop Product Manager

A beautiful Windows desktop application for managing your TypeScript product catalog with full CRUD operations.

## Features

✨ **Create** - Add new products with a beautiful modal form
📖 **Read** - Browse products in a stunning grid layout  
✏️ **Update** - Edit existing products
🗑️ **Delete** - Remove products with confirmation
🔍 **Search** - Filter products by name or description
🏷️ **Category Filter** - Filter by product category
💾 **Save** - Save changes to products.ts file
📤 **Export** - Export products to a new .ts file
📥 **Import** - Import products from an existing .ts file

## Installation & Setup

### Method 1: Run from Source (Quick Start)

1. **Install Node.js**
   - Download from: https://nodejs.org/
   - Install the LTS version (includes npm)

2. **Open Command Prompt or PowerShell** in the app folder

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the app:**
   ```bash
   npm start
   ```

### Method 2: Build Standalone Executable

1. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Build the Windows executable:**
   ```bash
   npm run build-win
   ```

3. **Find your app:**
   - The installer will be in the `dist` folder
   - Look for `Product Studio Setup 1.0.0.exe`
   - Install it like any Windows application!

## How to Use

### Basic Operations

1. **View Products**: All products load automatically when you open the app

2. **Search**: Type in the search box to filter products by name or description

3. **Filter by Category**: Click category badges to filter products

4. **Add Product**: 
   - Click the "Add Product" button
   - Fill in the form
   - Click "Create Product"

5. **Edit Product**:
   - Click the blue pencil icon on any product card
   - Modify the fields
   - Click "Update Product"

6. **Delete Product**:
   - Click the red trash icon on any product card
   - Confirm deletion

7. **Save Changes**:
   - Click "Save" button to save to products.ts
   - Or use keyboard shortcut: `Ctrl+S`

8. **Export**: Click "Export" to save products to a new .ts file

9. **Import**: Click "Import" to load products from an existing .ts file

### Keyboard Shortcuts

- `Ctrl+S` - Save products to file
- `Escape` - Close modal

### Status Bar

The bottom bar shows:
- Product count
- Save status (unsaved changes indicator)

## File Structure

```
product-manager-app/
├── main.js          - Electron main process
├── preload.js       - Secure IPC bridge
├── index.html       - Application UI
├── app.js           - Application logic
├── package.json     - Project configuration
├── products.ts      - Your product data file
└── README.md        - This file
```

## Technical Details

- **Framework**: Electron
- **UI**: Vanilla JavaScript with custom CSS
- **Data**: TypeScript files
- **Platform**: Windows (can be adapted for macOS/Linux)

## Troubleshooting

**App won't start?**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again

**Can't save products?**
- Make sure products.ts is in the same folder as the app
- Check file permissions

**Build failed?**
- Make sure you have Python installed (electron-builder dependency)
- Try: `npm install --global windows-build-tools` (run as Administrator)

## Support

For issues or questions, check the console (press F12 in the app) for error messages.

## License

MIT License - Feel free to modify and use as needed!
