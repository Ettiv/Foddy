  
import React from 'react';

import './customSelect.css';

function CustomSelect(props) {
    const { name, options, value, onChange, ...rest } = props;
    return (
        <div>
            <select id={name} name={name} onChange={onChange} {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default CustomSelect;