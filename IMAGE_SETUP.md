# Image Integration Setup Guide

## Quick Start

The project is now configured to use **local images** instead of external URLs. Follow these steps to set up:

### Option 1: Automatic Download (Recommended for Unix/Mac/Linux)

```bash
chmod +x download-images.sh
./download-images.sh
```

This script will automatically download all 20 product images to `public/images/`

### Option 2: Manual Download (Windows or if script fails)

1. Create the images folder if it doesn't exist:
   - `public/images/`

2. Download images using these commands in PowerShell:

```powershell
# Create images directory
New-Item -ItemType Directory -Force -Path "public\images"

# Download each image
$images = @{
    "headphones-1.jpg" = "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop"
    "watch-rolex.jpg" = "https://lh3.googleusercontent.com/aida-public/AB6AXuClMg0N8hBJIfYaz7qh69iQtTyz5ihiiIjLcknKFYjObY-d4AenMA7rXjpA3gvpfMFmMYPb7B0_1EwHCzIPMaVe9_0wToaSS0RRWGbMeDCBN2bkNqiIw63fy1TWn2j1No-cPxPmJZP3c2DYcrVjWKvHdSHlgYd71XMU7lE_YCGLOIdrklex_3iXrCs1SZ3ftmTKK59n9NyP4MKNL2XVCP1Y_TWxhUrBgdkUXrEO_KL2xYcGJvu3aBjTT7BP2IDOE2j0lg6uaaFTr8Q"
    "shoes-nike.jpg" = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
    "watch-casio.jpg" = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
    "phone-iphone.jpg" = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"
    "headphones-sony.jpg" = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
    "shoes-adidas.jpg" = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"
    "phone-samsung.jpg" = "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop"
    "headphones-bose.jpg" = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=600&fit=crop"
    "headphones-classic.jpg" = "https://lh3.googleusercontent.com/aida-public/AB6AXuDp0R08gCPSKSBaH7q3p5fQLwJ88blfZvqQHdboWJhHRwsSiRlYbNRUFBrKKuGW_BVyScD8SUkaii-ViiiY93qhVR-dG86DU8K3HubekbAzvgM8UUwoNeiaTaT5uq0XU6ZBfgsVDz27JEGTNZn9w7yz8M9lWHGvclag1lTv8B00KWuGvchJ0f4ukqwYTZFUPIGIjub5DOeSqk5mtZ5ZuOJefFAt2NlKH6PU3LrwSELMDcZWaMxtQiwwvUtSdOpWujtrd-RHClCwf6Y"
    "shoes-samba.jpg" = "https://media.istockphoto.com/photos/image-of-black-leather-classic-shoes-picture-id1409339182?k=20&m=1409339182&s=612x612&w=0&h=9Ax5AQJR2f3eNuiZbOmXFguI_SJV7qDLWjGznQTO2MM="
    "watch-seiko.jpg" = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
    "watch-garmin.jpg" = "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=600&fit=crop"
    "headphones-sennheiser.jpg" = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop"
    "shoes-nb.jpg" = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"
    "phone-oneplus.jpg" = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"
    "phone-pixel.jpg" = "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop"
    "speaker-jbl.jpg" = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
    "shoes-puma.jpg" = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
    "mic-audio.jpg" = "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop"
}

foreach ($name in $images.Keys) {
    Invoke-WebRequest -Uri $images[$name] -OutFile "public\images\$name"
    Write-Host "✓ Downloaded $name"
}
```

### Option 3: Provide Your Own Images

Simply place your images in the `public/images/` folder with these names:

- `headphones-1.jpg`
- `watch-rolex.jpg`
- `shoes-nike.jpg`
- `watch-casio.jpg`
- `phone-iphone.jpg`
- `headphones-sony.jpg`
- `shoes-adidas.jpg`
- `phone-samsung.jpg`
- `headphones-bose.jpg`
- `headphones-classic.jpg`
- `shoes-samba.jpg`
- `watch-seiko.jpg`
- `watch-garmin.jpg`
- `headphones-sennheiser.jpg`
- `shoes-nb.jpg`
- `phone-oneplus.jpg`
- `phone-pixel.jpg`
- `speaker-jbl.jpg`
- `shoes-puma.jpg`
- `mic-audio.jpg`

## What Was Changed

✅ **[ProductReducer.jsx](src/features/products/ProductReducer.jsx)** - Now imports from [imageMap.js](src/utils/imageMap.js) and uses local paths like `/images/headphones-1.jpg`

✅ **[imageMap.js](src/utils/imageMap.js)** - Created image mapping file for easy management

✅ **[public/images/](public/images/)** - New folder for storing all product images

## Verification

Once images are downloaded, your site will:

- Load images faster (local vs. external)
- Work offline
- Have better SEO
- Reduce external dependencies

## Troubleshooting

If images don't show:

1. Check that files exist in `public/images/`
2. Open browser DevTools → Network tab
3. Look for failed image requests
4. Ensure image names match exactly in `imageMap.js`

**Done!** 🎉 Your Velora store now uses local images.
