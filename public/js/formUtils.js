import { periods } from "./TimeReference.js";

const target = document.getElementById("target");

function createFormItem(id, labelText, inputType = "number", step = 0.01) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("item");
    wrapper.classList.add("input-group");

    const label = document.createElement("label");
    label.classList.add("input-group-text");
    label.htmlFor = id;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.classList.add("form-control");
    input.type = inputType;
    input.step = step;
    input.id = id;
    input.name = id;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
}

function createFormItemWithSubselect(
    id,
    labelText,
    freqsArray,
    inputType = "number",
    step = 0.01
) {
    const wrapper = createFormItem(id, labelText, inputType, step);

    const select = document.createElement("select");
    select.name = `${id}Freq`;
    select.classList.add("form-select");

    for (const [name, format] of freqsArray) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = format;
        select.appendChild(option);
    }

    wrapper.appendChild(select);

    return wrapper;
}

const timeReference = periods.map((element) => {
    return [element, element.charAt(0)];
});

const rateReference = periods.map((element) => {
    return [element, `%a${element.charAt(0)}`];
});

const formInputs = {
    capital: createFormItem("capital", "Capital:"),
    montante: createFormItem("montante", "Montante:"),
    juros: createFormItem("juros", "Juros:"),
    taxa: createFormItemWithSubselect("taxa", "Taxa:", rateReference),
    tempo: createFormItemWithSubselect("tempo", "Tempo:", timeReference),
};

// Adding objects with website loading

document.addEventListener("DOMContentLoaded", () => {
    const inputEntry = document.getElementById("input-entry");
    const targetValue = document.getElementById("target").value;

    for (let [key, value] of Object.entries(formInputs)) {
        if (key != targetValue) {
            inputEntry.appendChild(value);
        }
    }
});

// Adding objects with reference changing

target.addEventListener("change", (event) => {
    const inputEntry = document.getElementById("input-entry");
    const targetValue = event.target.value;

    inputEntry.replaceChildren();

    for (let [key, value] of Object.entries(formInputs)) {
        if (key != targetValue) {
            inputEntry.appendChild(value);
        }
    }
});