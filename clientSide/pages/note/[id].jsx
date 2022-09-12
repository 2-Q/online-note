
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import { useEffect, useState } from "react"
import { sampleNotes } from "../../myFolder/sample/note"


export default function Detail() {
    const [note, setNote] = useState({})
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (router.isReady) {
            setNote(sampleNotes[id])
        }
    }, [router])


    return (
        <>
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-lg mb-2">
                        <Link href='/note'>
                            <a>Note Lists</a>
                        </Link>
                        <div>	&#62; </div>
                        <div className="font-extrabold text-base">View Note</div>
                    </div>
                    <div>Loading...</div>
                </div>
                <div className="card">
                    <div className="card-body overflow-y-auto" style={{ height: 'calc(100vh - 8rem)' }}>
                        <div contentEditable={true} className="font-extrabold text-lg border-b mt-3 mb-2">{note?.title}</div>
                        <div contentEditable={true}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo mollitia, minima minus, necessitatibus officiis repellendus hic dolore veniam, voluptate quas laudantium asperiores? Odit inventore aut ipsum minima incidunt libero. Commodi!
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
