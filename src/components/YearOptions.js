import React from 'react';

export const YearOptions = ({years}) => {
    let currentYear = new Date().getFullYear() % 100;
    const arrYears = [];
    const maxBoundYear = currentYear + years;

    for (currentYear; currentYear < maxBoundYear; currentYear++) {
        arrYears.push(currentYear);
    }

    return (
        arrYears.map((year) =>
            <option key={year.toString()} value={year}>{year}</option>
        )
    )
}