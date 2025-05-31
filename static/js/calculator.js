// Kalkulyator funksiyalari

function appendNumber(number) {
    const input = document.getElementById("calc-display");
    input.value += number;
}

function clearDisplay() {
    document.getElementById("calc-display").value = "";
}

function calculate() {
    const input = document.getElementById("calc-display");
    try {
        // xavfsiz hisoblash uchun eval o'rniga Function constructor ishlatilmoqda
        const result = Function('"use strict";return (' + input.value + ')')();
        input.value = result;
    } catch (error) {
        input.value = "Xatolik";
    }
}
