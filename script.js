const rechargePlans = {
    "airtel": [
        { amount: 99, details: "unlimited data, 2 days" },
        { amount: 349, details: "1.5GB/day, 28 days" },
        { amount: 398, details: "2GB/day, 28 days" },
        { amount: 579, details: "1.5GB/day, 56 days" },
        { amount: 1798, details: "3GB/day, 84 days" },
        { amount: 859, details: "Unlimited calls, 2GB/day, 84 days" }
    ],
    "jio": [
        { amount: 189, details: "2GB total, 28 days" },
        { amount: 249, details: "1GB/day, 28 days" },
        { amount: 299, details: "1.5GB/day, 28 days" },
        { amount: 349, details: "2GB/day, 28 days" },
        { amount: 399, details: "2.5GB/day, 30 days" },
        { amount: 449, details: "3GB/day, 28 days" },
        { amount: 579, details: "1.5GB/day, 56 days" },
        { amount: 629, details: "2GB/day, 56 days" },
        { amount: 889, details: "1.5GB/day, 84 days" },
        { amount: 859, details: "2GB/day, 84 days" },
        { amount: 1199, details: "3GB/day, 84 days" },
    ],
    "vi": [
        { amount: 99, details: "200MB, 15 days" },
        { amount: 349, details: "1.5GB/day, 28 days" },
        { amount: 299, details: "Unlimited calls, 1GB/day, 28 days" },
        { amount: 365, details: "2GB/day, 28 days" },
        { amount: 649, details: "2GB/day, 56 days" },
        { amount: 699, details: "3GB/day, 84 days" }
    ],
};

// Load recharge plans when an operator is selected
function loadPlans() {
    let operator = document.getElementById("operator").value;
    let plansDropdown = document.getElementById("rechargePlans");
    plansDropdown.innerHTML = '<option value="" disabled selected>Select a plan</option>';

    if (rechargePlans[operator]) {
        rechargePlans[operator].forEach(plan => {
            let option = document.createElement("option");
            option.value = plan.amount;
            option.textContent = `₹${plan.amount} - ${plan.details}`;
            plansDropdown.appendChild(option);
        });
    }

    let customOption = document.createElement("option");
    customOption.value = "custom";
    customOption.textContent = "Enter Amount Manually";
    plansDropdown.appendChild(customOption);
}

// Show or hide custom amount input
function checkCustomAmount() {
    let plansDropdown = document.getElementById("rechargePlans");
    let customAmountInput = document.getElementById("customAmount");

    if (plansDropdown.value === "custom") {
        customAmountInput.style.display = "block";
    } else {
        customAmountInput.style.display = "none";
    }
}

// Handle form submission
document.getElementById("rechargeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let selectedPlan = document.getElementById("rechargePlans").value;
    let amount = selectedPlan === "custom"
        ? parseFloat(document.getElementById("customAmount").value)
        : parseFloat(selectedPlan);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid recharge amount.");
        return;
    }

    let commission = amount * 0.025;
    let totalPayment = amount - commission;

    document.getElementById("commissionOutput").innerHTML = `
        <strong>Recharge Amount:</strong> ₹${amount.toFixed(2)} <br>
        <strong>Commission Earned:</strong> ₹${commission.toFixed(2)} <br>
        <strong>Final Payment:</strong> ₹${totalPayment.toFixed(2)}
    `;
});

// Redirect to UPI App
function redirectToGPay() {
    let gpayId = "sujaypramanik282007@okicici";
    let amount = document.getElementById("customAmount").value || "100";
    let upiLink = `upi://pay?pa=${gpayId}&pn=Recharge Payment&am=${amount}&cu=INR`;
    window.location.href = upiLink;
}

// Copy GPay ID
function copyGPayId() {
    navigator.clipboard.writeText(document.getElementById("gpayId").value);
}