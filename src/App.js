import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import './App.css';
import {
    CARD_CVV_REGEXP,
    CARD_HOLDER_REGEXP,
    CARD_MASTERCARD_PAYMENT_REGEXP, CARD_NUMBER_REPLACE_REGEXP,
    CARD_VISA_PAYMENT_REGEXP
} from "./Constants";
import {YearOptions} from "./components/YearOptions";
import {MonthOptions} from "./components/MonthOptions";

function App() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');

    const [cardNumberDirty, setCardNumberDirty] = useState(false);
    const [cardHolderDirty, setCardHolderDirty] = useState(false);
    const [cardCVVDirty, setCardCVVDirty] = useState(false);
    const [cardMonthDirty, setCardMonthDirty] = useState(false);
    const [cardYearDirty, setCardYearDirty] = useState(false);

    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardHolderError, setCardHolderError] = useState(false);
    const [cardCVVError, setCardCVVError] = useState(false);
    const [cardMonthError, setCardMonthError] = useState(false);
    const [cardYearError, setCardYearError] = useState(false);

    const [formValid, setFormValid] = useState(false);
    const [cardType, setCardType] = useState('pay.png');
    const [codeForm, setCodeForm] = useState(true);
    const [codeValue, setCodeValue] = useState('');
    const [codeDirty, setCodeDirty] = useState(false);

    const [outputCardNumber, setOutputCardNumber] = useState('#### #### #### ####');
    const [outputCardHolder, setOutputCardHolder] = useState('#### ####');
    const [outputCardMonth, setOutputCardMonth] = useState('MM');
    const [outputCardYear, setOutputCardYear] = useState('YY');

    useEffect(() => {
        if (cardNumberError
            || cardHolderError
            || cardMonthError
            || cardYearError
            || cardCVVError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [cardNumberError, cardHolderError, cardMonthError, cardYearError, cardCVVError]);

    const numberHandler = (e) => {
        const cardNumberTrim = e.target.value.replace(/[^0-9]/g, '');
        const subst = `*`;
        const result = cardNumberTrim.replace(CARD_NUMBER_REPLACE_REGEXP, subst);

        setCardNumber(e.target.value);
        setOutputCardNumber(result);

        if (CARD_VISA_PAYMENT_REGEXP.test(cardNumberTrim)) {
            setCardNumberError(false);
            setCardNumberDirty(false);
            setCardType('visa.png');
        } else if (CARD_MASTERCARD_PAYMENT_REGEXP.test(cardNumberTrim)) {
            setCardNumberError(false);
            setCardNumberDirty(false);
            setCardType('mc.png');
        } else {
            setCardNumberError(true);
        }
    }

    const holderHandler = (e) => {
        setCardHolder(e.target.value);
        setOutputCardHolder(e.target.value);

        if (!CARD_HOLDER_REGEXP.test(e.target.value)) {
            setCardHolderError(true);
        } else {
            setCardHolderError(false);
            setCardHolderDirty(false);
        }
    }

    const monthHandler = (e) => {
        setCardMonth(e.target.value);
        setOutputCardMonth(e.target.value);

        if (e.target.value !== '') {
            setCardMonthError(false);
            setCardMonthDirty(false);
        } else {
            setCardMonthError(true);
        }
    }

    const yearHandler = (e) => {
        setCardYear(e.target.value);
        setOutputCardYear(e.target.value);

        if (e.target.value !== '') {
            setCardYearError(false);
            setCardYearDirty(false);
        } else {
            setCardYearError(true);
        }
    }

    const cvvHandler = (e) => {
        setCardCVV(e.target.value);

        if (!CARD_CVV_REGEXP.test(e.target.value)) {
            setCardCVVError(true);
        } else {
            setCardCVVError(false);
            setCardCVVDirty(false);
        }
    }

    const blurHandler = (e) => {
        if (!e.target.value) {
            switch (e.target.name) {
                case 'number':
                    setCardNumberDirty(true);
                    break;
                case "holder":
                    setCardHolderDirty(true);
                    break;
                case 'cvv':
                    setCardCVVDirty(true);
                    break;
                case 'code':
                    setCodeDirty(true);
                    break;
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const url = 'https://jsonplaceholder.typicode.com/posts';

        const response = await fetch(url, {
            method: 'POST',
            body: data,
        });

        if (response.ok) {
            setCodeForm(false);
        } else {
            console.error("Ошибка HTTP: " + response.status);
        }
    }

    const codeHandler = (e) => {
        setCodeValue(e.target.value);
    }

    const submitCodeHandler = (e) => {
        e.preventDefault();
        setCodeForm(true);
    }

    return (
        <div className="container">
            <div className="wrap">
                <div className="card">
                    <div className="__row image">
                        <div className="img-wrap logo">
                            <img className="img" src={cardType}/>
                        </div>
                    </div>
                    <div className="__row code">
                        <div className="number">
                            {outputCardNumber}
                        </div>
                    </div>
                    <div className="__row data">
                        <div className="name">
                            <div className="title">Card Holder</div>
                            <div className="value">
                                {outputCardHolder}
                            </div>
                        </div>
                        <div className="date">
                            <div className="title">Expires</div>
                            <div className="value">
                                {outputCardMonth}
                                /
                                {outputCardYear}
                            </div>
                        </div>
                    </div>
                </div>
                <form className="form"
                      onSubmit={e => submitHandler(e)}>
                    <label className="label">
                        <span className="title">Card Number</span>
                        <InputMask className={(cardNumberDirty || cardNumberError) ? 'error' : null}
                                   mask="9999 9999 9999 9999"
                                   name="number"
                                   type="text"
                                   onChange={e => numberHandler(e)}
                                   onBlur={e => blurHandler(e)}
                                   value={cardNumber}
                                   required/>
                    </label>
                    <label className="label">
                        <span className="title">Card Name</span>
                        <input className={(cardHolderDirty || cardHolderError) ? 'error' : null}
                               type="text"
                               name="holder"
                               value={cardHolder}
                               onChange={e => holderHandler(e)}
                               onBlur={e => blurHandler(e)}
                               required/>
                    </label>
                    <fieldset className="row">
                        <div className="col _select">
                            <span className="title">Expiration Date</span>
                            <div className="select-group">
                                <select className={(cardMonthDirty || cardMonthError) ? 'error' : null}
                                        name="month"
                                        onChange={e => monthHandler(e)}
                                        onClick={e => monthHandler(e)}
                                        value={cardMonth}
                                        required>
                                    <option hidden value='' key={0}>Month</option>
                                    <MonthOptions months={12}/>
                                </select>
                                <select className={(cardYearDirty || cardYearError) ? 'error' : null}
                                        name="year"
                                        onChange={e => yearHandler(e)}
                                        onClick={e => yearHandler(e)}
                                        value={cardYear}
                                        required>
                                    <option hidden value='' key={0}>Year</option>
                                    <YearOptions years={12}/>
                                </select>
                            </div>
                        </div>
                        <label className="col label">
                            <span className="title">CVV</span>
                            <input className={(cardCVVDirty || cardCVVError) ? 'error' : null}
                                   type="text"
                                   name="cvv"
                                   onChange={e => cvvHandler(e)}
                                   onBlur={e => blurHandler(e)}
                                   value={cardCVV}
                                   required/>
                        </label>
                    </fieldset>
                    <input className="submit"
                           type="submit"
                           value="Submit"
                           disabled={!formValid}/>
                </form>
            </div>
            <div className="code-wrap" hidden={codeForm}>
                <form className="code" onSubmit={e => submitCodeHandler(e)}>
                    <label className="label">
                        <span className="title">Code</span>
                        <input className={codeDirty ? 'error' : null}
                               name="code"
                               type="text"
                               onChange={e => codeHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={codeValue}
                               required/>
                    </label>
                    <input className="submit"
                           type="submit"
                           value="Submit"/>
                </form>
            </div>
        </div>
    );
}

export default App;