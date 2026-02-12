const asciiChars = "@%#*+=-:. ";
const fileInput = document.getElementById("fileInput");
const asciiEl = document.getElementById("ascii");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const width = 100;
            const height = img.height * (width / img.width);
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height).data;
            let ascii = "";
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const r = imageData[i];
                    const g = imageData[i+1];
                    const b = imageData[i+2];
                    const brightness = (r+g+b)/3;
                    const charIdx = Math.floor(brightness / 255 * (asciiChars.length - 1));
                    ascii += asciiChars[charIdx];
                }
                ascii += "\n";
            }
            asciiEl.textContent = ascii;
        }
    }
    reader.readAsDataURL(file);
});
