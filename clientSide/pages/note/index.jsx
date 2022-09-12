
import Link from "next/link"
import { useEffect, useState } from "react"
import { sampleNotes } from "../../myFolder/sample/note"


export default function Index() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        setNotes(sampleNotes)
    }, [])


    return (
        <>
            <div className="container">
                <div className="text-lg font-extrabold mb-2">Note Lists</div>
                <div className="grid grid-cols-4 gap-3">
                    {notes.map((res, index) => {
                        return (
                            <Link key={index} href={`/note/${res.id}`}>
                                <a className="card mb-1 cursor-pointer">
                                    <div className="card-body">
                                        <div className="mb-1 flex justify-between items-center gap-3">
                                            <div className="card-title whitespace-nowrap truncate">{res.title}</div>
                                            <div className="cursor-grabbing">
                                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="grabber">
                                                    <path fill-rule="evenodd" d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="line-clamp-3 min-h-[2rem]">{res.content}</div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
