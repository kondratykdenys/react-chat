import { useState } from 'react'

const useInput = (defaultVal, handler = () => {}) => {
  const [value, setValue] = useState(defaultVal)
  const reset = () => setValue('')

  return [
    {
      value,
      onChange: (event) => {
        setValue(event.target.value)
        handler(event.target.value)
      },
    },
    { value, setValue, reset },
  ]
}

export default useInput
