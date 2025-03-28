// JavaScript for Admin Page (file-1.js)
function updatePrice(itemId) {
    const inputField = document.getElementById(`price-${itemId}`);
    const newPrice = inputField.value;

    if (newPrice) {
        // Store the updated price in localStorage
        const prices = JSON.parse(localStorage.getItem("prices")) || {};
        prices[`item-${itemId}`] = `$${newPrice}`;
        localStorage.setItem("prices", JSON.stringify(prices));

        alert(`Price for Item ${itemId} updated to $${newPrice}`);
        inputField.value = ""; // Clear the input field
    } else {
        alert("Please enter a valid price.");
    }
}
