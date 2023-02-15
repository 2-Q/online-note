
import Link from "next/link"
import { useEffect, useState } from "react"
import { apiDelete, apiGet } from "../../utils/api/crud"
import Error from 'next/error'

export default function Index() {
    const [notes, setNotes] = useState([])
    const [statusCode, setStatusCode] = useState(200)

    const deleteNote = (id) => {
        setStatusCode(200)
        apiDelete({ path: `note/${id}` }).then((res) => {
            setNotes(notes.filter((res) => (res.id != id)))
            setStatusCode(res.status)
        })
    }

    useEffect(() => {
        setStatusCode(200)
        apiGet({ path: 'note' }).then((res) => {
            setNotes(res.data.notes)
            setStatusCode(res.status)
        })
    }, [])



    if (![200, 202, 422].includes(statusCode)) {
        return <Error statusCode={statusCode} />
    }

    return (
        <div className="container mt-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-lg">
                    <div className="font-extrabold">Note Lists</div>
                </div>
                <div>
                    <Link href='/note/new-note'>
                        <div className="btn bg-amber-400 px-3 py-2">
                            <b>+</b>
                            <span className="hidden sm:block"> New Note</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={statusCode == 200 ? 'invisible' : 'visible'}>Loading...</div>
            <div className="grid grid-cols-12 gap-3">
                {notes.map((res, index) => {
                    return (
                        <Link key={index}
                            href={`/note/${res.id}`}>
                            <div className="xl:col-span-3 lg:col-span-4 col-span-6 card mb-3 cursor-pointer group">
                                <div className="card-body">
                                    <div className="mb-1 flex justify-between items-center gap-3">
                                        <div className="card-title whitespace-nowrap truncate">{res.title}</div>
                                        <div>
                                            <img
                                                src="/icons/IconTrash.png"
                                                className="w-6 invisible group-hover:visible hover:bg-amber-200 rounded-full p-1"
                                                alt="delete note"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    const acc = confirm('Really want to delete this note?')
                                                    if (acc) {
                                                        deleteNote(res.id)
                                                    }
                                                }}
                                            />
                                            {/* <img src="/icons/grabber.svg" alt="" className="cursor-grabbing" /> */}
                                        </div>
                                    </div>
                                    <div className="line-clamp-3 min-h-[2rem]">{res.content}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
