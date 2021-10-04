import React from 'react';
import { FiGithub } from 'react-icons/fi';

export const Container = ({children}) => {
    return (
        <React.Fragment>
            <header>
                <nav className="space-y-2">
                    <div className="flex flex-row justify-between items-center p-2 px-5 sm:p-5 sm:px-10">
                        <h1 className="font-black text-xl">
                            Bursary findr
                        </h1>
                        <div>
                            <a href="https://github.com/KevinRaleie-dev">
                                <FiGithub className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="relative grid place-items-center w-full h-full space-y-3">
                {children}
            </main>
        </React.Fragment>
    )
}


