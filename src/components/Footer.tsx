import '../App.css'
import { footerLinks } from '../constants'

function Footer() {
    return (
        <footer className='py-5 sm:px-10 px-6'>
            <div className='screen-max-width'>
                <div>
                    <p className='font-semibold text-gray-300 text-xs'>
                        More Ways to shop: {' '}
                        <span className='underline text-blue-500'>
                            Find an Apple Store {' '}
                        </span> 
                        or {' '}
                        <span className='underline text-blue-500'>
                            other retailer {' '}
                        </span>
                        near you.
                    </p>
                    <p className='font-semibold text-gray-300 text-xs'>
                        Or call 0603-522-1952
                    </p>
                </div>

                <div className='bg-neutral-800 my-5 h-[1px] w-full'></div>

                <div className='flex md:flex-row flex-col md:items-center justify-between'>
                    <p className='font-semibold text-gray-300 text-xs'> Copyright 2025 Apple Inc. All rights reserved </p>
                    <div className='flex'>
                        {footerLinks.map((link, index) => (
                            <p key={index} className='font-semibold text-gray-300 text-xs mx-2'> {link} {' '}</p>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer