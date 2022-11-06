import React, { useState } from 'react'

export default () => {
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    })

      const activityItems = [
        { id: 1, amount: 1, project: 'USDC', commit: '2d89f0c8', environment: 'polygon-nightfall', time: '1h' },
        // More items...
      ]

    const [inputs, setInputs] = useState({
        email: '',
        message: '',
        description: '',
        account: '',
        currency: '',
        account_holder_name: '',
        routing_number: '',
        account_number: ''
    })

    const handleResponse = (status, msg) => {
        if (status === 200) {
            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: msg }
            })
            setInputs({
                email: '',
                message: '',
                description: '',
                account: '',
                amount: '',
                currency: '',
                account_holder_name: '',
                routing_number: '',
                account_number: ''

            })
        } else {
            setStatus({
                info: { error: true, msg: msg }
            })
        }
    }

    const handleOnChange = e => {
        e.persist()
        setInputs(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        })
    }

    const handleOnSubmit = async e => {
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
        const res = await fetch('/api/polygon/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const text = await res.text()
        handleResponse(res.status, text)
    }

    return (
        <main>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label for="account-number" class="block text-base font-medium text-gray-700 float-left">User</label>
                    <div class="mt-2 relative rounded-md shadow-sm">
                        <input type="text" name="account_number" id="account_number" class="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-base border-gray-300 rounded-md" placeholder="" onChange={handleOnChange} value={inputs.user} />
                    </div>
                </div>
                <div>
                    <label for="price" class="block text-base font-medium text-gray-700 float-left">Amount</label>
                    <div class="mt-2 relative rounded-md shadow-sm">
                        <input type="text" name="amount" id="amount" class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-base border-gray-300 rounded-md" placeholder="" aria-describedby="price-currency" onChange={handleOnChange} value={inputs.amount} />
                    </div>
                </div>
                <br/>
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {activityItems.map((activityItem) => (
                            <li key={activityItem.id} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-base font-medium"></h3>
                                            <p className="text-base text-gray-500">{activityItem.time}</p>
                                        </div>
                                        <p className="text-base text-gray-500">
                                            Sent {activityItem.project} ({activityItem.commit} ) on {activityItem.environment}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </main >
    )
}