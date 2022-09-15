const itemsContainer = document.querySelectorAll(".items-container") as NodeListOf<HTMLDivElement>

let actualContainer: HTMLDivElement,
  actualBtn: HTMLButtonElement,
  actualUL: HTMLUListElement,
  actualForm: HTMLFormElement,
  actualTextInput: HTMLInputElement,
  actualValidation: HTMLSpanElement;

const addContainerListeners = (currentContainer: HTMLDivElement) => {
  
  const currentContainerDeleteBtn = currentContainer.querySelector(".delete-container-btn") as HTMLButtonElement
  const currentAddItemBtn = currentContainer.querySelector('.add-item-btn') as HTMLButtonElement
  const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn') as HTMLButtonElement
  const currentForm = currentContainer.querySelector("form") as HTMLFormElement

  deleteBtnListeners(currentContainerDeleteBtn)
  addItemBtnListeners(currentAddItemBtn)
  closingFormBtnsListeners(currentCloseFormBtn)
  addFormSubmitListeners(currentForm)
}

// Remove Item
const deleteBtnListeners = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", handleContainerDelete)
}
// Add Item
const addItemBtnListeners = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", handleAddItem)
}
// Close Form X
const closingFormBtnsListeners = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => toggleForm(actualBtn, actualForm, false))
}
// submit Form
const addFormSubmitListeners = (form: HTMLFormElement) => {
  form.addEventListener("submit" createNewItem)
}


const handleContainerDelete = (e: Event) => {
  const btn = e.target as HTMLButtonElement
  const btnsArray = [...document.querySelectorAll(".delete-container-btn")] as HTMLButtonElement[]
  const containers = [...document.querySelectorAll(".items-container")] as HTMLDivElement[]
  containers[btnsArray.indexOf(btn)].remove() 
}

const handleAddItem = (e: Event) => {
  const btn = e.target as HTMLButtonElement
  if(actualContainer) toggleForm(actualBtn, actualForm, false )
  setContainerItem(btn)
  toggleForm(actualBtn, actualForm, true)
}


const toggleForm = (btn:HTMLButtonElement, form:HTMLFormElement, action:Boolean ) => {
  if (!action) {
    form.style.display = "none"
    btn.style.display = "block"
  } else if (action) {
    form.style.display = "block"
    btn.style.display = "none"
  }
}

const setContainerItem = (btn: HTMLButtonElement) => {
  actualBtn = btn
  actualContainer = btn.parentElement as HTMLDivElement
  actualUL = actualContainer.querySelector("ul") as HTMLUListElement
  actualForm = actualContainer.querySelector("form") as HTMLFormElement
  actualTextInput = actualContainer.querySelector("input") as HTMLInputElement
  actualValidation = actualContainer.querySelector(".validation-msg") as HTMLSpanElement
}

const createNewItem = (e: Event) => {
  e.preventDefault()
  // Validation
  if (actualTextInput.value.length === 0) {
    actualValidation.textContent = "Must be at leats 1 charactere long"
    return;
  } else {
    actualValidation.textContent = ""
  }
  // new Item
  const itemContent = actualTextInput.value
  const li = `
  <li class="item" draggable="true">
    <p>${itemContent}</p>
    <button>X</button>
  </li>
  `
  actualUL.insertAdjacentHTML("beforeend", li)
  
  const item = actualUL.lastElementChild as HTMLLIElement
  const liBtn = item.querySelector("button") as HTMLButtonElement
  handleItemDelete(liBtn);
  actualTextInput.value = ""
}

const handleItemDelete = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => {
    const elToRemove = btn.parentElement as HTMLLIElement
    elToRemove.remove()

  })
}

itemsContainer.forEach((container:HTMLDivElement) => addContainerListeners(container))

