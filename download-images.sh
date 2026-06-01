#!/bin/bash
# This script downloads all product images for the Velora e-commerce project

echo "Downloading product images..."

# Create images directory if it doesn't exist
mkdir -p public/images

# Array of unique image URLs and their local names
declare -A images=(
    ["public/images/headphones-1.jpg"]="https://images.unsplash.com/photo-1487215078519-e21cc028cb29"
    ["public/images/watch-rolex.jpg"]="https://lh3.googleusercontent.com/aida-public/AB6AXuClMg0N8hBJIfYaz7qh69iQtTyz5ihiiIjLcknKFYjObY-d4AenMA7rXjpA3gvpfMFmMYPb7B0_1EwHCzIPMaVe9_0wToaSS0RRWGbMeDCBN2bkNqiIw63fy1TWn2j1No-cPxPmJZP3c2DYcrVjWKvHdSHlgYd71XMU7lE_YCGLOIdrklex_3iXrCs1SZ3ftmTKK59n9NyP4MKNL2XVCP1Y_TWxhUrBgdkUXrEO_KL2xYcGJvu3aBjTT7BP2IDOE2j0lg6uaaFTr8Q"
    ["public/images/shoes-nike.jpg"]="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    ["public/images/watch-casio.jpg"]="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    ["public/images/phone-iphone.jpg"]="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ["public/images/headphones-sony.jpg"]="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    ["public/images/shoes-adidas.jpg"]="https://images.unsplash.com/photo-1491553895911-0055eca6402d"
    ["public/images/phone-samsung.jpg"]="https://images.unsplash.com/photo-1484704849700-f032a568e944"
    ["public/images/headphones-bose.jpg"]="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
    ["public/images/headphones-classic.jpg"]="https://lh3.googleusercontent.com/aida-public/AB6AXuDp0R08gCPSKSBaH7q3p5fQLwJ88blfZvqQHdboWJhHRwsSiRlYbNRUFBrKKuGW_BVyScD8SUkaii-ViiiY93qhVR-dG86DU8K3HubekbAzvgM8UUwoNeiaTaT5uq0XU6ZBfgsVDz27JEGTNZn9w7yz8M9lWHGvclag1lTv8B00KWuGvchJ0f4ukqwYTZFUPIGIjub5DOeSqk5mtZ5ZuOJefFAt2NlKH6PU3LrwSELMDcZWaMxtQiwwvUtSdOpWujtrd-RHClCwf6Y"
    ["public/images/shoes-samba.jpg"]="https://media.istockphoto.com/photos/image-of-black-leather-classic-shoes-picture-id1409339182?k=20&m=1409339182&s=612x612&w=0&h=9Ax5AQJR2f3eNuiZbOmXFguI_SJV7qDLWjGznQTO2MM="
    ["public/images/watch-seiko.jpg"]="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    ["public/images/watch-garmin.jpg"]="https://images.unsplash.com/photo-1519046904884-53103b34b206"
    ["public/images/headphones-sennheiser.jpg"]="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
    ["public/images/shoes-nb.jpg"]="https://images.unsplash.com/photo-1491553895911-0055eca6402d"
    ["public/images/phone-oneplus.jpg"]="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ["public/images/phone-pixel.jpg"]="https://images.unsplash.com/photo-1487215078519-e21cc028cb29"
    ["public/images/speaker-jbl.jpg"]="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    ["public/images/shoes-puma.jpg"]="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    ["public/images/mic-audio.jpg"]="https://images.unsplash.com/photo-1484704849700-f032a568e944"
)

# Download each image
for filepath in "${!images[@]}"; do
    url="${images[$filepath]}"
    if [ ! -f "$filepath" ]; then
        echo "Downloading: $filepath"
        curl -L -o "$filepath" "$url" --silent
    else
        echo "Already exists: $filepath"
    fi
done

echo "✓ Image download complete!"
