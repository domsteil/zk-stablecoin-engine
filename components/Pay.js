/* eslint-disable react/display-name */

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

export default () => {
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    })

    const [open, setOpen] = useState(false)

    const [inputs, setInputs] = useState({
        user: '',
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
                user: '',
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
        const res = await fetch('/api/polygon/nightfall/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const text = await res.text()
        handleResponse(res.status, text)
        setOpen(true);
    }


    const handleDeposit = async e => {
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
        const res = await fetch('/api/polygon/nightfall/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const text = await res.text()
        handleResponse(res.status, text)
        setOpen(true);
    }


    const handleWithdrawal = async e => {
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
        const res = await fetch('/api/polygon/nightfall/withdrawl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const text = await res.text()
        handleResponse(res.status, text)
        setOpen(true);
    }

    return (
        <main>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Transaction successful
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-base text-gray-500">
                                                Your transaction has been sent.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-base"
                                        onClick={() => setOpen(false)}
                                    >
                                        Go back to dashboard
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label for="account-number" class="block text-base font-medium text-gray-700 float-left">User</label>
                    <div class="mt-2 relative rounded-md shadow-sm">
                        <input type="text" name="account_number" id="account_number" class="focus:ring-purple-500 focus:border-purple-500 block w-full pr-10 sm:text-base border-gray-300 rounded-md" placeholder="" onChange={handleOnChange} value={inputs.user} />
                    </div>
                </div>
                <div>
                    <label for="price" class="block text-base font-medium text-gray-700 float-left">Amount</label>
                    <div class="mt-2 relative rounded-md shadow-sm">
                        <input type="text" name="amount" id="amount" class="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-base border-gray-300 rounded-md" placeholder="" aria-describedby="price-currency" onChange={handleOnChange} value={inputs.amount} />
                    </div>
                </div>
                <button type="submit" class="inline-flex items-center px-2 mr-5 py-2 border border-transparent rounded-md text-base font-medium text-white bg-purple-600 mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" >
                    Transfer
                </button>
                <button type="button" class="inline-flex items-center px-2 mr-5 py-2 border border-transparent rounded-md text-base font-medium text-white bg-purple-600 mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" onClick={handleDeposit}>
                    Deposit
                </button>
                <button type="button" class="inline-flex items-center px-2 py-2 border border-transparent rounded-md text-base font-medium text-white bg-purple-600 mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" onClick={handleWithdrawal}>
                    Withdraw
                </button>
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