// This function is for testing test case

const calculateTip = (total, tipPercent) => {
    const tip = total * tipPercent;
    return total + tip;
}

const farenhitToCelcius = (temp) => {
    return (temp - 32) / 1.8
}

const celciusToFarenhit = (temp) => {
    return (temp * 1.8) + 32
}

module.exports = {
    calculateTip,
    farenhitToCelcius,
    celciusToFarenhit
}