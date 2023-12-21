"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
    const clearBtn = document.getElementById("clearBtn");
    const equalsBtn = document.getElementById("equalsBtn");
    display.value = "0";
    let lastButton = "";
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
            if (buttonText === "=") {
                try {
                    let expression = display.value;
                    if (expression.includes("/ /")) {
                        display.value = "Error";
                        return;
                    }
                    const result = eval(expression);
                    if (isNaN(result) || !isFinite(result)) {
                        display.value = "Error";
                    }
                    else {
                        display.value = result;
                    }
                }
                catch (error) {
                    display.value = "Error";
                }
            }
            else if (buttonText === "C") {
                display.value = "0";
                lastButton = "";
            }
            else {
                if (lastButton === "/" && buttonText === "/") {
                    display.value = "Error";
                    return;
                }
                if (display.value === "0") {
                    display.value = buttonText;
                }
                else {
                    display.value += buttonText;
                }
                lastButton = buttonText;
            }
        });
    });
});
function calculate(expression) {
    // Split the expression by operators (+, -, *, /)
    const operators = ["+", "-", "*", "/"];
    const parts = expression.split(new RegExp(`\\${operators.join("|\\")}`));
    // Split the expression by numbers
    const numbers = expression.split(new RegExp(`[${operators.join("")}]`));
    // Remove empty strings from the numbers array
    const validNumbers = numbers.filter((num) => num !== "");
    // Perform the calculations
    let result = parseFloat(validNumbers[0]);
    for (let i = 1; i < validNumbers.length; i++) {
        const operator = parts[i];
        const num = parseFloat(validNumbers[i]);
        if (operator === "+") {
            result += num;
        }
        else if (operator === "-") {
            result -= num;
        }
        else if (operator === "*") {
            result *= num;
        }
        else if (operator === "/") {
            if (num === 0) {
                throw new Error("Division by zero");
            }
            result /= num;
        }
    }
    return result;
}
