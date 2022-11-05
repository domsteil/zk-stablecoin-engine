import '../styles/globals.css'

import { currentUser } from '@clerk/nextjs/app-beta';

import { auth } from '@clerk/nextjs/app-beta';

const Home = (props) => {

  const { userId } = auth();

  return (

    <div>
      <body className="antialiased font-sans">
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
              <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <h2 className="text-lg text-slate-900 font-semibold">zk-stablecoin-engine</h2>
                <div className="h-full relative" style={{ minHeight: '12rem' }}>
                  <div className="rounded-lg" />
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