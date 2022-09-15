"use strict";
const itemsContainer = document.querySelectorAll(".items-container");
let actualContainer, actualBtn, actualUL, actualForm, actualTextInput, actualValidation;
const addContainerListeners = (currentContainer) => {
    const currentContainerDeleteBtn = currentContainer.querySelector(".delete-container-btn");
    const currentAddItemBtn = currentContainer.querySelector('.add-item-btn');
    const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn');
    const currentForm = currentContainer.querySelector("form");
    deleteBtnListeners(currentContainerDeleteBtn);
    addItemBtnListeners(currentAddItemBtn);
    closingFormBtnsListeners(currentCloseFormBtn);
    addFormSubmitListeners(currentForm);
};
// Remove Item
const deleteBtnListeners = (btn) => {
    btn.addEventListener("click", handleContainerDelete);
};
// Add Item
const addItemBtnListeners = (btn) => {
    btn.addEventListener("click", handleAddItem);
};
// Close Form X
const closingFormBtnsListeners = (btn) => {
    btn.addEventListener("click", () => toggleForm(actualBtn, actualForm, false));
};
// submit Form
const addFormSubmitListeners = (form) => {
    form.addEventListener("submit", createNewItem);
};
const handleContainerDelete = (e) => {
    const btn = e.target;
    const btnsArray = [...document.querySelectorAll(".delete-container-btn")];
    const containers = [...document.querySelectorAll(".items-container")];
    containers[btnsArray.indexOf(btn)].remove();
};
const handleAddItem = (e) => {
    const btn = e.target;
    if (actualContainer)
        toggleForm(actualBtn, actualForm, false);
    setContainerItem(btn);
    toggleForm(actualBtn, actualForm, true);
};
const toggleForm = (btn, form, action) => {
    if (!action) {
        form.style.display = "none";
        btn.style.display = "block";
    }
    else if (action) {
        form.style.display = "block";
        btn.style.display = "none";
    }
};
const setContainerItem = (btn) => {
    actualBtn = btn;
    actualContainer = btn.parentElement;
    actualUL = actualContainer.querySelector("ul");
    actualForm = actualContainer.querySelector("form");
    actualTextInput = actualContainer.querySelector("input");
    actualValidation = actualContainer.querySelector(".validation-msg");
};
const createNewItem = (e) => {
    e.preventDefault();
    // Validation
    if (actualTextInput.value.length === 0) {
        actualValidation.textContent = "Must be at leats 1 charactere long";
        return;
    }
    else {
        actualValidation.textContent = "";
    }
    // new Item
    const itemContent = actualTextInput.value;
    const li = `
  <li class="item" draggable="true">
    <p>${itemContent}</p>
    <button>X</button>
  </li>
  `;
    actualUL.insertAdjacentHTML("beforeend", li);
    const item = actualUL.lastElementChild;
    const liBtn = item.querySelector("button");
    handleItemDelete(liBtn);
    actualTextInput.value = "";
};
const handleItemDelete = (btn) => {
    btn.addEventListener("click", () => {
        const elToRemove = btn.parentElement;
        elToRemove.remove();
    });
};
itemsContainer.forEach((container) => addContainerListeners(container));
