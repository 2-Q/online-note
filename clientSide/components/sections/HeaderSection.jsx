import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../utils/context";
import { useState } from "react";
import { blacklist } from "../../utils/api/crud";



export default function HeaderSection() {
    const { UserAuthed } = useContext(AppContext)
    const [ShowDropDown, setShowDropDown] = useState(false)

    return (
        <header className="py-4 flex justify-between items-center container">
            <div>
                <Link href='/'>
                    <a className="text-lg font-light">DIGINOTES</a>
                </Link>
            </div>
            {(UserAuthed?.name) &&
                <div>
                    <div className="flex items-center cursor-pointer" onClick={() => setShowDropDown(true)}>
                        <img className="w-8" src="/icons/IconUser.webp" alt="user" />
                        <div className="font-bold">{UserAuthed.name}</div>
                    </div>
                    {ShowDropDown && (
                        <>
                            <div
                                className="absolute w-screen h-screen inset-0"
                                onClick={() => { setShowDropDown(false) }}
                            />
                            <div className="absolute card w-[12rem]">
                                <div
                                    onClick={blacklist}
                                    className="card-body flex items-center cursor-pointer gap-1">
                                    <img src="/icons/IconLogout.png" className="w-4" alt="icon logout" />
                                    <span>logout</span>
                                </div>
                            </div>
                        </>

                    )}
                </div>
            }
        </header>
    )
}