const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculatorKeys')
const display = document.querySelector('.calculatorDisplay')

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)

    if (operator === 'add') return firstNum + secondNum
    else if (operator === 'subtract') return firstNum - secondNum
    else if (operator === 'multiply') return firstNum * secondNum
    else if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = (key) => {
    const { action } = key.dataset
    if(!action) return 'number'
    if(
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator'
    return action
}

const createResultString = (key, displayedNumber, calcState) => {
    const keyContent = key.textContent
    const keyType = getKeyType(key)
    const firstValue = calcState.firstValue
    const modValue = calcState.modValue
    const operator = calcState.operator
    const previousKeyType = calcState.previousKeyType

    if(keyType === 'number'){
        return (
            displayedNumber === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        )
        ? keyContent
        : displayedNumber + keyContent
    }
    
    if(keyType === 'decimal'){
        if (!displayedNumber.includes('.')) return displayedNumber + '.'
        else if(previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
        return displayedNumber
    }

    if(keyType === 'operator'){
        return (
            firstValue && 
            operator && 
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) 
        ? calculate(firstValue, operator, displayedNumber)
        : displayedNumber
    }

    if(keyType === 'clear') return 0

    if(keyType === 'calculate'){
        return firstValue
        ? (
            previousKeyType === 'calculate'
            ? calculate(displayedNumber, operator, modValue)
            : calculate(firstValue, operator, displayedNumber)
        )
        : displayedNumber
    }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNumber) => {
    const keyType = getKeyType(key)
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const previousKeyType = calculator.dataset.previousKeyType
    calculator.dataset.previousKeyType = keyType

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    if(keyType === 'operator'){
        key.classList.add('is-depressed')
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) ? calculatedValue
        : displayedNumber
    }

    if(keyType === 'clear'){
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
    }

    if (keyType !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }

    if(keyType === 'calculate'){
        calculator.dataset.modValue = (firstValue && previousKeyType === 'calculate')
        ? calculator.dataset.modValue
        : displayedNumber
    }
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target
        const displayedNum = display.textContent
        const resultString = createResultString(key, displayedNum, calculator.dataset)
        
        display.textContent = resultString
        
        updateCalculatorState(key, calculator, resultString, displayedNum)
    }
})
