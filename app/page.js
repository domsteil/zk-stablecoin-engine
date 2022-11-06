'use client';

import '../styles/globals.css'

import { currentUser } from '@clerk/nextjs/app-beta';

import { SignUpButton } from "@clerk/nextjs";
import Pay from "components/Pay"

const stats = [
  { name: 'Account Balance', stat: '$8,000' },
  { name: 'Savings', stat: '$15,897' },
  { name: 'Debt', stat: '$897' }
];

const Home = (props) => {

  return (

    <div>
      <body className="antialiased font-sans">
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
              <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <img
                  className="flex-1 h-28 w-auto"
                  src="/zkstable.png"
                  alt=""
                />
                <h2 className="text-lg text-purple-800 font-semibold">zk-stablecoin-engine</h2>
                <div className="h-full relative" style={{ minHeight: '12rem' }}>
                  <div className="rounded-lg" />
                  
                  <SignUpButton mode="modal">
                    <div class="w-60 mt-8 mb-8 sm:mt-4 sm:mb-4">
                      <button className="block w-full rounded-md border border-transparent px-5 py-3 bg-purple-700 text-base font-medium text-white shadow hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10">
                        Sign up for Free
                      </button>
                    </div>
                  </SignUpButton>
                  <div>
                    <div class="w-60 mt-8 mb-8 sm:mt-4 sm:mb-4">
                      <a className="block w-full rounded-md border border-transparent px-5 py-3 bg-purple-700 text-base font-medium text-white shadow hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10" href={"https://buy.ramp.network/?hostApiKey=" + process.env.NEXT_PUBLIC_HOST_API_KEY}><button>Purchase USDC</button></a>
                    </div>
                  </div>
                  <nav className="mt-5 flex-1">
                  </nav>
                  <nav className="mt-5 flex-1">
                  </nav>
                </div>
              </div>
            </div>

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                <div className="relative h-full" style={{ minHeight: '36rem' }}>
                  <div className="rounded-lg" />
                  <div class="max-w-2xl text-lg sm:px-6 lg:px-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div>
                          <dl className="mt-2 mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {stats.map((item) => (
                              <div key={item.name} className="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
                                <dt className="tracking-tight text-base font-medium text-gray-500 truncate">{item.name}</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        <h1 className="text-lg leading-6 font-medium text-gray-900">
                          Send a Private USDC Payment
                        </h1>
                        <div className="mt-2">
                          <p className="text-base tracking-tight text-gray-500 lg:visible md:visible invisible">
                            Send stablecoin payments on the Polygon Nightfall Network
                          </p>
                        </div>
                        <div className="mt-2 mb-8">
                          <Pay />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
            <div className="h-full pl-6 py-6 lg:w-80">
            </div>
          </div>
        </div>
      </body>
    </div>
  )
}

export default Home;