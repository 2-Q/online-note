
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import { useEffect, useState } from "react"
import { apiGet, apiPost, apiPut } from "../../utils/api/crud"
import Error from 'next/error'


export default function Detail() {
    const [statusCode, setStatusCode] = useState(202)
    const [note, setNote] = useState({})
    const router = useRouter()
    const { id } = router.query

    const syncNote = () => {
        if (statusCode == 200) {
            setStatusCode(202)
            const formData = new FormData();
            formData.append('title', (note?.title ?? ''))
            formData.append('content', (note?.content ?? ''))
            if (id == 'new-note') {
                apiPost({ path: `note`, formData }).then((res) => {
                    router.push(`/note/${res.data.note.id}`)
                })
            } else {
                apiPut({ path: `note/${id}`, formData }).then(() => {
                    setStatusCode(200)
                })
            }
        }
    }


    useEffect(() => {
        if (router.isReady) {
            if (id == 'new-note') {
                setStatusCode(200)
            } else {
                apiGet({ path: `note/${id}` }).then((res) => {
                    setNote(res.data.note)
                    setStatusCode(res.status)
                })
            }
        }
    }, [router])

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            syncNote()
        }, 1500)
        return () => {
            clearTimeout(delaySearch)
        }
    }, [note])

    useEffect(() => () => {
        syncNote()
    }, [])


    if (![200, 202, 422].includes(statusCode)) {
        return <Error statusCode={statusCode} />
    }

    return (
        <>
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-lg">
                        <Link href='/note'>
                            <a>Note Lists</a>
                        </Link>
                        <div>	&#62; </div>
                        <div className="font-extrabold text-base">View Note</div>
                    </div>
                </div>
                <div className={(statusCode == 200) ? 'invisible' : 'visible'}>Loading...</div>
                <div className="card">
                    <div className="card-body bg-amber-100 overflow-y-auto" style={{ height: 'calc(100vh - 8rem)' }}>
                        <input
                            className="w-full bg-transparent font-extrabold text-lg border-b border-gray-300 mb-4 mt-3 pb-1"
                            value={(note?.title ?? '')}
                            placeholder='Title note'
                            onChange={(e) => { setNote({ ...note, title: e.target.value }) }}
                        />
                        <textarea
                            className="w-full bg-transparent p-0 border-none resize-none"
                            style={{ height: 'calc(100% - 4.5rem)' }}
                            onChange={(e) => {
                                let content = e.target.value
                                if (e.key == 13) {
                                    content += "\n*"
                                }
                                setNote({ ...note, content })
                            }}
                            placeholder="Write something..."
                            value={note?.content ?? ''}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
