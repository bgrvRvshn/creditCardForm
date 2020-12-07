import React from 'react';

export const YearSelect = (years) => {
    let currentYear = new Date().getFullYear() % 100;

    const listItems = years => {
        for (currentYear; currentYear < currentYear + years; currentYear++) {
            return (
                <option value={currentYear} key={currentYear.toString()}>
                    {currentYear}
                </option>
            );
        }
    }

    return (
        <select className={(cardYearDirty || cardYearError) ? 'error' : null}
                name="year"
                onChange={e => yearHandler(e)}
                onClick={e => yearHandler(e)}
                value={cardYear}
                required>
            <option hidden value=''>Year</option>
            {
                listItems
            }
        </select>
    )
}