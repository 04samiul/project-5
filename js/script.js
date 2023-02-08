const fileInput = document.getElementById("fileInput"),
    btn = document.querySelectorAll(".left button"),
    textName = document.querySelector(".text .name"),
    textAmount = document.querySelector(".text .amount"),
    sliderInput = document.querySelector(".value input"),
    rotateBtn = document.querySelectorAll(".buttons button"),
    beforePreviewImg = document.getElementById("beforePreview"),
    afterPreviewImg = document.getElementById("afterPreviewImg"),
    reset = document.getElementById("reset"),
    save = document.getElementById("save"),
    chooseImg = document.getElementById("choose");
    
let brightness = "100", saturation = "100", contrast = "100", sepia = "0", grayscale = "0";
let rotate = 0;
const applyFilter = () => {
    afterPreviewImg.style.transform = `rotate(${rotate}deg)`;
    afterPreviewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) sepia(${sepia}%) grayscale(${grayscale}%)`;
}
const loadImg = () => {
    let file = fileInput.files[0]; //user selected file 
    if (!file) return;
    afterPreviewImg.src = URL.createObjectURL(file);
    beforePreviewImg.src = URL.createObjectURL(file);
    afterPreviewImg.addEventListener("load", () => {
        reset.click();
        document.getElementById("body").classList.remove("disable")
       
    })
}
btn.forEach(buttons => {
    buttons.addEventListener("click", () => {
        document.querySelector(".left .activeBtn").classList.remove("activeBtn");
        buttons.classList.add("activeBtn");
        textName.innerText = buttons.innerText;

        if (buttons.id === "brightness") {
            sliderInput.max = "200";
            sliderInput.value = brightness;
            textAmount.innerText = `${brightness}%`;
        }
        else if (buttons.id === "saturation") {
            sliderInput.max = "200";
            sliderInput.value = saturation;
            textAmount.innerText = `${saturation}%`;
        }
        else if (buttons.id === "contrast") {
            sliderInput.max = "200";
            sliderInput.value = contrast;
            textAmount.innerText = `${contrast}%`;
        }
        else if (buttons.id === "sepia") {
            sliderInput.max = "100";
            sliderInput.value = sepia;
            textAmount.innerText = `${sepia}%`;
        }
        else {
            sliderInput.max = "100";
            sliderInput.value = grayscale;
            textAmount.innerText = `${grayscale}%`;

        }
    });
});
const updateFilter = () => {
    textAmount.innerText = `${sliderInput.value}%`;
    const filter = document.querySelector(".left .activeBtn");

    if (filter.id === "brightness") {
        brightness = sliderInput.value;
    } else if (filter.id == "saturation") {
        saturation = sliderInput.value;
    }
    else if (filter.id === "contrast") {
        contrast = sliderInput.value;
    }
    else if (filter.id === "sepia") {
        sepia = sliderInput.value;
    }
    else {
        grayscale = sliderInput.value;
    }
    applyFilter();
}
rotateBtn.forEach(buttons => {
    buttons.addEventListener("click", () => {
        if (buttons.id === "left") {
            rotate -= 90;
        } else if (buttons.id === "right") {
            rotate += 90;
        }
        applyFilter();
    });
});
const resetFilter = () => {
    
    brightness = "100"; saturation = "100"; contrast = "100"; sepia = "0"; grayscale = "0";
    rotate = 0;
    btn[0].click();
    applyFilter();
    
 
}
const saveImg = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = afterPreviewImg.naturalWidth;
    canvas.height = afterPreviewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) sepia(${sepia}%) grayscale(${grayscale}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(afterPreviewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    document.body.appendChild(canvas);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}
sliderInput.addEventListener("input", updateFilter);
reset.addEventListener("click", resetFilter);
save.addEventListener("click", saveImg);
fileInput.addEventListener("change", loadImg);
// Input to Button redirect
chooseImg.addEventListener("click", () => fileInput.click());
