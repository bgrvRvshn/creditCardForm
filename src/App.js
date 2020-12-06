import React, {useState, useEffect, useRef} from 'react';
import InputMask from 'react-input-mask';
import './App.css';

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

    const outputCardNumber = useRef('#### #### #### ####');
    const outputCardHolder = useRef('#### ####');
    const outputCardMonth = useRef('MM');
    const outputCardYear = useRef('YY');

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
    }, [cardNumberError, cardHolderError, cardMonthError, cardYearError, cardCVVError])

    const numberHandler = (e) => {
        const cardNumberTrim = e.target.value.replace(/[^0-9]/g, '');

        const regex = /(?!(?<=[A-Z]))[^A-Z](?=[^A-Z\n]{4,})/gmi;
        const subst = `*`;
        const result = cardNumberTrim.replace(regex, subst);

        setCardNumber(e.target.value);
        outputCardNumber.current = result;

        const visaRegExp = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const MCRegExp = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

        if (visaRegExp.test(cardNumberTrim)) {
            setCardNumberError(false);
            setCardNumberDirty(false);
            setCardType('visa.png');
        } else if (MCRegExp.test(cardNumberTrim)) {
            setCardNumberError(false);
            setCardNumberDirty(false);
            setCardType('mc.png');
        } else {
            setCardNumberError(true);
        }
    }

    const holderHandler = (e) => {
        setCardHolder(e.target.value);
        outputCardHolder.current = e.target.value;

        const regExp = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
        if (!regExp.test(e.target.value)) {
            setCardHolderError(true);
        } else {
            setCardHolderError(false);
            setCardHolderDirty(false);
        }
    }

    const monthHandler = (e) => {
        setCardMonth(e.target.value);
        outputCardMonth.current = e.target.value;

        if (e.target.value !== '') {
            setCardMonthError(false);
            setCardMonthDirty(false);
        } else {
            setCardMonthError(true);
        }
    }

    const yearHandler = (e) => {
        setCardYear(e.target.value);
        outputCardYear.current = e.target.value;

        if (e.target.value !== '') {
            setCardYearError(false);
            setCardYearDirty(false);
        } else {
            setCardYearError(true);
        }
    }

    const cvvHandler = (e) => {
        setCardCVV(e.target.value);
        const regExp = /^[0-9]{3,4}$/;
        if (!regExp.test(e.target.value)) {
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
            const answer = await response.json();
            console.log(answer);
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
                            {outputCardNumber.current}
                        </div>
                    </div>
                    <div className="__row data">
                        <div className="name">
                            <div className="title">Card Holder</div>
                            <div className="value">
                                {outputCardHolder.current}
                            </div>
                        </div>
                        <div className="date">
                            <div className="title">Expires</div>
                            <div className="value">
                                {outputCardMonth.current}
                                /
                                {outputCardYear.current}
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
                                    <option hidden value=''>Month</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select className={(cardYearDirty || cardYearError) ? 'error' : null}
                                        name="year"
                                        onChange={e => yearHandler(e)}
                                        onClick={e => yearHandler(e)}
                                        value={cardYear}
                                        required>
                                    <option hidden value=''>Year</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
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
