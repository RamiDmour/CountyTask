import { useState } from 'react'

const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue || '');

    function onChange(data) {
        setValue(data.target.value);
    }

    function clearInput() {
        setValue('')
    }

    return {
        bind: { value, onChange },
        value,
        clearInput
    }
}

export default useInput;