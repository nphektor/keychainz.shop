const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;
const productsFilePath = path.join(__dirname, 'products.ts');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.ico'),
    backgroundColor: '#0a0e27',
    title: 'Product Studio - Manager'
  });

  mainWindow.loadFile('index.html');
  
  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('read-products', async () => {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    // Extract the array from the TypeScript file
    const match = data.match(/export const PRODUCTS[^=]*=\s*(\[[\s\S]*\]);/);
    if (match) {
      return JSON.parse(match[1]);
    }
    return [];
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
});

ipcMain.handle('write-products', async (event, products) => {
  try {
    const tsContent = `import type { Product } from '../types';

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};`;
    
    await fs.writeFile(productsFilePath, tsContent, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing products:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('export-products', async (event, products) => {
  try {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Export Products',
      defaultPath: 'products.ts',
      filters: [
        { name: 'TypeScript Files', extensions: ['ts'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (filePath) {
      const tsContent = `import type { Product } from '../types';

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};`;
      
      await fs.writeFile(filePath, tsContent, 'utf-8');
      return { success: true, path: filePath };
    }
    return { success: false, cancelled: true };
  } catch (error) {
    console.error('Error exporting products:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('import-products', async () => {
  try {
    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Import Products',
      filters: [
        { name: 'TypeScript Files', extensions: ['ts'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (filePaths && filePaths.length > 0) {
      const data = await fs.readFile(filePaths[0], 'utf-8');
      const match = data.match(/export const PRODUCTS[^=]*=\s*(\[[\s\S]*\]);/);
      if (match) {
        return { success: true, products: JSON.parse(match[1]) };
      }
      return { success: false, error: 'Invalid file format' };
    }
    return { success: false, cancelled: true };
  } catch (error) {
    console.error('Error importing products:', error);
    return { success: false, error: error.message };
  }
});
