let cardImage = document.querySelector('.card-img');
let cardNumber = document.querySelector('.card-number');
let cardHolder = document.querySelector('.card-holder');
let cardExpiryDate = document.querySelector('.card-expiry-date');
let cardCvv = document.querySelector('.card-cvv');
let payButton = document.querySelector('.pay-button');

isEmpty = (field) => {
    try {
        if (field.value == "") {
            return true;
        } return false;

    } catch (err) {
        console.log("An error has occured");
    }
}

isNumberValid = (field) => {
    const re = /\d{4}-\d{4}-\d{4}-\d{4}/;
    if (!field.value.match(re) || isEmpty(field)) {
        return false;
    } return true;
}

isExpiryDateValid = (field) => {
    if (!isEmpty(field)) {
        const date = Number(field.value.split("/")[0]);
        return date > 31 ? false : true;
    } return false;
}

isCvvValid = (field) => {
    if (!isEmpty(field)) {
        const re = /\d{3}/;
        return field.value.match(re);
    } return false;
}

cardNumber.addEventListener('input', () => { // Automatically put dashes between card numbers
    switch(cardNumber.value[0]) {            // and change the card image accordingly
        case '2':
        case '5':
            cardImage.src = "card_Mastercard.png";
            break;
        case '4':
            cardImage.src = "card_Visa.png";
            break;
        case '3':
            cardImage.src = "card_AmericanExpress.png";
            break;
        default:
            cardImage.src = "card_Default.png";
            break;
    }

    try {
        let cardNumber_dashed = cardNumber.value.split("-").join("").match(/.{1,4}/g).join("-");
        cardNumber.value = cardNumber_dashed;
    } catch (err) {
        console.log("An error has occured");
    }
});

cardExpiryDate.addEventListener('input', () => { // Automatically put a backslash between expiry date numbers
    try {
        let cardExpiryDate_dashed = cardExpiryDate.value.split("/").join("").match(/.{1,2}/g).join("/");
        cardExpiryDate.value = cardExpiryDate_dashed;
    } catch (err) {
        console.log("An error has occured");
    }
});

payButton.addEventListener('click', () => {
    if (isNumberValid(cardNumber) && isExpiryDateValid(cardExpiryDate) && isCvvValid(cardCvv)) {
        alert(
            `${cardHolder.value} has successfully completed a transaction with XXXX-XXXX-XXXX-${cardNumber.value.slice(15, 21)}!`
        );
    } else {
        alert("An error has occurred, please try again!");
    } 
});