const services = [
    {
        id: "basic",
        name: "Basic Cleaning",
        category: "Pembersihan",
        description: "Pembersihan untuk sehari-hari",
        price: 30000,
        icon: "👟"
    },
    {
        id: "deep",
        name: "Deep Cleaning",
        category: "Pembersihan",
        description: "Pembersihan lebih mendalam",
        price: 50000,
        icon: "🥽"
    },
    {
        id: "whitening",
        name: "Whitening Care",
        category: "Perawatan",
        description: "Perawatan pemutihan sepatu",
        price: 65000,
        icon: "🦴"
    }
];

const serviceList = document.querySelector("#serviceList");
const searchInput = document.querySelector("#searchInput");
const serviceFilter = document.querySelector("#serviceFilter");
const serviceType = document.querySelector("#serviceType");
const shoeQuantity = document.querySelector("#shoeQuantity");
const totalPrice = document.querySelector("#totalPrice");
const bookingForm = document.querySelector("#bookingForm");
const bookingResult = document.querySelector("#bookingResult");


function rupiah(value) {
    return "Rp" + value.toLocaleString("id-ID")
}

function renderServices() {
    const keyword = searchInput.value.toLowerCase();
    const category = serviceFilter.value;
    const filtered = services.filter(function(service){
        return service.name.toLowerCase().includes(keyword) && 
        (category === "Semua" || service.category === category);
    })

    serviceList.innerHTML = filtered.map(function(service) {
        return `<article class = "service-card">
            <div class="service-icon">${service.icon}</div>
            <h3> ${service.name} </h3>
            <p> ${service.description}</p>
            <div class="price"> ${rupiah(service.price)}</div>
            <button type="button" data-id="${service.id}">Pilih Layanan</button>
        </article>`;
    }).join("");

    if(!filtered.length) serviceList.innerHTML = "<p> Layanan tidak ditemukan </p>";
}

function updateTotal() {
    const service = services.find(item => item.id === serviceType.value);
    const quantity = Number(shoeQuantity.value);
    totalPrice.textContent = service && quantity > 0 && quantity <= 10
    ? rupiah(service.price * quantity) : "Rp0";
}

services.forEach(function(service) {
    serviceType.innerHTML += `<option value="${service.id}">${service.name}</option>`;
});

serviceList.addEventListener("click", function(event) {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    serviceType.value = button.dataset.id;
    updateTotal();
    document.querySelector("#booking").scrollIntoView({behavior: "smooth"});
});

searchInput.addEventListener("input", renderServices);
serviceFilter.addEventListener("change", renderServices);
serviceType.addEventListener("change", updateTotal);
shoeQuantity.addEventListener("input", updateTotal);

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const service = services.find(item => item.id === serviceType.value);
    const quantity = Number(shoeQuantity.value);
    const name = document.querySelector("#customerName").value.trim();
    if(name.length < 2 || !service || quantity < 1 || quantity > 10) {
        alert("Mohon lengkapi data dengan benar");
        return;
    }

    bookingResult.textContent = `Terima kasih ${name}, Anda telah memesan layanan ${service.name} 
    untuk ${quantity} pasang sepatu. Total biaya adalah ${rupiah(service.price * quantity)}.`;
    bookingResult.hidden = false;

});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
renderServices();
updateTotal();