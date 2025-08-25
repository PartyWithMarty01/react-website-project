
import React, { useState, useEffect } from 'react';



const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(
        () => { console.log('hello') } ,  // function
        [] // dependencies
    );

    const onCountIncrement = () => {
        setCount(count + 1)
    }

    return <div>
        Count is {count}
        <button onClick={() => onCountIncrement()}>Increment</button>
    </div>
}

const Page = () => {

    return <div>
        <Counter />
    </div>
}

export default Page;