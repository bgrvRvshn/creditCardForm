import React from 'react';

export const MonthOptions = ({months}) => {
    const arrMonths = [];

    for (let month = 1; month <= months; month++) {
        if (month < 10) month = '0' + month;
        arrMonths.push(month.toString());
    }

    return (
        arrMonths.map((month) =>
            <option key={month.toString()} value={month}>{month}</option>
        )
    )
}