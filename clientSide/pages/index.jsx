
import Link from "next/link"


export default function index() {


    return (
        <div>
            <div className="flex flex-col justify-center items-center" style={{ height: 'calc(100vh - 100px)' }}>
                <div className="text-center mb-6">
                    <div className="text-4xl">DIGINOTES</div>
                    <div className="text-xl">Easily access your note. anytime-anywhere</div>
                    {/* <div>Your notes will be backed up in the cloud, so you can access them from any device connected to your account</div> */}
                </div>
                <Link href='/note'>
                    <a className="btn py-[.65rem] bg-amber-400">Take new notes</a>
                </Link>
            </div>
        </div>
    )
}
