function Calculate(form) {
    variable1 = Number(form.firstVariable.value)
    variable2 = Number(form.secondVariable.value)

    switch (form.operator.value) {
        case "+": form.answer.value = variable1 + variable2; break;
        case "-": form.answer.value = variable1 - variable2; break;
        case "*": form.answer.value = variable1 * variable2; break;
        case "/": form.answer.value = variable1 / variable2; break;
    }
}