


export default function HeaderSection() {


    return (
        <header className="py-4 flex justify-between items-center container">
            <div>
                <div className="text-lg font-light">DIGINOTES</div>
            </div>
            <div>
                <a className="btn-outline rounded-none text-sm text-gray-500 border-gray-400">
                    <img src="/images/GoogleLogo.png" className="h-[1.2rem] mb-[.1rem]" alt="google" />
                    <div>Sign in</div>
                </a>
            </div>
        </header>
    )
}