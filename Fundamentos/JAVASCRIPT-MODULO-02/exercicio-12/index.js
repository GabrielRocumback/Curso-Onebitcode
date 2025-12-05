let uniqueId
let uniqueIdRow = 0
const devs = []

const buttonAdd = document.getElementById("buttonAdd")
const form = document.getElementById("devForm")

form.addEventListener("submit", function (ev) {
    let technology = []
    const nameDev = document.getElementById('name')
    const rows = document.querySelectorAll(".list-item")

    if (rows.length === 0) {
        ev.preventDefault()
        alert("Cadastre pelo menos uma tecnoligia")
    } else {
        ev.preventDefault()
        rows.forEach(row => {
            const techName = row.querySelector("#" + row.id + " input[name='inputTech']").value
            const radioSelected = row.querySelector('#' + row.id + " input[type='radio']:checked").value
            technology.push({ nameTechnology: techName, experienceTime: radioSelected })
        })

        devs.push({ nameDev: nameDev.value, technologies: technology })

        nameDev.value = ''
        rows.forEach(function (row) {
            row.remove()
        })

        console.log(devs)
        alert('Dev cadastrado com sucesso!')
    }
})

buttonAdd.addEventListener("click", function (ev) {
    const ul = document.getElementById("list")
    const newLi = document.createElement("li")
    const rowIndex = uniqueIdRow
    uniqueIdRow++
    newLi.className = "list-item"
    newLi.id = "inputRow-" + rowIndex

    const TechLabel = document.createElement("label")
    TechLabel.htmlFor = "inputTech-" + rowIndex
    TechLabel.innerText = "Nome da Técnologia:"

    const TechInput = document.createElement("input")
    TechInput.type = "text"
    TechInput.name = "inputTech"
    TechInput.id = "inputTech-" + rowIndex
    TechInput.required = true

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = "Tempo de Experiência:";
    fieldset.appendChild(legend);

    const experiences = [
        { label: "0-2 anos", value: "0-2" },
        { label: "3-4 anos", value: "3-4" },
        { label: "5+ anos", value: "5+" }
    ]
    const uniqueName = "radio-" + rowIndex
    let radios = []
    let radioLabels = []
    experiences.forEach(exp => {
        uniqueId = "radio-" + rowIndex + "." + Math.random().toString(8).substring(2, 5)
        const radioInput = document.createElement("input")
        radioInput.type = "radio"
        radioInput.name = uniqueName
        radioInput.id = uniqueId
        radioInput.value = exp.value
        radioInput.required = true
        fieldset.appendChild(radioInput)

        const radioLabel = document.createElement("label")
        radioLabel.innerText = exp.label
        radioLabel.htmlFor = uniqueId
        fieldset.appendChild(radioLabel)
        radios.push(radioInput)
        radioLabels.push(radioLabel)
    })

    const buttonRemove = document.createElement("button")
    buttonRemove.type = "button"
    buttonRemove.innerText = "Remover"
    buttonRemove.id = "buttonRemove-" + rowIndex

    buttonRemove.addEventListener("click", function () {
        ul.removeChild(newLi);
    });

    newLi.append(TechLabel, TechInput)
    for (i = 0; i < radios.length; i++) {
        newLi.append(radios[i], radioLabels[i])
    }
    newLi.appendChild(buttonRemove)
    // newLi.append(TechLabel, TechInput, fieldset, buttonRemove)
    ul.appendChild(newLi)
})


