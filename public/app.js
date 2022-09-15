"use strict";
const itemsContainers = document.querySelectorAll(".items-container");
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
itemsContainers.forEach((container) => addContainerListeners(container));
// Add new container
const addContainerBtn = document.querySelector(".add-container-btn");
const addContainerForm = document.querySelector(".add-new-container form");
const addContainerFormInput = document.querySelector(".add-new-container input");
const validationNewContainer = document.querySelector(".add-new-container .validation-msg");
const addContainerCloseBtn = document.querySelector(".close-add-list");
const addNewContainer = document.querySelector(".add-new-container");
const containersList = document.querySelector(".main-content");
addContainerBtn.addEventListener("click", () => toggleForm(addContainerBtn, addContainerForm, true));
addContainerCloseBtn.addEventListener("click", () => toggleForm(addContainerBtn, addContainerForm, false));
addContainerForm.addEventListener("submit", (e) => createNewContainer(e));
const createNewContainer = (e) => {
    e.preventDefault();
    if (addContainerFormInput.value.length === 0) {
        validationNewContainer.textContent = "Must be at leats 1 charactere long";
        return;
    }
    else {
        validationNewContainer.textContent = "";
    }
    const itemsContainer = document.querySelector(".items-container");
    const newContainer = itemsContainer.cloneNode();
    const newContainerContent = `
    <div class="top-container">
      <h2>${addContainerFormInput.value}</h2>
      <button class="delete-container-btn">X</button>
    </div>
    <ul></ul>
    <button class="add-item-btn">Add an item</button>
    <form autocomplete="off">
      <div class="top-form-container">
        <label for="item">Add a new item</label>
        <button type="button" class="close-form-btn">X</button>
      </div>
      <input type="text" id="item" />
      <span class="validation-msg"></span>
      <button type="submit">Submit</button>
    </form>
  `;
    newContainer.innerHTML = newContainerContent;
    containersList.insertBefore(newContainer, addNewContainer);
    addContainerFormInput.value = "";
    addContainerListeners(newContainer);
};
